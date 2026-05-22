import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { env } from "@/lib/auth/env";
import { verifyAccess, isCorporateEmail } from "@/lib/auth/codes";
import { getSession } from "@/lib/auth/session";
import { hashShort } from "@/lib/auth/hash";
import { logEvent } from "@/lib/auth/logging";
import { rateLimit } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function genericError() {
  return NextResponse.json({ ok: false, error: "Invalid email or access code." }, { status: 401 });
}

export async function POST(req: NextRequest) {
  let body: { email?: string; code?: string; acknowledged?: boolean } = {};
  try { body = await req.json(); } catch { /* ignore */ }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const code = typeof body.code === "string" ? body.code : "";
  const acknowledged = body.acknowledged === true;

  const ip = clientIp(req);
  const ipHash = hashShort(ip);
  const ua = req.headers.get("user-agent") ?? "";
  const uaHash = hashShort(ua);

  if (!email || !code || !acknowledged || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await logEvent({ eventType: "login_failed", email: email || undefined, ipHash, uaHash, metadata: { reason: "bad_payload" } });
    return genericError();
  }

  // ── Corporate-email gate ──
  // Reject @anything-other-than-aum.money / aum.sg (configurable via env)
  // BEFORE rate-limit hit and before bcrypt — keeps timing on the easy fail
  // path quick and signals clearly to the client what to fix.
  if (!isCorporateEmail(email)) {
    await logEvent({
      eventType: "domain_blocked",
      email, ipHash, uaHash,
      metadata: { reason: "domain_not_in_allowlist", allowed: env.allowedEmailDomains },
    });
    return NextResponse.json(
      { ok: false, error: "Access is restricted to AUM corporate email addresses." },
      { status: 403 },
    );
  }

  if (env.rateLimitEnabled) {
    const ipLimit = rateLimit({ bucket: "auth_ip", key: ipHash, limit: 5, windowMs: 10 * 60_000 });
    const emailLimit = rateLimit({ bucket: "auth_email", key: email.toLowerCase(), limit: 5, windowMs: 10 * 60_000 });
    const ipHourly = rateLimit({ bucket: "auth_ip_hour", key: ipHash, limit: 20, windowMs: 60 * 60_000 });
    const blocked = [ipLimit, emailLimit, ipHourly].find((r) => !r.ok);
    if (blocked) {
      await logEvent({ eventType: "login_failed", email, ipHash, uaHash, metadata: { reason: "rate_limited" } });
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(blocked.retryAfterMs / 1000)) } },
      );
    }
  }

  const result = await verifyAccess({ email, code });

  if (!result.ok) {
    await logEvent({
      eventType: result.reason === "revoked" ? "revoked_code_attempt" : "login_failed",
      email, ipHash, uaHash,
      metadata: { reason: result.reason },
    });
    return genericError();
  }

  if (env.rateLimitEnabled) {
    const codeLimit = rateLimit({ bucket: "auth_code_hour", key: result.codeId, limit: 10, windowMs: 60 * 60_000 });
    if (!codeLimit.ok) {
      await logEvent({ eventType: "login_failed", email, codeId: result.codeId, ipHash, uaHash, metadata: { reason: "code_rate_limited" } });
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(codeLimit.retryAfterMs / 1000)) } },
      );
    }
  }

  // Mint session.
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + env.sessionTtlHours * 60 * 60 * 1000);

  const session = await getSession();
  session.sessionId = sessionId;
  session.email = email;
  session.codeId = result.codeId;
  session.issuedAt = now.toISOString();
  session.expiresAt = expires.toISOString();
  session.ipHash = ipHash;
  session.uaHash = uaHash;
  await session.save();

  await logEvent({
    eventType: "login_success",
    email, codeId: result.codeId, sessionId, ipHash, uaHash,
  });

  return NextResponse.json({ ok: true });
}

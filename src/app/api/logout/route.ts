import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { logEvent } from "@/lib/auth/logging";
import { hashShort } from "@/lib/auth/hash";

export const runtime = "nodejs";

async function handle(req: NextRequest) {
  const session = await getSession();
  const wasAuthenticated = Boolean(session.sessionId);
  const email = session.email;
  const sessionId = session.sessionId;
  const codeId = session.codeId;

  session.destroy();

  if (wasAuthenticated) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    await logEvent({
      eventType: "logout",
      email, codeId, sessionId,
      ipHash: hashShort(ip),
      uaHash: hashShort(req.headers.get("user-agent") ?? ""),
    });
  }

  if (req.method === "GET") {
    return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  }
  return NextResponse.json({ ok: true });
}

export const GET = handle;
export const POST = handle;

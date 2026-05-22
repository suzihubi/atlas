import bcrypt from "bcryptjs";
import { env } from "./env";
import type { AccessCode, AuthVerifyResult } from "./types";

// MVP: codes live in ATLAS_ACCESS_CODES_JSON, parsed once per process.

let cachedCodes: AccessCode[] | null = null;

function loadCodes(): AccessCode[] {
  if (cachedCodes) return cachedCodes;
  try {
    const parsed = JSON.parse(env.accessCodesJson) as unknown;
    if (!Array.isArray(parsed)) {
      console.error("[atlas/codes] ATLAS_ACCESS_CODES_JSON is not an array; treating as empty");
      cachedCodes = [];
      return cachedCodes;
    }
    cachedCodes = parsed as AccessCode[];
    return cachedCodes;
  } catch (err) {
    console.error("[atlas/codes] failed to parse ATLAS_ACCESS_CODES_JSON:", err);
    cachedCodes = [];
    return cachedCodes;
  }
}

export function _resetCodesCache() {
  cachedCodes = null;
}

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}
export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at < 0 ? "" : email.slice(at + 1).toLowerCase();
}

function isExpired(record: AccessCode, now: Date): boolean {
  if (!record.expiresAt) return false;
  const d = new Date(record.expiresAt);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < now.getTime();
}
function isOverUsed(record: AccessCode): boolean {
  if (record.maxUses == null) return false;
  return (record.usesCount ?? 0) >= record.maxUses;
}

function emailMatchesCodeAllowlist(email: string, record: AccessCode): boolean {
  const normEmail = normaliseEmail(email);
  if (record.allowedEmails?.some((e) => e.toLowerCase() === normEmail)) return true;
  if (record.allowedDomains && record.allowedDomains.length > 0) {
    const d = emailDomain(normEmail);
    if (record.allowedDomains.some((dd) => dd.toLowerCase().replace(/^@/, "") === d)) return true;
  }
  return !record.allowedEmails?.length && !record.allowedDomains?.length;
}

/** Gate-wide corporate email check (e.g. only @aum.money / @aum.sg). */
export function isCorporateEmail(email: string): boolean {
  const d = emailDomain(email);
  return env.allowedEmailDomains.includes(d);
}

function normaliseCode(raw: string): string {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

export type VerifyInput = { email: string; code: string };

export async function verifyAccess(input: VerifyInput): Promise<AuthVerifyResult> {
  const { email } = input;
  const code = normaliseCode(input.code);
  const codes = loadCodes();
  const now = new Date();

  if (codes.length === 0) {
    // Keep timing roughly uniform.
    await bcrypt.compare(code, "$2a$12$" + "x".repeat(53));
    return { ok: false, reason: "invalid" };
  }

  for (const record of codes) {
    if (record.revoked) continue;
    let codeMatches = false;
    try {
      codeMatches = await bcrypt.compare(code, record.codeHash);
    } catch {
      codeMatches = false;
    }
    if (!codeMatches) continue;

    if (isExpired(record, now)) return { ok: false, reason: "expired" };
    if (isOverUsed(record)) return { ok: false, reason: "max_uses" };

    // Per-code allowlist enforcement (independent of the global corporate gate).
    if (record.allowedEmails?.length || record.allowedDomains?.length) {
      if (!emailMatchesCodeAllowlist(email, record)) {
        return { ok: false, reason: "domain_mismatch" };
      }
    }
    return { ok: true, codeId: record.id, record };
  }

  return { ok: false, reason: "invalid" };
}

export function getCodeById(id: string): AccessCode | undefined {
  return loadCodes().find((c) => c.id === id);
}

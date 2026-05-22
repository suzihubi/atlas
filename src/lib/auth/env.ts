// Strict env-var loader. Throws at first use if misconfigured.

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}
function optional(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}
function flag(name: string, fallback = false): boolean {
  const v = process.env[name];
  if (v == null) return fallback;
  return v === "1" || v.toLowerCase() === "true";
}
function int(name: string, fallback: number): number {
  const v = process.env[name];
  if (v == null) return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Atlas-specific corporate-email allowlist. Independent from any per-code
 * allowedDomains list — these are enforced globally before bcrypt comparison
 * so non-corporate addresses fail fast and uniformly.
 */
const DEFAULT_CORPORATE_DOMAINS = ["aum.money", "aum.sg"];

export const env = {
  get authSecret(): string {
    const s = required("ATLAS_AUTH_SECRET");
    if (s.length < 32) {
      throw new Error("ATLAS_AUTH_SECRET must be at least 32 characters");
    }
    return s;
  },
  get accessCodesJson(): string {
    return optional("ATLAS_ACCESS_CODES_JSON", "[]");
  },
  get sessionTtlHours(): number {
    return int("ATLAS_SESSION_TTL_HOURS", 24);
  },
  get rateLimitEnabled(): boolean {
    return flag("ATLAS_RATE_LIMIT_ENABLED", true);
  },
  get loggingEnabled(): boolean {
    return flag("ATLAS_LOGGING_ENABLED", true);
  },
  /**
   * Corporate domains permitted to log in. Set ATLAS_ALLOWED_EMAIL_DOMAINS
   * as a comma-separated list to override (e.g. "aum.money,aum.sg,aum.com").
   */
  get allowedEmailDomains(): string[] {
    const raw = optional("ATLAS_ALLOWED_EMAIL_DOMAINS", DEFAULT_CORPORATE_DOMAINS.join(","));
    return raw
      .split(",")
      .map((d) => d.trim().toLowerCase().replace(/^@/, ""))
      .filter(Boolean);
  },
  get host(): string {
    return optional("ATLAS_HOST", "");
  },
  get isProd(): boolean {
    return process.env.NODE_ENV === "production";
  },
};

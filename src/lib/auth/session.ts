import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";
import type { AtlasSessionCookie } from "./types";

export const SESSION_COOKIE_NAME = "atlas_session";

/**
 * Cookie scoped to the exact host (no leading Domain) so it can't leak across
 * other subdomains of aum.money.
 */
export function sessionOptions(): SessionOptions {
  return {
    cookieName: SESSION_COOKIE_NAME,
    password: env.authSecret,
    cookieOptions: {
      httpOnly: true,
      secure: env.isProd,
      sameSite: "lax",
      path: "/",
      maxAge: env.sessionTtlHours * 60 * 60,
    },
    ttl: env.sessionTtlHours * 60 * 60,
  };
}

export type AtlasSessionData = Partial<AtlasSessionCookie>;

export async function getSession(): Promise<IronSession<AtlasSessionData>> {
  return getIronSession<AtlasSessionData>(await cookies(), sessionOptions());
}

export function isExpired(s: AtlasSessionData, now = new Date()): boolean {
  if (!s.expiresAt) return true;
  const d = new Date(s.expiresAt);
  if (Number.isNaN(d.getTime())) return true;
  return d.getTime() <= now.getTime();
}

export function isAuthenticated(s: AtlasSessionData): boolean {
  return Boolean(s.sessionId && s.email && s.codeId && !isExpired(s));
}

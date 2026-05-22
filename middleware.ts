import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, isAuthenticated, type AtlasSessionData } from "@/lib/auth/session";
import { applySecurityHeaders } from "@/lib/auth/security-headers";

// Paths that bypass the gate.
const PUBLIC_PATHS = new Set([
  "/login",
  "/api/auth",
  "/api/logout",
  "/favicon.ico",
  "/robots.txt",
]);

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  if (pathname.startsWith("/_next/")) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Edge-compatible session read.
  const res = NextResponse.next();
  const session = await getIronSession<AtlasSessionData>(req, res, sessionOptions());
  const authed = isAuthenticated(session);

  // Authenticated visitors hitting /login → bounce to the dashboard.
  if (pathname === "/login" && authed) {
    return applySecurityHeaders(NextResponse.redirect(new URL("/", req.url)));
  }

  // Public paths just pass through (with security headers).
  if (isPublicPath(pathname)) {
    return applySecurityHeaders(res);
  }

  // Everything else requires auth.
  if (!authed) {
    const loginUrl = new URL("/login", req.url);
    if (pathname !== "/") loginUrl.searchParams.set("next", pathname + (search ?? ""));
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  return applySecurityHeaders(res);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|fonts/).*)",
  ],
};

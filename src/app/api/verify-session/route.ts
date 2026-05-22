import { NextResponse } from "next/server";
import { getSession, isAuthenticated } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET() {
  const s = await getSession();
  if (!isAuthenticated(s)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    email: s.email,
    sessionIdSuffix: s.sessionId!.slice(-6),
    expiresAt: s.expiresAt,
  });
}

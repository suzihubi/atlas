import { redirect } from "next/navigation";
import { getSession, isAuthenticated } from "@/lib/auth/session";

/**
 * Wraps every protected route. Runs as a Node-runtime server component on
 * each request: pulls the iron-session cookie, validates it, and bounces to
 * /login if the session is missing or expired.
 *
 * We use a route-group layout instead of edge middleware because Next.js 16
 * middleware on Vercel currently fails opaquely (`modifyConfig` path-undefined)
 * when iron-session is in the middleware's import graph. The cost of doing
 * this in a server component instead of edge middleware is ~30ms per request
 * (Node cold-start) vs ~5ms (edge) — negligible for an exec dashboard.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!isAuthenticated(session)) {
    redirect("/login");
  }
  return <>{children}</>;
}

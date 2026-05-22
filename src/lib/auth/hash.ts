// Pseudonymisation — never store raw IPs or UAs.
import crypto from "node:crypto";
import { env } from "./env";

export function hashShort(value: string, len = 16): string {
  const h = crypto.createHmac("sha256", env.authSecret);
  h.update(value);
  return h.digest("hex").slice(0, len);
}

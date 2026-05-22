import crypto from "node:crypto";
import { env } from "./env";
import type { AccessLogEvent } from "./types";

export type LogInput = Omit<AccessLogEvent, "id" | "timestamp">;

export async function logEvent(input: LogInput): Promise<void> {
  if (!env.loggingEnabled) return;
  const entry: AccessLogEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...input,
  };
  const isFailure =
    entry.eventType === "login_failed" ||
    entry.eventType === "revoked_code_attempt" ||
    entry.eventType === "domain_blocked";
  const line = JSON.stringify({ source: "atlas", ...entry });
  if (isFailure) console.warn(line);
  else console.log(line);
}

#!/usr/bin/env tsx
/**
 * Generate one access code for AUM Atlas.
 *
 *   npm run atlas:generate-code -- \
 *     --label "Hubert" \
 *     --email "hubert@aum.money" \
 *     --expires "2026-12-31" \
 *     --max-uses 50 \
 *     --by "you@aum.money"
 *
 * Outputs the plaintext code ONCE to stdout, then the hashed record to paste
 * into ATLAS_ACCESS_CODES_JSON. Plaintext is never written to disk.
 */

import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import type { AccessCode } from "../src/lib/auth/types";

const BCRYPT_COST = 12;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function arg(flag: string): string | undefined {
  const argv = process.argv.slice(2);
  const idx = argv.indexOf(flag);
  if (idx >= 0 && idx + 1 < argv.length) return argv[idx + 1];
  return undefined;
}
function multi(flag: string): string[] {
  const v = arg(flag);
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}
function numArg(flag: string): number | undefined {
  const v = arg(flag);
  if (!v) return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

function generatePlaintext(len = 16): string {
  let out = "";
  for (let i = 0; i < len; i++) out += ALPHABET[crypto.randomInt(ALPHABET.length)];
  return out.replace(/(.{4})(.{4})(.{4})(.{4})/, "$1-$2-$3-$4");
}

async function main() {
  const label = arg("--label");
  if (!label) {
    console.error("Missing required --label \"counterparty name\"");
    process.exit(1);
  }

  const allowedEmails = multi("--email");
  const allowedDomains = multi("--email-domain");
  const expiresAt = arg("--expires");
  const maxUses = numArg("--max-uses");
  const maxConcurrentSessions = numArg("--max-concurrent");
  const notes = arg("--notes");
  const createdBy = arg("--by") ?? process.env.USER;

  const codeLen = numArg("--code-length") ?? 16;
  const plaintext = generatePlaintext(codeLen);
  const codeHash = await bcrypt.hash(plaintext.replace(/-/g, ""), BCRYPT_COST);

  const record: AccessCode = {
    id: crypto.randomUUID(),
    label,
    codeHash,
    ...(allowedEmails.length ? { allowedEmails: allowedEmails.map((e) => e.toLowerCase()) } : {}),
    ...(allowedDomains.length ? { allowedDomains: allowedDomains.map((d) => d.toLowerCase().replace(/^@/, "")) } : {}),
    ...(expiresAt ? { expiresAt } : {}),
    ...(maxUses != null ? { maxUses, usesCount: 0 } : {}),
    ...(maxConcurrentSessions != null ? { maxConcurrentSessions } : {}),
    revoked: false,
    createdAt: new Date().toISOString(),
    ...(createdBy ? { createdBy } : {}),
    ...(notes ? { notes } : {}),
  };

  const rule = "─".repeat(72);
  process.stdout.write("\n");
  process.stdout.write(`${rule}\n`);
  process.stdout.write("  PLAINTEXT CODE — copy now, this will not be shown again\n");
  process.stdout.write(`${rule}\n`);
  process.stdout.write(`\n  ${plaintext}\n\n`);
  process.stdout.write(`  Send to the executive over a channel separate from the URL\n`);
  process.stdout.write(`  (e.g. Signal / phone, not the same email channel).\n`);
  process.stdout.write(`${rule}\n\n`);

  process.stdout.write("  Code metadata:\n");
  process.stdout.write(`    id:        ${record.id}\n`);
  process.stdout.write(`    label:     ${record.label}\n`);
  if (record.allowedEmails?.length)  process.stdout.write(`    emails:    ${record.allowedEmails.join(", ")}\n`);
  if (record.allowedDomains?.length) process.stdout.write(`    domains:   ${record.allowedDomains.join(", ")}\n`);
  if (record.expiresAt)              process.stdout.write(`    expires:   ${record.expiresAt}\n`);
  if (record.maxUses != null)        process.stdout.write(`    max uses:  ${record.maxUses}\n`);
  process.stdout.write("\n");

  process.stdout.write("  Hashed record — append to ATLAS_ACCESS_CODES_JSON array:\n\n");
  process.stdout.write(`${JSON.stringify(record)}\n\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

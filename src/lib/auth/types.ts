// Shared domain types for the Atlas access gate.
// Adapted from the AUM Gatehouse pattern.

export type AccessCode = {
  id: string;
  label: string;                       // counterparty name, internal-only
  codeHash: string;                    // bcrypt hash
  allowedEmails?: string[];            // lowercase, exact match
  allowedDomains?: string[];           // lowercase, sans leading @
  expiresAt?: string;                  // ISO 8601
  maxUses?: number;
  usesCount?: number;
  maxConcurrentSessions?: number;
  revoked?: boolean;
  createdAt: string;
  createdBy?: string;
  notes?: string;
};

export type AtlasSession = {
  sessionId: string;
  email: string;
  codeId: string;
  issuedAt: string;
  expiresAt: string;
  ipHash?: string;
  uaHash?: string;
};

export type AtlasSessionCookie = AtlasSession;

export type AuthVerifyResult =
  | { ok: true; codeId: string; record: AccessCode }
  | { ok: false; reason: "invalid" | "expired" | "revoked" | "domain_mismatch" | "max_uses" | "rate_limited" };

export type AccessLogEvent = {
  id: string;
  eventType:
    | "login_success"
    | "login_failed"
    | "logout"
    | "page_view"
    | "session_expired"
    | "revoked_code_attempt"
    | "domain_blocked";
  email?: string;
  codeId?: string;
  sessionId?: string;
  ipHash?: string;
  uaHash?: string;
  path?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

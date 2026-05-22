// In-memory LRU rate limiter. Resets on cold start.
// Upgrade to Upstash / KV before high-value access in production.

import { LRUCache } from "lru-cache";

type Bucket = { hits: number; resetAt: number };

const store = new LRUCache<string, Bucket>({
  max: 50_000,
  ttl: 60 * 60_000,
});

export type RateLimitInput = {
  bucket: string;
  key: string;
  limit: number;
  windowMs: number;
};

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; retryAfterMs: number; resetAt: number };

export function rateLimit({ bucket, key, limit, windowMs }: RateLimitInput): RateLimitResult {
  const id = `${bucket}:${key}`;
  const now = Date.now();
  const existing = store.get(id);

  if (!existing || existing.resetAt <= now) {
    const fresh: Bucket = { hits: 1, resetAt: now + windowMs };
    store.set(id, fresh, { ttl: windowMs });
    return { ok: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  if (existing.hits >= limit) {
    return { ok: false, retryAfterMs: Math.max(0, existing.resetAt - now), resetAt: existing.resetAt };
  }

  existing.hits += 1;
  store.set(id, existing, { ttl: existing.resetAt - now });
  return { ok: true, remaining: limit - existing.hits, resetAt: existing.resetAt };
}

export function _resetRateLimits() {
  store.clear();
}

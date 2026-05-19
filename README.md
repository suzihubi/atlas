# AUM Atlas

Global Operations Command Center — executive dashboard for AUM, visualizing
jurisdictional flows, gold reserves, tokenization activity, treasury movements,
and compliance routes through an interactive 3D globe.

Built on the AUM website design system: brown `#201914` / creme `#ffebc4`,
KH Teka, 16-column grid, glass panels, restrained motion.

## Stack

- Next.js 16 (Turbopack) · React 19 · TypeScript
- Tailwind v4 with AUM design tokens
- Three.js + three-globe for the 3D globe
- Framer Motion

## Develop

```bash
npm install
npm run dev
```

Dashboard is at `/`.

## Data

Mock data lives in `src/data/`:

- `jurisdictions.ts` — 11 AUM jurisdictions with role, risk, entities, coordinates
- `flows.ts` — 8 operational flows (gold sourcing, vault transfer, liquidity, legal, compliance, OTC, expansion)
- `kpis.ts` — header KPIs, treasury / reserve / TROY / AUX cards, feed events, alerts

Replace with real adapters when APIs are connected (treasury ledger, custody feed,
proof-of-reserve, compliance, etc.).

## Deploy

Imports cleanly into Vercel — auto-detects Next.js, no config needed.

import type { KpiValue } from "@/types/atlas";

export const headerKpis: KpiValue[] = [
  { id: "treasury", label: "Global Treasury", value: "$184.2M", delta: "+1.4%", status: "ok" },
  { id: "gold", label: "Allocated Gold", value: "62,140 oz", delta: "+820 oz", status: "ok" },
  { id: "jurisdictions", label: "Active Jurisdictions", value: "11" },
  { id: "flows", label: "Live Flows", value: "27", delta: "+4", status: "ok" },
  { id: "exceptions", label: "Compliance Exceptions", value: "3", status: "warn" },
  { id: "reserve", label: "Reserve Verification", value: "98.4%", status: "ok" },
];

export const treasuryCard = {
  total: "$184.2M",
  gold: "$112.6M",
  fiat: "$48.9M",
  tokenized: "$22.7M",
  delta24h: "+1.4%",
  riskWeighted: "$172.0M",
};

export const reserveCard = {
  allocatedGold: "62,140 oz",
  verifiedBars: "1,184 / 1,202",
  pendingAssay: "18",
  activeVaults: "4",
  coverageRatio: "101.6%",
  lastVerification: "13:12 UTC",
};

export const troyCard = {
  minted: "2,401,820",
  burned: "184,302",
  supply: "2,217,518",
  nftBars: "1,184",
  reserveRatio: "101.6%",
  redemptionQueue: "6",
  mintQueue: "11",
};

export const auxCard = {
  parity: "1.000 AED",
  hedgeCoverage: "98.2%",
  liquidityPool: "$14.6M",
  treasuryStress: "Low",
  parityDeviation: "+0.02 bps",
  settlementLiquidity: "$48.2M",
};

export const footprintCard = {
  active: 11,
  legalEntities: 5,
  vaultJurisdictions: 3,
  bankingJurisdictions: 4,
  sourcing: 3,
  edd: 1,
};

export type FeedEvent = {
  id: string;
  time: string;
  category: "gold" | "token" | "settlement" | "compliance" | "vault" | "risk";
  label: string;
};

export const feedEvents: FeedEvent[] = [
  { id: "e1", time: "14:42", category: "vault", label: "Zurich vault — 8,000 oz inbound confirmed" },
  { id: "e2", time: "14:36", category: "token", label: "TROY mint — 1,420 oz allocated" },
  { id: "e3", time: "14:32", category: "gold", label: "Accra corridor — shipment 02-A scheduled" },
  { id: "e4", time: "14:21", category: "compliance", label: "Mozambique EDD — supplier 7 escalated" },
  { id: "e5", time: "14:08", category: "settlement", label: "UAE→SG liquidity sweep — $4.2M" },
  { id: "e6", time: "13:54", category: "risk", label: "Country risk — Mozambique watch raised" },
  { id: "e7", time: "13:42", category: "token", label: "TROY redemption — bar 0091 released" },
  { id: "e8", time: "13:12", category: "vault", label: "Reserve verification cycle complete" },
];

export type Alert = {
  id: string;
  severity: "low" | "medium" | "high";
  label: string;
};

export const alerts: Alert[] = [
  { id: "a1", severity: "high", label: "Mozambique route — EDD required before next shipment" },
  { id: "a2", severity: "medium", label: "Ghana corridor — Assay certificate pending (24h)" },
  { id: "a3", severity: "medium", label: "Colombia LATAM — Sanctions screening pending" },
  { id: "a4", severity: "low", label: "Singapore counterparty — annual review window opening" },
];

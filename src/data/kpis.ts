import type { KpiValue } from "@/types/atlas";

// ── Top header KPI rail ──────────────────────────────────────
// No volume/treasury totals — pre-operational by design.
export const headerKpis: KpiValue[] = [
  {
    id: "jurisdictions",
    label: "Active Jurisdictions",
    value: "9",
    sub: "4 regions",
    status: "ok",
  },
  {
    id: "entities",
    label: "Group Entities",
    value: "7",
    sub: "Across ADGM · DWTC · DIFC · DMCC · Labuan",
    status: "ok",
  },
  {
    id: "sourcing",
    label: "Sourcing Corridors",
    value: "3",
    sub: "Ghana · Mozambique · Colombia",
    status: "ok",
  },
  {
    id: "storage",
    label: "Storage Network",
    value: "5",
    sub: "UAE · CH · UK · SG · HK",
    status: "ok",
  },
  {
    id: "trade",
    label: "Trade Hubs",
    value: "3",
    sub: "UAE · SG · HK",
    status: "ok",
  },
  {
    id: "regulatory",
    label: "Regulatory Posture",
    value: "ATI Held",
    sub: "VARA · Category 1 ARVA",
    status: "warn",
  },
];

// ── Left panel cards ─────────────────────────────────────────

export const footprintCard = {
  active: 9,
  rows: [
    { label: "Operating Core", value: "United Arab Emirates" },
    { label: "Storage Jurisdictions", value: "5" },
    { label: "Sourcing Corridors", value: "3" },
    { label: "Trade Hubs", value: "3" },
    { label: "Fund Management Hub", value: "Labuan" },
  ],
};

export const pedigreeCard = {
  subtitle:
    "Provenance & Embedded Digital Identity for Gold Refining, Export & Exchange",
  rows: [
    { label: "Source Jurisdictions", value: "Ghana · Mozambique · Colombia" },
    { label: "Refining & Allocation", value: "United Arab Emirates" },
    { label: "Linked Product", value: "TROY (Bar NFT provenance)" },
    { label: "Status", value: "Framework Defined" },
  ],
};

export const sukukCard = {
  rows: [
    {
      label: "Underlying Assets",
      value: "Gold sourced from Ghana · Mozambique · Colombia",
    },
    {
      label: "Issuance Hub",
      value: "Labuan (AUM Capital Management — Wakil)",
    },
    { label: "Distribution Hubs", value: "UAE · Singapore · Hong Kong" },
    { label: "Status", value: "In Development" },
  ],
};

export const troyCard = {
  rows: [
    { label: "Standard", value: "ERC-20 + Bar NFT Provenance" },
    {
      label: "Regulatory Classification",
      value: "Category 1 ARVA (VARA)",
    },
    {
      label: "Reserve Structure",
      value: "DIFC Prescribed Company (Bankruptcy-Remote SPV)",
    },
    {
      label: "Lifecycle",
      value: "Lock → Fractionalise → Mint → Circulate → Burn/Reaggregate → Unlock",
    },
    { label: "Status", value: "Pre-Launch · ATI Held" },
  ],
};

export const auxCard = {
  rows: [
    { label: "Parity Reference", value: "1.000 AED" },
    { label: "Regulatory Path", value: "CBUAE Engagement (Phase 2)" },
    { label: "Anchor", value: "Gold-Anchored AED Construct" },
    { label: "Status", value: "In Development" },
  ],
};

// ── Right panel: Roadmap (replaces Live Feed) ────────────────

export type RoadmapItem = {
  id: string;
  quarter: string;
  category: "structural" | "regulatory" | "partnership" | "product" | "network" | "fund";
  milestone: string;
};

export const roadmapItems: RoadmapItem[] = [
  {
    id: "r1",
    quarter: "Q2 2026",
    category: "structural",
    milestone:
      "DIFC Prescribed Company — AUM Reserve Holdings Limited incorporation",
  },
  {
    id: "r2",
    quarter: "Q2 2026",
    category: "structural",
    milestone: "DMCC SPV — AUM Treasury FZCO closing",
  },
  {
    id: "r3",
    quarter: "Q2 2026",
    category: "partnership",
    milestone: "Trade Partner — TROY minting pilot MOU",
  },
  {
    id: "r4",
    quarter: "Q3 2026",
    category: "regulatory",
    milestone: "VARA operational launch — Category 1 ARVA activation",
  },
  {
    id: "r5",
    quarter: "Q3 2026",
    category: "product",
    milestone: "TROY Bar NFT provenance system — production deployment",
  },
  {
    id: "r6",
    quarter: "Q3 2026",
    category: "network",
    milestone: "Vault custody onboarding — CH · UK · SG · HK",
  },
  {
    id: "r7",
    quarter: "Q4 2026",
    category: "product",
    milestone: "Sukuk pilot — Ghana underlying, Labuan issuance",
  },
  {
    id: "r8",
    quarter: "Q4 2026",
    category: "fund",
    milestone: "AUM Capital Management — Labuan wakil mandate live",
  },
];

// ── Right panel: Watch List (replaces Risk & Alerts) ─────────

export type WatchListItem = {
  id: string;
  severity: "low" | "medium" | "high";
  label: string;
};

export const watchListItems: WatchListItem[] = [
  {
    id: "w1",
    severity: "high",
    label: "Mozambique — Enhanced due diligence required for all sourcing activity",
  },
  {
    id: "w2",
    severity: "medium",
    label:
      "Colombia — LATAM corridor in exploratory phase; sanctions framework being finalised",
  },
  {
    id: "w3",
    severity: "medium",
    label: "Ghana — Sourcing protocol & PEDIGREE pilot scoping in progress",
  },
  {
    id: "w4",
    severity: "low",
    label: "Singapore — Counterparty onboarding window opening pre-launch",
  },
];

// ── Right panel: Regulatory Status (replaces Compliance Monitor) ──

export const regulatoryStatus: Array<{ label: string; value: string }> = [
  { label: "VARA (Dubai)", value: "ATI/26/03/0191 — Category 1 ARVA" },
  { label: "ADGM (Abu Dhabi)", value: "Group Holding Co. Active" },
  { label: "DIFC (Dubai)", value: "Prescribed Company In Formation" },
  { label: "DMCC (Dubai)", value: "SPV In Formation" },
  { label: "Labuan", value: "Fund Mgmt / Wakil Structure In Setup" },
  { label: "CBUAE", value: "AUX Engagement — Phase 2" },
];

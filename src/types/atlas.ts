export type FlowType =
  | "pedigree_sourcing"
  | "storage"
  | "storage_trade"
  | "trade_storage"
  | "trade"
  | "sukuk_issuance"
  | "partnership";

export type FlowStatus =
  | "structural"
  | "pilot_window"
  | "mou_stage"
  | "network_setup"
  | "vault_onboarding"
  | "exploratory"
  | "monitoring"
  | "enhanced_due_diligence"
  | "active"
  | "paused";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ComplianceStatus =
  | "documented"
  | "under_review"
  | "enhanced_due_diligence"
  | "pending";

export type FlowColor =
  | "gold"
  | "white_gold"
  | "blue_gold"
  | "purple_gold"
  | "cool_white"
  | "amber"
  | "red_amber";

export type AtlasLayer =
  | "sourcing"
  | "storage"
  | "trade"
  | "sukuk"
  | "fund_management"
  | "pedigree"
  | "troy"
  | "aux"
  | "edd";

export type DashboardMode =
  | "global"
  | "sourcing"
  | "storage"
  | "trade"
  | "sukuk"
  | "products"
  | "briefing";

export interface GeoPoint {
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export interface SubPin {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export interface AtlasFlow {
  id: string;
  name: string;
  type: FlowType;
  source: GeoPoint;
  destination: GeoPoint;
  asset: string;
  /** Human-readable stage/state — replaces the old `volume` field. */
  state: string;
  status: FlowStatus;
  risk: RiskLevel;
  complianceStatus: ComplianceStatus;
  settlementWindow: string;
  entity: string;
  relatedProduct?: string;
  color: FlowColor;
  /** Optional quarter label, e.g. "Q2 2026" — replaces lastUpdated timestamps. */
  stageUpdated?: string;
  documents?: string[];
  timeline?: string[];
  executiveNotes?: string;
  /** Note attached to the flow (e.g. rendering hints, internal sensitivity). */
  note?: string;
}

export interface Jurisdiction {
  id: string;
  country: string;
  iso3?: string;
  cities: string[];
  role: string[];
  status: "active" | "structural" | "strategic" | "exploratory" | "monitoring";
  risk: RiskLevel;
  regulatoryClassification: string;
  entities: string[];
  layers: AtlasLayer[];
  coordinates: { lat: number; lng: number };
  subPins?: SubPin[];
}

export interface KpiValue {
  id: string;
  label: string;
  value: string;
  /** Optional small sub-line under the value (e.g. "4 regions", "VARA · Category 1 ARVA"). */
  sub?: string;
  /** Optional movement delta (e.g. "+1.4%"). Use sparingly — implies live data. */
  delta?: string;
  status?: "ok" | "warn" | "alert";
}

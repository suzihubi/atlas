export type FlowType =
  | "gold_sourcing"
  | "vault_transfer"
  | "token_mint"
  | "token_burn"
  | "redemption"
  | "liquidity"
  | "treasury"
  | "legal_structure"
  | "compliance"
  | "otc"
  | "regional_expansion";

export type FlowStatus =
  | "active"
  | "pending"
  | "settled"
  | "delayed"
  | "paused"
  | "escalated"
  | "failed"
  | "under_review"
  | "verified"
  | "simulated"
  | "structural"
  | "exploratory"
  | "monitoring";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ComplianceStatus =
  | "verified"
  | "pending_review"
  | "under_review"
  | "enhanced_due_diligence"
  | "missing_documentation"
  | "audit_required"
  | "regulator_review"
  | "blocked"
  | "documented"
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
  | "gold"
  | "vault"
  | "tokenization"
  | "treasury"
  | "compliance"
  | "legal"
  | "risk"
  | "institutional";

export type DashboardMode =
  | "live"
  | "gold"
  | "tokenization"
  | "treasury"
  | "legal"
  | "risk"
  | "report";

export interface GeoPoint {
  country: string;
  city: string;
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
  volume: string;
  status: FlowStatus;
  risk: RiskLevel;
  complianceStatus: ComplianceStatus;
  settlementWindow: string;
  entity: string;
  relatedProduct?: string;
  color: FlowColor;
  lastUpdated?: string;
  documents?: string[];
  timeline?: string[];
  executiveNotes?: string;
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
}

export interface KpiValue {
  id: string;
  label: string;
  value: string;
  delta?: string;
  status?: "ok" | "warn" | "alert";
}

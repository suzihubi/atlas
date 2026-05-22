import type {
  AtlasLayer,
  ComplianceStatus,
  FlowColor,
  FlowStatus,
  RiskLevel,
} from "@/types/atlas";

export const aumPalette = {
  brown: "#201914",
  darkBrown: "#1a1410",
  deep: "#0f0b08",
  creme: "#ffebc4",
  cremeMuted: "rgba(255, 235, 196, 0.55)",
  cremeFaint: "rgba(255, 235, 196, 0.12)",
  cremeBorder: "rgba(255, 235, 196, 0.18)",
  panel: "rgba(26, 20, 16, 0.72)",
  panelStrong: "rgba(15, 11, 8, 0.86)",
  goldLine: "#e8c87a",
  whiteGold: "#f3e2a3",
  blueGold: "#a8c4d8",
  purpleGold: "#c8a8d4",
  coolWhite: "#e8e1d0",
  amber: "#e6b85c",
  redAmber: "#d86868",
  success: "#9ed6a6",
  warn: "#e6b85c",
  danger: "#d86868",
} as const;

export const flowColorMap: Record<FlowColor, string> = {
  gold: aumPalette.goldLine,
  white_gold: aumPalette.whiteGold,
  blue_gold: aumPalette.blueGold,
  purple_gold: aumPalette.purpleGold,
  cool_white: aumPalette.coolWhite,
  amber: aumPalette.amber,
  red_amber: aumPalette.redAmber,
};

export const riskColorMap: Record<RiskLevel, string> = {
  low: aumPalette.success,
  medium: aumPalette.warn,
  high: aumPalette.danger,
  critical: aumPalette.danger,
};

export const statusLabelMap: Record<FlowStatus, string> = {
  structural: "Structural",
  pilot_window: "Pilot Window",
  mou_stage: "MOU Stage",
  network_setup: "Network Setup",
  vault_onboarding: "Vault Onboarding",
  exploratory: "Exploratory",
  monitoring: "Monitoring",
  enhanced_due_diligence: "Enhanced Due Diligence",
  active: "Active",
  paused: "Paused",
};

export const complianceLabelMap: Record<ComplianceStatus, string> = {
  documented: "Documented",
  under_review: "Under Review",
  enhanced_due_diligence: "Enhanced Due Diligence",
  pending: "Pending",
};

/** Layer → flow-line color token. Drives globe arc tinting per layer. */
export const layerColorMap: Record<AtlasLayer, FlowColor> = {
  sourcing: "gold",
  pedigree: "gold",
  storage: "white_gold",
  trade: "blue_gold",
  sukuk: "purple_gold",
  fund_management: "purple_gold",
  troy: "gold",
  aux: "blue_gold",
  edd: "red_amber",
};

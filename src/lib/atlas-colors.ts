import type { FlowColor, RiskLevel, FlowStatus, ComplianceStatus } from "@/types/atlas";

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
  active: "Active",
  pending: "Pending",
  settled: "Settled",
  delayed: "Delayed",
  paused: "Paused",
  escalated: "Escalated",
  failed: "Failed",
  under_review: "Under Review",
  verified: "Verified",
  simulated: "Simulated",
  structural: "Structural",
  exploratory: "Exploratory",
  monitoring: "Monitoring",
};

export const complianceLabelMap: Record<ComplianceStatus, string> = {
  verified: "Verified",
  pending_review: "Pending Review",
  under_review: "Under Review",
  enhanced_due_diligence: "Enhanced Due Diligence",
  missing_documentation: "Missing Documentation",
  audit_required: "Audit Required",
  regulator_review: "Regulator Review",
  blocked: "Blocked",
  documented: "Documented",
  pending: "Pending",
};

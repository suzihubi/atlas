import { riskColorMap, statusLabelMap } from "@/lib/atlas-colors";
import type { FlowStatus, RiskLevel } from "@/types/atlas";

export function StatusBadge({ status }: { status: FlowStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--atlas-border)] bg-[rgba(255,235,196,0.04)] px-2 py-[3px] text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--atlas-creme)] opacity-80" />
      {statusLabelMap[status]}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const color = riskColorMap[risk];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2 py-[3px] text-[10px] uppercase tracking-[0.14em]"
      style={{
        borderColor: `${color}55`,
        color,
        background: `${color}10`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {risk}
    </span>
  );
}

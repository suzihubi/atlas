import { feedEvents, alerts } from "@/data/kpis";
import { AumGlassCard } from "./AumGlassCard";

const categoryColor: Record<string, string> = {
  gold: "#e8c87a",
  token: "#c8a8d4",
  settlement: "#a8c4d8",
  compliance: "#e6b85c",
  vault: "#f3e2a3",
  risk: "#d86868",
};

const severityColor: Record<string, string> = {
  low: "#9ed6a6",
  medium: "#e6b85c",
  high: "#d86868",
};

export function RiskAlertFeed() {
  return (
    <div className="flex flex-col gap-3">
      <AumGlassCard eyebrow="Live Operational Feed" title="Last 60 minutes">
        <div className="flex flex-col">
          {feedEvents.map((e) => (
            <div
              key={e.id}
              className="flex items-start gap-2 border-b border-[var(--atlas-border)] py-2 last:border-b-0"
            >
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: categoryColor[e.category] }}
              />
              <div className="flex flex-1 flex-col">
                <span className="text-[12px] leading-snug text-[var(--atlas-creme)]">
                  {e.label}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
                  {e.time} UTC · {e.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AumGlassCard>

      <AumGlassCard eyebrow="Risk & Alerts" title={`${alerts.length} open`}>
        <div className="flex flex-col gap-2">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-2 rounded-[10px] border px-2.5 py-2"
              style={{
                borderColor: `${severityColor[a.severity]}44`,
                background: `${severityColor[a.severity]}08`,
              }}
            >
              <span
                className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: severityColor[a.severity] }}
              />
              <div className="flex flex-1 flex-col">
                <span className="text-[12px] leading-snug text-[var(--atlas-creme)]">
                  {a.label}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: severityColor[a.severity] }}
                >
                  {a.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AumGlassCard>

      <AumGlassCard eyebrow="Compliance Monitor" title="Open Items">
        <div className="flex flex-col">
          {[
            { label: "KYC / KYB Clearance Rate", value: "98.1%" },
            { label: "Sanctions Screening", value: "Clear" },
            { label: "Audit Status", value: "On Track" },
            { label: "MLRO Queue", value: "4" },
            { label: "Documents Pending", value: "12" },
            { label: "Pending Approvals", value: "2" },
          ].map((r) => (
            <div
              key={r.label}
              className="flex items-baseline justify-between border-b border-[var(--atlas-border)] py-1.5 last:border-b-0"
            >
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
                {r.label}
              </span>
              <span className="text-[13px] tabular-nums text-[var(--atlas-creme)]">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </AumGlassCard>
    </div>
  );
}

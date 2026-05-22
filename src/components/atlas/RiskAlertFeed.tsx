import { roadmapItems, watchListItems, regulatoryStatus } from "@/data/kpis";
import { AumGlassCard } from "./AumGlassCard";
import { aumPalette } from "@/lib/atlas-colors";

const categoryColor: Record<string, string> = {
  structural: aumPalette.purpleGold,
  regulatory: aumPalette.coolWhite,
  partnership: aumPalette.blueGold,
  product: aumPalette.goldLine,
  network: aumPalette.whiteGold,
  fund: aumPalette.purpleGold,
};

const severityColor: Record<string, string> = {
  low: aumPalette.success,
  medium: aumPalette.warn,
  high: aumPalette.danger,
};

/**
 * Right-hand activity panel.
 *
 * Now a forward-looking strategic view, not a faked live feed:
 *   1. Roadmap & Milestones   — quarter-labeled milestones
 *   2. Watch List             — jurisdictions under enhanced review
 *   3. Regulatory Status      — posture across jurisdictions
 */
export function RiskAlertFeed() {
  return (
    <div className="flex flex-col gap-3">
      <AumGlassCard eyebrow="Roadmap" title="Strategic Milestones">
        <div className="flex flex-col">
          {roadmapItems.map((e) => (
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
                  {e.milestone}
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
                  {e.quarter} · {e.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AumGlassCard>

      <AumGlassCard eyebrow="Watch List" title="Jurisdictions Under Enhanced Review">
        <div className="flex flex-col gap-2">
          {watchListItems.map((a) => (
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

      <AumGlassCard eyebrow="Regulatory Status" title="Position Across Jurisdictions">
        <div className="flex flex-col">
          {regulatoryStatus.map((r) => (
            <div
              key={r.label}
              className="flex items-baseline justify-between gap-3 border-b border-[var(--atlas-border)] py-1.5 last:border-b-0"
            >
              <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
                {r.label}
              </span>
              <span className="text-right text-[12px] text-[var(--atlas-creme)]">
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </AumGlassCard>
    </div>
  );
}

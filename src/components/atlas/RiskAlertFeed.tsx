import { roadmapItems } from "@/data/kpis";
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

/**
 * Right-hand activity panel — forward-looking strategic milestones only.
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
    </div>
  );
}

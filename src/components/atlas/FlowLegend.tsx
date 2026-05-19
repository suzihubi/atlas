"use client";

import { aumPalette } from "@/lib/atlas-colors";

const items = [
  { color: aumPalette.goldLine, label: "Bullion / Reserve Movement" },
  { color: aumPalette.whiteGold, label: "Vault / Custody" },
  { color: aumPalette.blueGold, label: "Fiat / Settlement Rail" },
  { color: aumPalette.purpleGold, label: "Legal / Issuance Structure" },
  { color: aumPalette.coolWhite, label: "Compliance / Audit" },
  { color: aumPalette.amber, label: "Pending / Medium Risk" },
  { color: aumPalette.redAmber, label: "High Risk / EDD" },
];

export function FlowLegend() {
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-10 flex flex-col gap-1.5 rounded-[14px] border border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] p-3 backdrop-blur-md">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
        Flow Legend
      </div>
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2">
          <span
            className="inline-block h-[2px] w-5 rounded-full"
            style={{ background: i.color, boxShadow: `0 0 8px ${i.color}88` }}
          />
          <span className="text-[11px] text-[var(--atlas-creme)]">{i.label}</span>
        </div>
      ))}
    </div>
  );
}

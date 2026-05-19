"use client";

import type { AtlasLayer, DashboardMode } from "@/types/atlas";

const layers: { id: AtlasLayer; label: string }[] = [
  { id: "gold", label: "Gold" },
  { id: "vault", label: "Vaults" },
  { id: "tokenization", label: "Tokenization" },
  { id: "treasury", label: "Treasury" },
  { id: "compliance", label: "Compliance" },
  { id: "legal", label: "Legal" },
  { id: "risk", label: "Risk" },
  { id: "institutional", label: "Institutional" },
];

const modes: { id: DashboardMode; label: string }[] = [
  { id: "live", label: "Global Live" },
  { id: "gold", label: "Gold Ops" },
  { id: "tokenization", label: "Tokenization" },
  { id: "treasury", label: "Treasury" },
  { id: "legal", label: "Legal" },
  { id: "risk", label: "Risk" },
  { id: "report", label: "Executive Report" },
];

type Props = {
  activeLayers: Set<AtlasLayer>;
  onToggleLayer: (l: AtlasLayer) => void;
  mode: DashboardMode;
  onModeChange: (m: DashboardMode) => void;
  onSnapshot: () => void;
};

export function LayerControlPanel({
  activeLayers,
  onToggleLayer,
  mode,
  onModeChange,
  onSnapshot,
}: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] border border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-3 py-2 backdrop-blur-md md:flex-row md:flex-wrap md:items-center md:gap-3">
      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 md:overflow-visible">
        {modes.map((m) => {
          const active = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-[var(--atlas-creme)] bg-[var(--atlas-creme)] text-[var(--atlas-brown)]"
                  : "border-[var(--atlas-border)] text-[var(--atlas-creme)] hover:border-[var(--atlas-creme-muted)]"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div className="mx-1 hidden h-6 w-px bg-[var(--atlas-border)] md:block" />

      <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 md:overflow-visible">
        {layers.map((l) => {
          const active = activeLayers.has(l.id);
          return (
            <button
              key={l.id}
              onClick={() => onToggleLayer(l.id)}
              className={`shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "border-[var(--atlas-creme-muted)] bg-[rgba(255,235,196,0.10)] text-[var(--atlas-creme)]"
                  : "border-[var(--atlas-border)] text-[var(--atlas-creme-muted)] hover:text-[var(--atlas-creme)]"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end md:ml-auto">
        <button
          onClick={onSnapshot}
          className="rounded-full border border-[var(--atlas-creme)] bg-transparent px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[var(--atlas-creme)] transition-colors hover:bg-[var(--atlas-creme)] hover:text-[var(--atlas-brown)]"
        >
          Executive Snapshot
        </button>
      </div>
    </div>
  );
}

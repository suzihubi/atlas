"use client";

import type { Jurisdiction, AtlasFlow } from "@/types/atlas";
import { RiskBadge } from "./StatusBadge";

type Props = {
  jurisdiction: Jurisdiction | null;
  flows: AtlasFlow[];
  onClose: () => void;
};

export function JurisdictionDetailDrawer({ jurisdiction, flows, onClose }: Props) {
  if (!jurisdiction) return null;

  const related = flows.filter(
    (f) =>
      f.source.country === jurisdiction.country ||
      f.destination.country === jurisdiction.country ||
      jurisdiction.country.includes(f.source.country) ||
      jurisdiction.country.includes(f.destination.country),
  );

  return (
    <div className="fixed inset-y-0 right-0 z-30 flex w-[420px] max-w-[100vw] flex-col border-l border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] backdrop-blur-xl">
      <div className="h-[3px] w-full bg-[var(--atlas-creme)]" style={{ boxShadow: "0 0 18px rgba(255,235,196,0.6)" }} />

      <div className="flex items-start justify-between px-5 pt-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
            {jurisdiction.regulatoryClassification}
          </div>
          <div className="-text-2 mt-1 text-[var(--atlas-creme)]">{jurisdiction.country}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <RiskBadge risk={jurisdiction.risk} />
            <span className="inline-flex items-center rounded-full border border-[var(--atlas-border)] px-2 py-[3px] text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme)]">
              {jurisdiction.status}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full border border-[var(--atlas-border)] px-2 py-1 text-[12px] text-[var(--atlas-creme)] hover:border-[var(--atlas-creme)]"
        >
          ×
        </button>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto px-5 pb-6">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
          Operational Role
        </div>
        <ul className="mt-2 flex flex-col gap-1">
          {jurisdiction.role.map((r) => (
            <li key={r} className="flex items-center gap-2 text-[12px] text-[var(--atlas-creme)]">
              <span className="inline-block h-1 w-1 rounded-full bg-[var(--atlas-creme-muted)]" />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
          Cities
        </div>
        <div className="mt-1 text-[12px] text-[var(--atlas-creme)]">
          {jurisdiction.cities.join(" · ")}
        </div>

        {jurisdiction.entities.length > 0 && (
          <>
            <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              AUM Entities
            </div>
            <ul className="mt-2 flex flex-col gap-1">
              {jurisdiction.entities.map((e) => (
                <li key={e} className="text-[12px] text-[var(--atlas-creme)]">
                  {e}
                </li>
              ))}
            </ul>
          </>
        )}

        {related.length > 0 && (
          <>
            <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              Active Flows ({related.length})
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {related.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between rounded-[10px] border border-[var(--atlas-border)] px-2.5 py-1.5"
                >
                  <span className="text-[12px] text-[var(--atlas-creme)]">
                    {f.source.country.split(" ")[0]} → {f.destination.country.split(" ")[0]}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
                    {f.volume}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
          Active Layers
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {jurisdiction.layers.map((l) => (
            <span
              key={l}
              className="rounded-full border border-[var(--atlas-border)] px-2 py-[3px] text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme)]"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

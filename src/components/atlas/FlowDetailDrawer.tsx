"use client";

import type { AtlasFlow } from "@/types/atlas";
import { RiskBadge, StatusBadge } from "./StatusBadge";
import { complianceLabelMap, flowColorMap } from "@/lib/atlas-colors";

type Props = {
  flow: AtlasFlow | null;
  onClose: () => void;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--atlas-border)] py-2 last:border-b-0">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme-muted)]">
        {label}
      </span>
      <span className="text-[13px] tabular-nums text-[var(--atlas-creme)]">{value}</span>
    </div>
  );
}

export function FlowDetailDrawer({ flow, onClose }: Props) {
  if (!flow) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-30 flex w-[420px] max-w-[100vw] flex-col border-l border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] backdrop-blur-xl">
      <div
        className="h-[3px] w-full"
        style={{
          background: flowColorMap[flow.color],
          boxShadow: `0 0 18px ${flowColorMap[flow.color]}88`,
        }}
      />

      <div className="flex items-start justify-between px-5 pt-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
            {flow.source.country} → {flow.destination.country}
          </div>
          <div className="-text-2 mt-1 text-[var(--atlas-creme)]">{flow.name}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={flow.status} />
            <RiskBadge risk={flow.risk} />
            <span className="inline-flex items-center rounded-full border border-[var(--atlas-border)] px-2 py-[3px] text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme)]">
              {complianceLabelMap[flow.complianceStatus]}
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
        <div className="rounded-[14px] border border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3">
          <Row label="Source City" value={flow.source.city} />
          <Row label="Destination City" value={flow.destination.city} />
          <Row label="Asset" value={flow.asset} />
          <Row label="Volume" value={flow.volume} />
          <Row label="Settlement Window" value={flow.settlementWindow} />
          <Row label="Responsible Entity" value={flow.entity} />
          {flow.relatedProduct && <Row label="Related Product" value={flow.relatedProduct} />}
          {flow.lastUpdated && <Row label="Last Update" value={flow.lastUpdated} />}
        </div>

        {flow.timeline && flow.timeline.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              Timeline
            </div>
            <ol className="mt-2 flex flex-col gap-1.5">
              {flow.timeline.map((t, i) => (
                <li key={i} className="flex items-baseline gap-2 text-[12px] text-[var(--atlas-creme)]">
                  <span className="text-[10px] text-[var(--atlas-creme-muted)]">{i + 1}.</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        )}

        {flow.documents && flow.documents.length > 0 && (
          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              Documents
            </div>
            <ul className="mt-2 flex flex-col gap-1">
              {flow.documents.map((d) => (
                <li key={d} className="flex items-center gap-2 text-[12px] text-[var(--atlas-creme)]">
                  <span className="inline-block h-1 w-1 rounded-full bg-[var(--atlas-creme-muted)]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {flow.executiveNotes && (
          <div className="mt-4 rounded-[12px] border border-[var(--atlas-creme-border)] bg-[rgba(255,235,196,0.06)] p-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              Executive Notes
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-[var(--atlas-creme)]">
              {flow.executiveNotes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { AtlasFlow } from "@/types/atlas";
import { flowColorMap } from "@/lib/atlas-colors";

type Props = {
  flow: AtlasFlow | null;
  onClose: () => void;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

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
  const isMobile = useIsMobile();
  return (
    <AnimatePresence>
      {flow && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            className="
              fixed z-50 flex flex-col overflow-hidden border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] backdrop-blur-xl
              inset-x-0 bottom-0 max-h-[85vh] rounded-t-[22px] border-x border-t
              md:inset-y-0 md:right-0 md:left-auto md:w-[420px] md:max-w-[100vw] md:max-h-none md:rounded-none md:border-l md:border-x-0 md:border-t-0
            "
            style={{
              paddingBottom: "var(--safe-bottom)",
            }}
            initial={isMobile ? { y: "100%" } : { x: 24, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: "100%" } : { x: 24, opacity: 0 }}
            transition={{ type: "tween", duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-center pt-2 md:hidden">
              <span className="h-1 w-9 rounded-full bg-[var(--atlas-creme-faint)]" />
            </div>

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
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full border border-[var(--atlas-border)] px-2 py-1 text-[12px] leading-none text-[var(--atlas-creme)] hover:border-[var(--atlas-creme)]"
              >
                ×
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto px-5 pb-6">
              <div className="rounded-[14px] border border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3">
                <Row label="Source City" value={flow.source.city} />
                <Row label="Destination City" value={flow.destination.city} />
                <Row label="Asset" value={flow.asset} />
                <Row label="State" value={flow.state} />
                <Row label="Settlement Window" value={flow.settlementWindow} />
                <Row label="Responsible Entity" value={flow.entity} />
                {flow.relatedProduct && <Row label="Related Product" value={flow.relatedProduct} />}
                {flow.stageUpdated && <Row label="Stage Updated" value={flow.stageUpdated} />}
              </div>

              {flow.timeline && flow.timeline.length > 0 && (
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
                    Timeline
                  </div>
                  <ol className="mt-2 flex flex-col gap-1.5">
                    {flow.timeline.map((t, i) => (
                      <li
                        key={i}
                        className="flex items-baseline gap-2 text-[12px] text-[var(--atlas-creme)]"
                      >
                        <span className="text-[10px] text-[var(--atlas-creme-muted)]">
                          {i + 1}.
                        </span>
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
                      <li
                        key={d}
                        className="flex items-center gap-2 text-[12px] text-[var(--atlas-creme)]"
                      >
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

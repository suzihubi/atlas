"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Jurisdiction, AtlasFlow } from "@/types/atlas";
import { RiskBadge } from "./StatusBadge";

type Props = {
  jurisdiction: Jurisdiction | null;
  flows: AtlasFlow[];
  onClose: () => void;
};

/** Tracks whether we should use the mobile bottom-sheet animation. */
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

export function JurisdictionDetailDrawer({ jurisdiction, flows, onClose }: Props) {
  const isMobile = useIsMobile();
  const related = jurisdiction
    ? flows.filter(
        (f) =>
          f.source.country === jurisdiction.country ||
          f.destination.country === jurisdiction.country ||
          jurisdiction.country.includes(f.source.country) ||
          jurisdiction.country.includes(f.destination.country),
      )
    : [];

  return (
    <AnimatePresence>
      {jurisdiction && (
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
            style={{ paddingBottom: "var(--safe-bottom)" }}
            initial={isMobile ? { y: "100%" } : { x: 24, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: "100%" } : { x: 24, opacity: 0 }}
            transition={{ type: "tween", duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-center pt-2 md:hidden">
              <span className="h-1 w-9 rounded-full bg-[var(--atlas-creme-faint)]" />
            </div>

            <div
              className="h-[3px] w-full bg-[var(--atlas-creme)]"
              style={{ boxShadow: "0 0 18px rgba(255,235,196,0.6)" }}
            />

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
                className="rounded-full border border-[var(--atlas-border)] px-2 py-1 text-[12px] leading-none text-[var(--atlas-creme)] hover:border-[var(--atlas-creme)]"
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
                  <li
                    key={r}
                    className="flex items-center gap-2 text-[12px] text-[var(--atlas-creme)]"
                  >
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
                      <li key={e} className="text-[12px] leading-snug text-[var(--atlas-creme)]">
                        {e}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {jurisdiction.subPins && jurisdiction.subPins.length > 0 && (
                <>
                  <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
                    Sub-Pins
                  </div>
                  <ul className="mt-2 flex flex-col gap-1">
                    {jurisdiction.subPins.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-center gap-2 text-[12px] text-[var(--atlas-creme)]"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--atlas-creme-muted)]" />
                        {s.label}
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
                          {f.state}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  maxHeight?: string;
};

export function MobileSheet({
  open,
  onClose,
  title,
  eyebrow,
  children,
  maxHeight = "85vh",
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-[22px] border-x border-t border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] backdrop-blur-2xl md:hidden"
            style={{
              maxHeight,
              paddingBottom: "var(--safe-bottom)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-center pt-2">
              <span className="h-1 w-9 rounded-full bg-[var(--atlas-creme-faint)]" />
            </div>
            <div className="flex items-start justify-between px-4 pt-2 pb-3">
              <div>
                {eyebrow && (
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
                    {eyebrow}
                  </div>
                )}
                <div className="-text-2 mt-0.5 text-[var(--atlas-creme)]">{title}</div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full border border-[var(--atlas-border)] px-2 py-1 text-[14px] leading-none text-[var(--atlas-creme)]"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 pb-3">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

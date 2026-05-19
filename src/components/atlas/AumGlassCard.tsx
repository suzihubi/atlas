import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  className?: string;
  pad?: "tight" | "normal";
};

export function AumGlassCard({ children, title, eyebrow, className = "", pad = "normal" }: Props) {
  return (
    <div
      className={`relative rounded-[18px] border border-[var(--atlas-border)] bg-[var(--atlas-panel)] backdrop-blur-md ${
        pad === "tight" ? "p-3" : "p-4"
      } ${className}`}
      style={{
        boxShadow:
          "0 1px 0 0 rgba(255, 235, 196, 0.04) inset, 0 24px 60px rgba(0, 0, 0, 0.45)",
      }}
    >
      {(eyebrow || title) && (
        <div className="mb-3">
          {eyebrow && (
            <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--atlas-creme-muted)]">
              {eyebrow}
            </div>
          )}
          {title && (
            <div className="-text-2 mt-1 text-[var(--atlas-creme)]">{title}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

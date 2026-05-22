import { headerKpis } from "@/data/kpis";

export function ExecutiveKpiBar() {
  return (
    <div className="flex flex-wrap gap-2">
      {headerKpis.map((k) => (
        <div
          key={k.id}
          className="flex min-w-[140px] flex-1 flex-col rounded-[14px] border border-[var(--atlas-border)] bg-[var(--atlas-panel)] px-4 py-3 backdrop-blur-md"
        >
          <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme-muted)]">
            {k.label}
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <div
              className="text-[var(--atlas-creme)]"
              style={{
                fontSize: "clamp(20px, 19.22px + 0.2vw, 22px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {k.value}
            </div>
            {k.delta && (
              <span
                className="text-[11px] tracking-tight"
                style={{
                  color:
                    k.status === "warn"
                      ? "var(--atlas-warn)"
                      : k.status === "alert"
                      ? "var(--atlas-danger)"
                      : "var(--atlas-success)",
                }}
              >
                {k.delta}
              </span>
            )}
          </div>
          {k.sub && (
            <div
              className="mt-1 truncate text-[10px] uppercase tracking-[0.12em]"
              style={{
                color:
                  k.status === "warn"
                    ? "var(--atlas-warn)"
                    : "var(--atlas-creme-muted)",
              }}
              title={k.sub}
            >
              {k.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

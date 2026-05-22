import {
  footprintCard,
  pedigreeCard,
  sukukCard,
  troyCard,
  auxCard,
} from "@/data/kpis";
import { AumGlassCard } from "./AumGlassCard";

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--atlas-border)] py-1.5 last:border-b-0">
      <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
        {label}
      </span>
      <span
        className="text-right text-[12px] text-[var(--atlas-creme)]"
        style={accent ? { color: "var(--atlas-success)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

export function OperationsPanel() {
  return (
    <div className="flex flex-col gap-3">
      <AumGlassCard eyebrow="Jurisdictional Footprint" title={`${footprintCard.active} Active`}>
        {footprintCard.rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </AumGlassCard>

      <AumGlassCard eyebrow="AUM PEDIGREE" title="Provenance & Digital Identity">
        <p className="-mt-1 mb-2 text-[11px] leading-snug text-[var(--atlas-creme-muted)]">
          {pedigreeCard.subtitle}
        </p>
        {pedigreeCard.rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </AumGlassCard>

      <AumGlassCard eyebrow="Sukuk Framework" title="Sharia-Compliant Issuance Architecture">
        {sukukCard.rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </AumGlassCard>

      <AumGlassCard eyebrow="TROY" title="Reserve-Backed Tokenization">
        {troyCard.rows.map((r) => (
          <Row
            key={r.label}
            label={r.label}
            value={r.value}
            accent={r.label === "Status"}
          />
        ))}
      </AumGlassCard>

      <AumGlassCard eyebrow="AUX" title="AED-Anchored Stable Instrument">
        {auxCard.rows.map((r) => (
          <Row key={r.label} label={r.label} value={r.value} />
        ))}
      </AumGlassCard>
    </div>
  );
}

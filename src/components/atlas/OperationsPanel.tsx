import { treasuryCard, reserveCard, troyCard, auxCard, footprintCard } from "@/data/kpis";
import { AumGlassCard } from "./AumGlassCard";

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--atlas-border)] py-1.5 last:border-b-0">
      <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--atlas-creme-muted)]">
        {label}
      </span>
      <span
        className="text-[13px] tabular-nums text-[var(--atlas-creme)]"
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
      <AumGlassCard eyebrow="Global Treasury Exposure" title={treasuryCard.total}>
        <div className="text-[10px] text-[var(--atlas-creme-muted)] -mt-2 mb-2">
          24h delta <span className="text-[var(--atlas-success)]">{treasuryCard.delta24h}</span>
        </div>
        <Row label="Gold Allocation" value={treasuryCard.gold} />
        <Row label="Fiat / Stablecoin" value={treasuryCard.fiat} />
        <Row label="Tokenized Reserves" value={treasuryCard.tokenized} />
        <Row label="Risk-Weighted" value={treasuryCard.riskWeighted} />
      </AumGlassCard>

      <AumGlassCard eyebrow="Reserve Status" title="Allocated Gold Under Control">
        <Row label="Allocated Gold" value={reserveCard.allocatedGold} />
        <Row label="Verified Bars" value={reserveCard.verifiedBars} />
        <Row label="Pending Assay" value={reserveCard.pendingAssay} />
        <Row label="Active Vaults" value={reserveCard.activeVaults} />
        <Row label="Coverage Ratio" value={reserveCard.coverageRatio} accent />
        <Row label="Last Verification" value={reserveCard.lastVerification} />
      </AumGlassCard>

      <AumGlassCard eyebrow="Jurisdictional Footprint" title={`${footprintCard.active} Active`}>
        <Row label="Legal Entities" value={String(footprintCard.legalEntities)} />
        <Row label="Vault Jurisdictions" value={String(footprintCard.vaultJurisdictions)} />
        <Row label="Banking Jurisdictions" value={String(footprintCard.bankingJurisdictions)} />
        <Row label="Sourcing Corridors" value={String(footprintCard.sourcing)} />
        <Row label="Enhanced Monitoring" value={String(footprintCard.edd)} />
      </AumGlassCard>

      <AumGlassCard eyebrow="TROY Operations" title="Reserve-Backed Tokenization">
        <Row label="Active Supply" value={troyCard.supply} />
        <Row label="Minted (lifetime)" value={troyCard.minted} />
        <Row label="Burned (lifetime)" value={troyCard.burned} />
        <Row label="NFT Bars Linked" value={troyCard.nftBars} />
        <Row label="Reserve Ratio" value={troyCard.reserveRatio} accent />
        <Row label="Mint Queue" value={troyCard.mintQueue} />
        <Row label="Redemption Queue" value={troyCard.redemptionQueue} />
      </AumGlassCard>

      <AumGlassCard eyebrow="AUX Treasury" title="Stable Instrument Monitor">
        <Row label="Parity Target" value={auxCard.parity} />
        <Row label="Hedge Coverage" value={auxCard.hedgeCoverage} accent />
        <Row label="Liquidity Pool" value={auxCard.liquidityPool} />
        <Row label="Parity Deviation" value={auxCard.parityDeviation} />
        <Row label="Settlement Liquidity" value={auxCard.settlementLiquidity} />
        <Row label="Treasury Stress" value={auxCard.treasuryStress} />
      </AumGlassCard>
    </div>
  );
}

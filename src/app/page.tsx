"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { flows } from "@/data/flows";
import { ExecutiveKpiBar } from "@/components/atlas/ExecutiveKpiBar";
import { OperationsPanel } from "@/components/atlas/OperationsPanel";
import { RiskAlertFeed } from "@/components/atlas/RiskAlertFeed";
import { LayerControlPanel } from "@/components/atlas/LayerControlPanel";
import { FlowLegend } from "@/components/atlas/FlowLegend";
import { FlowDetailDrawer } from "@/components/atlas/FlowDetailDrawer";
import { JurisdictionDetailDrawer } from "@/components/atlas/JurisdictionDetailDrawer";
import AumLogo from "@/components/icons/AumLogo";
import type { AtlasFlow, AtlasLayer, DashboardMode, Jurisdiction } from "@/types/atlas";

const OperationsGlobe = dynamic(
  () => import("@/components/atlas/OperationsGlobe").then((m) => m.OperationsGlobe),
  { ssr: false, loading: () => <GlobeSkeleton /> },
);

function GlobeSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--atlas-creme-muted)]">
        Initializing operational intelligence…
      </div>
    </div>
  );
}

const ALL_LAYERS: AtlasLayer[] = [
  "gold",
  "vault",
  "tokenization",
  "treasury",
  "compliance",
  "legal",
  "risk",
  "institutional",
];

function modeToLayers(mode: DashboardMode): Set<AtlasLayer> {
  switch (mode) {
    case "gold":
      return new Set<AtlasLayer>(["gold", "vault"]);
    case "tokenization":
      return new Set<AtlasLayer>(["tokenization", "vault"]);
    case "treasury":
      return new Set<AtlasLayer>(["treasury", "institutional"]);
    case "legal":
      return new Set<AtlasLayer>(["legal", "compliance"]);
    case "risk":
      return new Set<AtlasLayer>(["risk", "compliance", "gold"]);
    case "report":
    case "live":
    default:
      return new Set<AtlasLayer>(ALL_LAYERS);
  }
}

export default function AtlasPage() {
  const [mode, setMode] = useState<DashboardMode>("live");
  const [activeLayers, setActiveLayers] = useState<Set<AtlasLayer>>(new Set(ALL_LAYERS));
  const [selectedFlow, setSelectedFlow] = useState<AtlasFlow | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [utc, setUtc] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setUtc(`${hh}:${mm}:${ss} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleLayer = (l: AtlasLayer) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l);
      else next.add(l);
      return next;
    });
  };

  const onModeChange = (m: DashboardMode) => {
    setMode(m);
    setActiveLayers(modeToLayers(m));
  };

  const onSelectFlow = (f: AtlasFlow) => {
    setSelectedJurisdiction(null);
    setSelectedFlow(f);
  };
  const onSelectJurisdiction = (j: Jurisdiction) => {
    setSelectedFlow(null);
    setSelectedJurisdiction(j);
  };

  const visibleFlows = useMemo(() => flows, []);

  return (
    <div
      className="fixed inset-0 flex flex-col text-[var(--atlas-creme)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #2a2018 0%, #1a1410 45%, #0a0705 100%)",
      }}
    >
      {/* Top bar */}
      <header className="relative z-20 flex items-center gap-4 border-b border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <AumLogo />
          <div className="hidden flex-col leading-none md:flex">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--atlas-creme-muted)]">
              AUM Atlas
            </span>
            <span className="-text-2 mt-0.5 text-[var(--atlas-creme)]">
              Global Operations Command Center
            </span>
          </div>
        </div>

        <div className="ml-6 hidden flex-1 items-center gap-2 lg:flex">
          <ExecutiveKpiBar />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--atlas-border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme)] md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--atlas-success)]" />
            Executive Access
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--atlas-border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme-muted)] md:inline-flex">
            Class · Internal
          </span>
          <span className="tabular-nums text-[12px] text-[var(--atlas-creme)]">{utc}</span>
        </div>
      </header>

      {/* Mobile KPI rail */}
      <div className="border-b border-[var(--atlas-border)] bg-[var(--atlas-panel)] px-4 py-2 lg:hidden">
        <ExecutiveKpiBar />
      </div>

      {/* Main */}
      <div className="relative flex flex-1 min-h-0">
        {/* Left panel */}
        <aside className="hidden w-[320px] shrink-0 overflow-y-auto border-r border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3 backdrop-blur-md md:block">
          <OperationsPanel />
        </aside>

        {/* Globe stage */}
        <main className="relative flex-1">
          <FlowLegend />
          <OperationsGlobe
            flows={visibleFlows}
            activeLayers={activeLayers}
            onSelectFlow={onSelectFlow}
            onSelectJurisdiction={onSelectJurisdiction}
          />
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-[var(--atlas-creme-muted)] md:block">
            Drag · Scroll · Click jurisdictions to inspect
          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden w-[340px] shrink-0 overflow-y-auto border-l border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3 backdrop-blur-md lg:block">
          <RiskAlertFeed />
        </aside>
      </div>

      {/* Bottom controls */}
      <div className="relative z-20 border-t border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-4 py-3 backdrop-blur-md">
        <LayerControlPanel
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
          mode={mode}
          onModeChange={onModeChange}
          onSnapshot={() => alert("Executive Snapshot — coming soon")}
        />
      </div>

      <FlowDetailDrawer flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
      <JurisdictionDetailDrawer
        jurisdiction={selectedJurisdiction}
        flows={flows}
        onClose={() => setSelectedJurisdiction(null)}
      />

    </div>
  );
}

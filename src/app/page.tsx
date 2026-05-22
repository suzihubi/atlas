"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { flows } from "@/data/flows";
import { ExecutiveKpiBar } from "@/components/atlas/ExecutiveKpiBar";
import { OperationsPanel } from "@/components/atlas/OperationsPanel";
import { RiskAlertFeed } from "@/components/atlas/RiskAlertFeed";
import { LayerControlPanel } from "@/components/atlas/LayerControlPanel";
import { FlowLegend } from "@/components/atlas/FlowLegend";
import { FlowDetailDrawer } from "@/components/atlas/FlowDetailDrawer";
import { JurisdictionDetailDrawer } from "@/components/atlas/JurisdictionDetailDrawer";
import { MobileSheet } from "@/components/atlas/MobileSheet";
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
        Initializing strategic network…
      </div>
    </div>
  );
}

// All UI-toggleable layers. `edd` is layer-only (auto-applied to EDD-flagged flows).
const ALL_LAYERS: AtlasLayer[] = [
  "sourcing",
  "storage",
  "trade",
  "sukuk",
  "fund_management",
  "pedigree",
  "troy",
  "aux",
];

function modeToLayers(mode: DashboardMode): Set<AtlasLayer> {
  switch (mode) {
    case "sourcing":
      return new Set<AtlasLayer>(["sourcing", "pedigree", "edd"]);
    case "storage":
      return new Set<AtlasLayer>(["storage"]);
    case "trade":
      return new Set<AtlasLayer>(["trade"]);
    case "sukuk":
      return new Set<AtlasLayer>(["sukuk", "fund_management"]);
    case "products":
      return new Set<AtlasLayer>(["troy", "aux"]);
    case "global":
    case "briefing":
    default:
      return new Set<AtlasLayer>([...ALL_LAYERS, "edd"]);
  }
}

type MobilePanel = "operations" | "activity" | null;

export default function AtlasPage() {
  const [mode, setMode] = useState<DashboardMode>("global");
  const [activeLayers, setActiveLayers] = useState<Set<AtlasLayer>>(
    new Set([...ALL_LAYERS, "edd"]),
  );
  const [selectedFlow, setSelectedFlow] = useState<AtlasFlow | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null);

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
    setMobilePanel(null);
    setSelectedFlow(f);
  };
  const onSelectJurisdiction = (j: Jurisdiction) => {
    setSelectedFlow(null);
    setMobilePanel(null);
    setSelectedJurisdiction(j);
  };

  const visibleFlows = useMemo(() => flows, []);

  return (
    <div
      className="fixed inset-0 flex flex-col text-[var(--atlas-creme)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #2a2018 0%, #1a1410 45%, #0a0705 100%)",
        paddingTop: "var(--safe-top)",
        paddingLeft: "var(--safe-left)",
        paddingRight: "var(--safe-right)",
      }}
    >
      {/* Top bar */}
      <header className="relative z-20 flex items-center gap-3 border-b border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-3 py-2.5 backdrop-blur-md md:gap-4 md:px-5 md:py-3">
        <div className="flex items-center gap-2 md:gap-3">
          <AumLogo />
          <div className="flex flex-col leading-none">
            <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--atlas-creme-muted)] md:text-[10px]">
              AUM Atlas
            </span>
            <span className="mt-0.5 text-[12px] tracking-tight text-[var(--atlas-creme)] md:text-[18px]">
              <span className="hidden md:inline">Global Strategic Network</span>
              <span className="md:hidden">Strategic Network</span>
            </span>
          </div>
        </div>

        <div className="ml-6 hidden flex-1 items-center gap-2 lg:flex">
          <ExecutiveKpiBar />
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--atlas-border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme)] md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--atlas-success)]" />
            Executive Access
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--atlas-border)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme-muted)] lg:inline-flex">
            Class · Internal
          </span>
          <span
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
            style={{
              borderColor: "rgba(230, 184, 92, 0.55)",
              color: "var(--atlas-warn)",
              background: "rgba(230, 184, 92, 0.08)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--atlas-warn)" }}
            />
            <span className="hidden md:inline">ATI Held · Pre-Launch</span>
            <span className="md:hidden">ATI Held</span>
          </span>
        </div>
      </header>

      {/* Mobile KPI strip — horizontal scroll */}
      <div className="border-b border-[var(--atlas-border)] bg-[var(--atlas-panel)] backdrop-blur-md lg:hidden">
        <div className="no-scrollbar overflow-x-auto px-3 py-2">
          <div className="flex w-max gap-2">
            <ExecutiveKpiBar />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative flex min-h-0 flex-1">
        {/* Left panel — desktop only */}
        <aside className="hidden w-[320px] shrink-0 overflow-y-auto border-r border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3 backdrop-blur-md md:block">
          <OperationsPanel />
        </aside>

        {/* Globe stage */}
        <main className="relative flex-1">
          <div className="hidden sm:block">
            <FlowLegend />
          </div>

          {/* Mobile corner buttons */}
          <button
            onClick={() => setMobilePanel("operations")}
            className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme)] backdrop-blur-md md:hidden"
            aria-label="Open Network panel"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--atlas-creme)]" />
            Network
          </button>
          <button
            onClick={() => setMobilePanel("activity")}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--atlas-creme)] backdrop-blur-md lg:hidden"
            aria-label="Open Roadmap panel"
          >
            Roadmap
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--atlas-warn)" }}
            />
          </button>

          <OperationsGlobe
            flows={visibleFlows}
            activeLayers={activeLayers}
            onSelectFlow={onSelectFlow}
            onSelectJurisdiction={onSelectJurisdiction}
          />

          <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.22em] text-[var(--atlas-creme-muted)] md:text-[10px] md:tracking-[0.24em]">
            <span className="hidden md:inline">Drag · Scroll · Click jurisdictions</span>
            <span className="md:hidden">Pinch · Drag · Tap nodes</span>
          </div>
        </main>

        {/* Right panel — desktop only */}
        <aside className="hidden w-[340px] shrink-0 overflow-y-auto border-l border-[var(--atlas-border)] bg-[var(--atlas-panel)] p-3 backdrop-blur-md lg:block">
          <RiskAlertFeed />
        </aside>
      </div>

      {/* Bottom controls */}
      <div
        className="relative z-20 border-t border-[var(--atlas-border)] bg-[var(--atlas-panel-strong)] px-3 py-2.5 backdrop-blur-md md:px-4 md:py-3"
        style={{ paddingBottom: "max(var(--safe-bottom), 10px)" }}
      >
        <LayerControlPanel
          activeLayers={activeLayers}
          onToggleLayer={toggleLayer}
          mode={mode}
          onModeChange={onModeChange}
          onSnapshot={() => alert("Executive Briefing — coming soon")}
        />
      </div>

      {/* Mobile sheets */}
      <MobileSheet
        open={mobilePanel === "operations"}
        onClose={() => setMobilePanel(null)}
        eyebrow="Strategic Network"
        title="Footprint · PEDIGREE · Sukuk · TROY · AUX"
      >
        <OperationsPanel />
      </MobileSheet>
      <MobileSheet
        open={mobilePanel === "activity"}
        onClose={() => setMobilePanel(null)}
        eyebrow="Roadmap"
        title="Milestones · Watch List · Regulatory Status"
      >
        <RiskAlertFeed />
      </MobileSheet>

      <FlowDetailDrawer flow={selectedFlow} onClose={() => setSelectedFlow(null)} />
      <JurisdictionDetailDrawer
        jurisdiction={selectedJurisdiction}
        flows={flows}
        onClose={() => setSelectedJurisdiction(null)}
      />
    </div>
  );
}

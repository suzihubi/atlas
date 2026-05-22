"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { jurisdictions } from "@/data/jurisdictions";
import type { AtlasFlow, AtlasLayer, Jurisdiction } from "@/types/atlas";
import { aumPalette, flowColorMap } from "@/lib/atlas-colors";

type Props = {
  flows: AtlasFlow[];
  activeLayers: Set<AtlasLayer>;
  onSelectFlow: (f: AtlasFlow) => void;
  onSelectJurisdiction: (j: Jurisdiction) => void;
};

const COUNTRIES_GEOJSON =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

// Country names matching the Natural Earth GeoJSON `NAME` / `ADMIN` properties.
// BVI and Cayman intentionally absent — we don't operate there.
const AUM_COUNTRY_NAMES = new Set([
  "United Arab Emirates",
  "Switzerland",
  "United Kingdom",
  "Singapore",
  "Hong Kong S.A.R.",
  "Hong Kong",
  "Malaysia",
  "Ghana",
  "Colombia",
  "Mozambique",
]);

/** Maps a flow to the layer(s) that should make it visible on the globe. */
function layersForFlow(flow: AtlasFlow): AtlasLayer[] {
  const out: AtlasLayer[] = [];
  switch (flow.type) {
    case "pedigree_sourcing":
      out.push("sourcing", "pedigree");
      break;
    case "storage":
      out.push("storage");
      break;
    case "storage_trade":
      out.push("storage", "trade");
      break;
    case "trade_storage":
      out.push("trade", "storage");
      break;
    case "trade":
      out.push("trade");
      break;
    case "settlement":
      out.push("trade");
      break;
    case "sukuk_issuance":
      out.push("sukuk");
      break;
    case "partnership":
      // Trade Partner arc — surface under trade + troy modes.
      out.push("trade", "troy");
      break;
  }
  // Any flow related to sukuk also surfaces under the Sukuk layer.
  if (flow.relatedProduct?.toLowerCase().includes("sukuk") && !out.includes("sukuk")) {
    out.push("sukuk");
  }
  // Surface EDD-flagged flows under the EDD overlay layer.
  if (flow.complianceStatus === "enhanced_due_diligence") out.push("edd");
  return out;
}

export function OperationsGlobe({
  flows,
  activeLayers,
  onSelectFlow,
  onSelectJurisdiction,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const flowsRef = useRef<AtlasFlow[]>(flows);
  const layersRef = useRef<Set<AtlasLayer>>(activeLayers);
  const onSelectFlowRef = useRef(onSelectFlow);
  const onSelectJurisdictionRef = useRef(onSelectJurisdiction);

  flowsRef.current = flows;
  layersRef.current = activeLayers;
  onSelectFlowRef.current = onSelectFlow;
  onSelectJurisdictionRef.current = onSelectJurisdiction;

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 0, 320);

    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches === true;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isCoarse,
      alpha: true,
      powerPreference: isCoarse ? "low-power" : "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarse ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.webkitUserSelect = "none";
    renderer.domElement.style.userSelect = "none";
    mount.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0xfff4d6, 0.6);
    const dir = new THREE.DirectionalLight(0xffe8b5, 0.8);
    dir.position.set(180, 120, 220);
    scene.add(amb, dir);

    const globe = new ThreeGlobe({ animateIn: true })
      .showAtmosphere(true)
      .atmosphereColor(aumPalette.creme)
      .atmosphereAltitude(0.18);

    const globeMat = globe.globeMaterial() as THREE.MeshPhongMaterial;
    globeMat.color = new THREE.Color(aumPalette.darkBrown);
    globeMat.emissive = new THREE.Color(aumPalette.deep);
    globeMat.emissiveIntensity = 0.35;
    globeMat.shininess = 4;

    globe
      .polygonAltitude(0.005)
      .polygonCapColor(() => "rgba(60, 46, 32, 0.45)")
      .polygonSideColor(() => "rgba(0, 0, 0, 0)")
      .polygonStrokeColor(() => "rgba(255, 235, 196, 0.18)");

    fetch(COUNTRIES_GEOJSON)
      .then((r) => r.json())
      .then((geo: { features: Array<{ properties: { NAME?: string; ADMIN?: string } }> }) => {
        globe
          .polygonsData(geo.features)
          .polygonCapColor((d) => {
            const props = (d as { properties?: { NAME?: string; ADMIN?: string } }).properties;
            const name = props?.NAME || props?.ADMIN || "";
            if (AUM_COUNTRY_NAMES.has(name)) return "rgba(255, 235, 196, 0.18)";
            return "rgba(60, 46, 32, 0.35)";
          })
          .polygonStrokeColor((d) => {
            const props = (d as { properties?: { NAME?: string; ADMIN?: string } }).properties;
            const name = props?.NAME || props?.ADMIN || "";
            return AUM_COUNTRY_NAMES.has(name)
              ? "rgba(255, 235, 196, 0.65)"
              : "rgba(255, 235, 196, 0.10)";
          });
      })
      .catch(() => {
        // graceful fallback — globe still works without polygons
      });

    type PointDatum = {
      lat: number;
      lng: number;
      jurisdiction: Jurisdiction;
      subPin?: { id: string; label: string };
    };

    const primaryPoints: PointDatum[] = jurisdictions.map((j) => ({
      lat: j.coordinates.lat,
      lng: j.coordinates.lng,
      jurisdiction: j,
    }));

    const subPinPoints: PointDatum[] = jurisdictions.flatMap((j) =>
      (j.subPins ?? []).map((s) => ({
        lat: s.lat,
        lng: s.lng,
        jurisdiction: j,
        subPin: { id: s.id, label: s.label },
      })),
    );

    globe
      .pointsData([...primaryPoints, ...subPinPoints])
      .pointLat("lat")
      .pointLng("lng")
      .pointColor((d: object) =>
        (d as PointDatum).subPin ? "rgba(255, 235, 196, 0.55)" : aumPalette.creme,
      )
      .pointAltitude((d: object) => ((d as PointDatum).subPin ? 0.008 : 0.012))
      .pointRadius((d: object) => ((d as PointDatum).subPin ? 0.25 : 0.45));

    globe
      .ringsData(jurisdictions.map((j) => ({ lat: j.coordinates.lat, lng: j.coordinates.lng })))
      .ringColor(() => (t: number) => `rgba(255, 235, 196, ${1 - t})`)
      .ringMaxRadius(2.8)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(2200);

    function rebuildArcs() {
      const visibleFlows = flowsRef.current.filter((f) =>
        layersForFlow(f).some((l) => layersRef.current.has(l)),
      );
      // Compute great-circle distance (radians) for explicit altitude scaling.
      // Settlement arcs ride higher than supply arcs so the paired bidirectional
      // pair (gold-in + blue-out) reads as two parallel curves instead of one
      // overlapping line.
      const haversine = (a: AtlasFlow) => {
        const toRad = (d: number) => (d * Math.PI) / 180;
        const dLat = toRad(a.destination.lat - a.source.lat);
        const dLng = toRad(a.destination.lng - a.source.lng);
        const s =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(a.source.lat)) *
            Math.cos(toRad(a.destination.lat)) *
            Math.sin(dLng / 2) ** 2;
        return 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
      };

      globe
        .arcsData(visibleFlows)
        .arcStartLat((d: object) => (d as AtlasFlow).source.lat)
        .arcStartLng((d: object) => (d as AtlasFlow).source.lng)
        .arcEndLat((d: object) => (d as AtlasFlow).destination.lat)
        .arcEndLng((d: object) => (d as AtlasFlow).destination.lng)
        .arcColor((d: object) => {
          const c = flowColorMap[(d as AtlasFlow).color];
          return [`${c}00`, c, `${c}00`];
        })
        .arcAltitude((d: object) => {
          const f = d as AtlasFlow;
          const baseScale = f.type === "settlement" ? 0.85 : 0.55;
          // Approximate three-globe's auto behavior so we can offset per-type.
          return Math.min((haversine(f) / Math.PI) * baseScale, 0.9);
        })
        .arcStroke(0.55)
        .arcDashLength(0.42)
        .arcDashGap(1.2)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(3200);
    }
    rebuildArcs();
    (globe as unknown as { _atlasRebuildArcs: () => void })._atlasRebuildArcs = rebuildArcs;

    globe.scale.set(1.05, 1.05, 1.05);
    scene.add(globe);

    // ── Input state ──────────────────────────────────────────
    let rotY = 0;
    let rotX = -0.25;
    const minZ = 180;
    const maxZ = 520;

    type PointerState = { x: number; y: number; downX: number; downY: number };
    const pointers = new Map<number, PointerState>();
    let pinchDist = 0;
    let isDragging = false;
    let dragMoved = false;
    renderer.domElement.style.cursor = "grab";

    const isInteracting = () => pointers.size > 0;

    const dist = (a: PointerState, b: PointerState) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.hypot(dx, dy);
    };

    const onPtrDown = (e: PointerEvent) => {
      renderer.domElement.setPointerCapture?.(e.pointerId);
      pointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        downX: e.clientX,
        downY: e.clientY,
      });
      isDragging = pointers.size === 1;
      dragMoved = false;
      if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        pinchDist = dist(a, b);
      }
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPtrMove = (e: PointerEvent) => {
      const p = pointers.get(e.pointerId);
      if (!p) return;
      const prevX = p.x;
      const prevY = p.y;
      p.x = e.clientX;
      p.y = e.clientY;

      if (pointers.size === 1 && isDragging) {
        const dx = p.x - prevX;
        const dy = p.y - prevY;
        if (Math.abs(p.x - p.downX) > 4 || Math.abs(p.y - p.downY) > 4) dragMoved = true;
        rotY += dx * 0.005;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.005));
      } else if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        const next = dist(a, b);
        if (pinchDist > 0) {
          const scale = pinchDist / next;
          camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z * scale));
        }
        pinchDist = next;
        dragMoved = true;
      }
    };

    const onPtrUp = (e: PointerEvent) => {
      const p = pointers.get(e.pointerId);
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchDist = 0;
      if (pointers.size === 0) {
        renderer.domElement.style.cursor = "grab";
        if (p && !dragMoved) {
          // treat as tap → raycast
          handlePick(p.downX, p.downY);
        }
        isDragging = false;
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPtrDown);
    renderer.domElement.addEventListener("pointermove", onPtrMove);
    renderer.domElement.addEventListener("pointerup", onPtrUp);
    renderer.domElement.addEventListener("pointercancel", onPtrUp);
    renderer.domElement.addEventListener("pointerleave", onPtrUp);

    renderer.domElement.addEventListener(
      "wheel",
      (e: WheelEvent) => {
        e.preventDefault();
        camera.position.z = Math.max(minZ, Math.min(maxZ, camera.position.z + e.deltaY * 0.3));
      },
      { passive: false },
    );

    // ── Raycast tap → drawer ────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    function handlePick(clientX: number, clientY: number) {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      // raycast points larger on mobile for easier tapping
      raycaster.params.Points = { threshold: isCoarse ? 2.5 : 1.2 };
      const hits = raycaster.intersectObjects(globe.children, true);
      for (const hit of hits) {
        const o = hit.object;
        const d =
          (o as unknown as { __data?: { jurisdiction?: Jurisdiction } }).__data ||
          (o.parent as unknown as { __data?: { jurisdiction?: Jurisdiction } } | null)?.__data;
        if (d && (d as { jurisdiction?: Jurisdiction }).jurisdiction) {
          onSelectJurisdictionRef.current((d as { jurisdiction: Jurisdiction }).jurisdiction);
          return;
        }
        if (d && (d as AtlasFlow).id && (d as AtlasFlow).source) {
          onSelectFlowRef.current(d as AtlasFlow);
          return;
        }
      }
    }

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const animate = () => {
      if (!isInteracting()) {
        rotY += 0.0008;
      }
      globe.rotation.y = rotY;
      globe.rotation.x = rotX;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    globeRef.current = globe;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Re-build arcs whenever flows / active layers change
  useEffect(() => {
    const g = globeRef.current as unknown as { _atlasRebuildArcs?: () => void } | null;
    g?._atlasRebuildArcs?.();
  }, [flows, activeLayers]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

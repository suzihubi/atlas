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

const AUM_COUNTRY_NAMES = new Set([
  "United Arab Emirates",
  "Switzerland",
  "United Kingdom",
  "Singapore",
  "Hong Kong S.A.R.",
  "Hong Kong",
  "Cayman Is.",
  "Cayman Islands",
  "British Virgin Is.",
  "British Virgin Islands",
  "Malaysia",
  "Ghana",
  "Colombia",
  "Mozambique",
]);

function layerForFlow(flow: AtlasFlow): AtlasLayer {
  switch (flow.type) {
    case "gold_sourcing":
      return "gold";
    case "vault_transfer":
      return "vault";
    case "token_mint":
    case "token_burn":
    case "redemption":
      return "tokenization";
    case "liquidity":
    case "treasury":
    case "otc":
      return "treasury";
    case "legal_structure":
      return "legal";
    case "compliance":
      return "compliance";
    case "regional_expansion":
      return "institutional";
    default:
      return "treasury";
  }
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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
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

    globe
      .pointsData(
        jurisdictions.map((j) => ({
          lat: j.coordinates.lat,
          lng: j.coordinates.lng,
          jurisdiction: j,
        })),
      )
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => aumPalette.creme)
      .pointAltitude(0.012)
      .pointRadius(0.45);

    globe
      .ringsData(jurisdictions.map((j) => ({ lat: j.coordinates.lat, lng: j.coordinates.lng })))
      .ringColor(() => (t: number) => `rgba(255, 235, 196, ${1 - t})`)
      .ringMaxRadius(2.8)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(2200);

    function rebuildArcs() {
      const visibleFlows = flowsRef.current.filter((f) => layersRef.current.has(layerForFlow(f)));
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
        .arcAltitudeAutoScale(0.55)
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

    // Idle rotation
    let isInteracting = false;
    const onPointerDown = () => (isInteracting = true);
    const onPointerUp = () => (isInteracting = false);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);

    // Simple drag-to-rotate + wheel zoom (lightweight, avoids extra dep)
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotY = 0;
    let rotX = -0.25;
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
    });
    window.addEventListener("pointerup", () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    });
    window.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.005;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.005));
    });
    renderer.domElement.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        camera.position.z = Math.max(180, Math.min(520, camera.position.z + e.deltaY * 0.3));
      },
      { passive: false },
    );

    // Click → raycast against globe pointsData and arc geometry
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };
    renderer.domElement.addEventListener("pointerdown", (e) => {
      downPos = { x: e.clientX, y: e.clientY };
    });
    renderer.domElement.addEventListener("click", (e) => {
      const dx = Math.abs(e.clientX - downPos.x);
      const dy = Math.abs(e.clientY - downPos.y);
      if (dx > 4 || dy > 4) return; // it was a drag, not a click
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(globe.children, true);
      for (const hit of hits) {
        const o = hit.object;
        // three-globe attaches the source datum on the mesh via __data
        const d = (o as unknown as { __data?: { jurisdiction?: Jurisdiction } }).__data
          || (o.parent as unknown as { __data?: { jurisdiction?: Jurisdiction } } | null)?.__data;
        if (d && (d as { jurisdiction?: Jurisdiction }).jurisdiction) {
          onSelectJurisdictionRef.current((d as { jurisdiction: Jurisdiction }).jurisdiction);
          return;
        }
        if (d && (d as AtlasFlow).id && (d as AtlasFlow).source) {
          onSelectFlowRef.current(d as AtlasFlow);
          return;
        }
      }
    });

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
      if (!isInteracting) {
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

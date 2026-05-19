"use client";

import CornerOverlay from "../ui/CornerOverlay";
import ButtonSimple from "../ui/ButtonSimple";
import DownArrow from "../icons/DownArrow";
import AumLogo from "../icons/AumLogo";
import { DividerLeft, DividerRight } from "../icons/DividerShape";

export default function Header() {
  return (
    <section
      data-component="header"
      className="relative"
      style={{ height: "100svh" }}
    >
      {/* Shader container — 24px inset from all viewport edges */}
      <div
        className="shader-container absolute overflow-hidden"
        style={{ inset: 24 }}
      >
        {/* Gold gradient bg */}
        <div
          className="absolute w-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(200, 150, 20, 0.8) 0%, rgba(32, 25, 20, 0.95) 65%)",
            top: "-20vh",
            left: 0,
            height: "120vh",
          }}
        />

        <CornerOverlay position="top-left" />
        <CornerOverlay position="top-right" />
        <CornerOverlay position="bottom-left" />
        <CornerOverlay position="bottom-right" />

        {/* ─── TOP CONTENT: headline + intro ─── */}
        <div
          className="top-content g-row relative"
          style={{ paddingTop: 60, zIndex: 2, alignContent: "flex-start" }}
        >
          {/* Headline — 12/16 cols */}
          <h1
            className="-title-1 g-col"
            style={{
              flex: "0 0 calc(100% * 12 / 16)",
              maxWidth: "calc(100% * 12 / 16)",
            }}
          >
            Gold.{"\u2002"}Owned,{"\u2002"}Allocated,{"\u2002"}On-Chain
          </h1>

          {/* "Introduction" — aligned to bottom of headline */}
          <span
            className="-text-3 g-col description-label"
            style={{
              flex: "0 0 calc(100% * 4 / 16)",
              maxWidth: "calc(100% * 4 / 16)",
              opacity: 0.5,
              alignSelf: "flex-end",
              marginBottom: 4,
            }}
          >
            Introduction
          </span>

          {/* Separator */}
          <div
            className="g-col separator-container"
            style={{
              flex: "0 0 100%",
              height: 1,
              backgroundColor: "rgba(255, 235, 196, 0.15)",
              marginTop: 12,
            }}
          />

          {/* Body + CTA — 3 cols offset to col 12 */}
          <div
            className="g-col"
            style={{
              flex: "0 0 calc(100% * 3 / 16)",
              maxWidth: "calc(100% * 3 / 16)",
              marginLeft: "calc(100% * 12 / 16)",
              marginTop: 20,
            }}
          >
            <p className="-text-2" style={{ lineHeight: 1.3 }}>
              AUM establishes allocated UAEGD gold bars in a regulated,
              Sharia-compliant trust, held off balance sheet and tokenized 1:1
              to enable transfer and settlement.
            </p>
            <div style={{ marginTop: 32 }}>
              <ButtonSimple
                data-tally-open="7RXWZP"
                data-tally-layout="modal"
              >
                Join the Waitlist
              </ButtonSimple>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM AREA: logo + dividers + View Infrastructure ───
            Positioned at the bottom of the shader container.
            The darker visual appearance comes from the gradient fading. */}
        <div
          className="bottom-content absolute"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            padding: "0 30px",
          }}
        >
          {/* AUM Logo — left */}
          <div className="menu-wrapper">
            <AumLogo />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Divider shapes */}
          <DividerRight
            className="text-aum-creme"
            style={{ width: 133, height: 100, opacity: 0.12 }}
          />
          <DividerLeft
            className="text-aum-creme"
            style={{ width: 147, height: 100, opacity: 0.12 }}
          />

          {/* "View the Infrastructure" */}
          <a
            href="#infrastructure"
            className="-text-3"
            style={{
              color: "var(--color-geral-creme)",
              textDecoration: "none",
              marginLeft: 20,
            }}
          >
            View the Infrastructure
          </a>

          {/* Down arrow */}
          <div style={{ marginLeft: 16 }}>
            <DownArrow className="w-[16px] h-[16px] text-aum-creme" />
          </div>
        </div>
      </div>
    </section>
  );
}

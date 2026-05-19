"use client";

import { useEffect, useState } from "react";
import AumLogo from "../icons/AumLogo";
import ButtonSimple from "../ui/ButtonSimple";
import DownArrow from "../icons/DownArrow";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between transition-all duration-500"
      style={{
        padding: "16px 42px",
        zIndex: 100,
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        backgroundColor: "rgba(32, 25, 20, 0.7)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <AumLogo />

      <div className="flex items-center gap-6">
        <a
          href="#infrastructure"
          className="-text-3 flex items-center gap-2"
          style={{ color: "var(--color-geral-creme)", textDecoration: "none" }}
        >
          View the Infrastructure
          <DownArrow className="w-[13px] h-[14px]" />
        </a>
        <ButtonSimple data-tally-open="7RXWZP" data-tally-layout="modal">
          Join the Waitlist
        </ButtonSimple>
      </div>
    </nav>
  );
}

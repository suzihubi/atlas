import type { Metadata } from "next";
import AumLogo from "@/components/icons/AumLogo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "AUM Atlas — Access",
  robots: { index: false, follow: false, nocache: true },
};

const PAGE_CSS = `
:root {
  --color-creme: #ffebc4;
  --color-brown: #201914;
  --color-dark-brown: #1a1410;
}

.login-page {
  background: var(--color-dark-brown);
  color: var(--color-creme);
  min-height: 100vh;
  font-family: var(--font-kh-teka), "kh-teka-regular", "Inter", sans-serif;
  display: flex;
  flex-direction: column;
}

.aum-nav {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 1000;
  padding: clamp(20px, 2.4vw, 36px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.aum-nav > * { pointer-events: auto; }
.aum-nav__logo-link {
  display: block;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  overflow: hidden;
  transition: opacity .3s cubic-bezier(.23,1,.32,1);
}
.aum-nav__logo-link:hover { opacity: .8; }
.aum-nav__logo-link svg { display: block; }

.login-hero {
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  padding-left: clamp(24px, 3vw, 48px);
  padding-right: clamp(24px, 3vw, 48px);
}
.login-hero__inner {
  padding-top: clamp(140px, 14vw, 220px);
  padding-bottom: clamp(60px, 6vw, 120px);
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.login-hero__columns {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: clamp(40px, 5vw, 96px);
  width: 100%;
}
.login-hero__left  { flex: 1 1 460px; min-width: 0; }
.login-hero__right { flex: 0 1 540px; min-width: 0; }

.login-hero__glow {
  position: absolute;
  top: 0; right: 0;
  width: 70%;
  height: 100%;
  background: radial-gradient(ellipse 65% 65% at 75% 50%, rgba(180,135,45,.18) 0%, transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.login-eyebrow {
  opacity: .4;
  margin: 0 0 clamp(16px, 1.5vw, 32px);
  font-family: inherit;
  font-size: clamp(12px, .7vw, 14px);
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--color-creme);
}

.login-title {
  margin: 0 0 clamp(20px, 1.8vw, 36px);
  font-family: inherit;
  font-weight: 400;
  font-size: clamp(54px, 38px + 3.8vw, 104px);
  letter-spacing: -.045em;
  line-height: .92em;
  color: var(--color-creme);
}

.login-description {
  opacity: .7;
  max-width: 480px;
  margin: 0 0 clamp(28px, 2.4vw, 44px);
  font-size: clamp(15px, .9vw, 17px);
  line-height: 1.55;
  color: var(--color-creme);
}

.login-panel {
  position: relative;
  width: 100%;
  max-width: 540px;
  padding: clamp(36px, 3.2vw, 56px) clamp(28px, 2.6vw, 44px);
  background: rgba(255, 235, 196, .03);
  border: 1px solid rgba(255, 235, 196, .14);
  border-radius: 2px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.login-panel__corner {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
}
.login-panel__corner--tl { top: -1px;    left: -1px;    border-top:    1px solid var(--color-creme); border-left:  1px solid var(--color-creme); }
.login-panel__corner--tr { top: -1px;    right: -1px;   border-top:    1px solid var(--color-creme); border-right: 1px solid var(--color-creme); }
.login-panel__corner--bl { bottom: -1px; left: -1px;    border-bottom: 1px solid var(--color-creme); border-left:  1px solid var(--color-creme); }
.login-panel__corner--br { bottom: -1px; right: -1px;   border-bottom: 1px solid var(--color-creme); border-right: 1px solid var(--color-creme); }

.login-panel__head {
  font-size: 10.5px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255, 235, 196, .42);
  margin: 0 0 clamp(20px, 1.6vw, 28px);
  padding-bottom: clamp(18px, 1.4vw, 24px);
  border-bottom: 1px solid rgba(255, 235, 196, .10);
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: clamp(18px, 1.4vw, 26px);
}
.login-label {
  font-family: inherit;
  font-size: 10.5px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255, 235, 196, .42);
  margin: 0;
}
.login-input {
  width: 100%;
  padding: 16px 18px;
  background: rgba(255, 235, 196, .04);
  border: 1px solid rgba(255, 235, 196, .16);
  border-radius: 2px;
  color: var(--color-creme);
  font-family: inherit;
  font-size: 15px;
  letter-spacing: .01em;
  transition: border-color .2s ease, background .2s ease;
  -webkit-appearance: none;
       appearance: none;
}
.login-input::placeholder { color: rgba(255, 235, 196, .28); letter-spacing: .06em; }
.login-input:focus {
  outline: none;
  border-color: rgba(255, 235, 196, .45);
  background: rgba(255, 235, 196, .07);
}

.login-ack {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 12.5px;
  line-height: 1.6;
  color: rgba(255, 235, 196, .65);
  margin: clamp(12px, 1vw, 20px) 0 clamp(24px, 2vw, 32px);
  cursor: pointer;
  user-select: none;
}
.login-ack input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  margin: 2px 0 0;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  background: rgba(255, 235, 196, .04);
  border: 1px solid rgba(255, 235, 196, .30);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: background .15s ease, border-color .15s ease;
}
.login-ack input[type="checkbox"]:hover { border-color: rgba(255, 235, 196, .60); }
.login-ack input[type="checkbox"]:checked {
  background: var(--color-creme);
  border-color: var(--color-creme);
}
.login-ack input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  left: 4px; top: 1px;
  width: 5px; height: 9px;
  border: solid #1a1410;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
}

.login-error {
  margin: 0 0 22px;
  padding: 12px 16px;
  background: rgba(201, 80, 60, .10);
  border: 1px solid rgba(201, 80, 60, .32);
  border-radius: 2px;
  color: #f0d1c8;
  font-size: 13px;
  line-height: 1.5;
}

.login-submit {
  width: 100%;
  padding: 18px;
  background: var(--color-creme);
  color: var(--color-dark-brown);
  border: none;
  border-radius: 2px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .26em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity .2s ease, transform .06s ease;
}
.login-submit:hover:not(:disabled) { opacity: .90; }
.login-submit:active:not(:disabled) { transform: translateY(1px); }
.login-submit:disabled { opacity: .45; cursor: not-allowed; }

.login-footer {
  background: var(--color-dark-brown);
  border-top: 1px solid rgba(255, 235, 196, .06);
}
.login-footer__inner {
  padding: clamp(24px, 2.4vw, 36px) clamp(24px, 3vw, 48px);
  text-align: center;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255, 235, 196, .28);
}

@media only screen and (max-width: 743px) {
  .login-hero__inner { padding-top: clamp(120px, 22vw, 180px); }
  .login-title { font-size: clamp(40px, 9vw, 56px); }
  .login-panel { max-width: 100%; padding: 28px 24px; }
}
`.trim();

export default function LoginPage() {
  const year = new Date().getUTCFullYear();
  return (
    <div className="login-page">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <nav className="aum-nav" aria-label="Brand">
        <a href="/login" className="aum-nav__logo-link" aria-label="AUM">
          <AumLogo />
        </a>
      </nav>

      <section className="login-hero">
        <div className="login-hero__glow" aria-hidden="true" />
        <div className="login-hero__inner">
          <div className="login-hero__columns">

            <div className="login-hero__left">
              <p className="login-eyebrow">Restricted Access</p>
              <h1 className="login-title">
                Executive<br />access.
              </h1>
              <p className="login-description">
                Access to AUM ATLAS is restricted to the Executive Team. Please enter your
                corporate email address and your unique access code provided to you.
              </p>
            </div>

            <div className="login-hero__right">
              <div className="login-panel">
                <span className="login-panel__corner login-panel__corner--tl" aria-hidden="true" />
                <span className="login-panel__corner login-panel__corner--tr" aria-hidden="true" />
                <span className="login-panel__corner login-panel__corner--bl" aria-hidden="true" />
                <span className="login-panel__corner login-panel__corner--br" aria-hidden="true" />
                <p className="login-panel__head">Access credentials</p>
                <LoginForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="login-footer">
        <div className="login-footer__inner">
          AUM Group Holdings Limited &middot; {year} &middot; All rights reserved
        </div>
      </footer>
    </div>
  );
}

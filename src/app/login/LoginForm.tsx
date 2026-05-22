"use client";

import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [ack, setAck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!ack) {
      setError("Please acknowledge the confidentiality notice to proceed.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim(), acknowledged: true }),
      });

      if (res.status === 200) {
        const url = new URL(window.location.href);
        const next = url.searchParams.get("next");
        const target = next && next.startsWith("/") ? next : "/";
        window.location.assign(target);
        return;
      }

      if (res.status === 429) {
        setError("Too many attempts. Please try again later.");
      } else if (res.status === 403) {
        setError("Access is restricted to AUM corporate email addresses.");
      } else {
        setError("Invalid email or access code.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {error && <p role="alert" className="login-error">{error}</p>}

      <div className="login-field">
        <label htmlFor="email" className="login-label">Corporate email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="name@aum.money"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          disabled={submitting}
        />
      </div>

      <div className="login-field">
        <label htmlFor="code" className="login-label">Access code</label>
        <input
          id="code"
          name="code"
          type="text"
          autoComplete="off"
          inputMode="text"
          placeholder="ABCD-EFGH-JKLM-NPQR"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="login-input"
          spellCheck={false}
          disabled={submitting}
        />
      </div>

      <label className="login-ack">
        <input
          type="checkbox"
          checked={ack}
          onChange={(e) => setAck(e.target.checked)}
          disabled={submitting}
        />
        <span>
          I acknowledge that AUM Atlas is confidential, proprietary to AUM, and may not be
          copied, downloaded, printed, screenshotted, recorded, or redistributed without AUM&rsquo;s
          prior written consent. Access may be monitored and logged.
        </span>
      </label>

      <button type="submit" className="login-submit" disabled={submitting}>
        {submitting ? "Verifying…" : "Enter"}
      </button>
    </form>
  );
}

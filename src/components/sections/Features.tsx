import FeaturePoint from "../ui/FeaturePoint";

const features = [
  { title: "Direct Beneficial Ownership", subtitle: "Real legal title", offset: false },
  { title: "Regulated UAE Trusts", subtitle: "Bank-independent and bankruptcy-remote", offset: true },
  { title: "24/7 Vault Livestreams", subtitle: "Continuous proof of reserves", offset: true },
  { title: "Quarterly Audits", subtitle: "By independent auditors", offset: false },
  { title: "Institutional-Grade Redemption", subtitle: "Lower minimums. Faster settlement.", offset: false },
];

export default function Features() {
  return (
    <section
      data-component="features"
      style={{
        backgroundColor: "var(--color-geral-creme)",
        color: "var(--color-geral-brown)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background area — "Institutional Trust" title on left */}
      <div
        className="background relative"
        style={{
          minHeight: "clamp(400px, 40vw, 800px)",
          padding: "clamp(80px, 60px + 4vw, 200px) 0",
        }}
      >
        <div style={{ paddingLeft: "var(--grid-padding)" }}>
          <h2 className="-title-1" style={{ color: "var(--color-geral-brown)" }}>
            Institutional
            <br />
            Trust
          </h2>
        </div>
      </div>

      {/* Feature list — right side */}
      <div className="content-wrapper" style={{ position: "relative", zIndex: 2 }}>
        <div className="g-row list-container">
          {/* Offset to right: skip ~9 cols, span ~6 cols */}
          <div
            className="g-col"
            style={{
              marginLeft: "calc(100% * 9 / 16)",
              flex: "0 0 calc(100% * 6 / 16)",
              maxWidth: "calc(100% * 6 / 16)",
              paddingBottom: "clamp(60px, 40px + 4vw, 120px)",
            }}
          >
            {features.map((feature) => (
              <FeaturePoint
                key={feature.title}
                title={feature.title}
                subtitle={feature.subtitle}
                offset={feature.offset}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

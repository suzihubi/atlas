import GearIcon from "../icons/GearIcon";
import { CardShape1, CardShape2 } from "../icons/CardShape";
import CornerOverlay from "../ui/CornerOverlay";
import HighlightedText from "../ui/HighlightedText";

function ProductCard({
  name,
  subtitle,
  description,
  comingSoon,
  shape: Shape,
}: {
  name: string;
  subtitle: string;
  description: string;
  comingSoon?: boolean;
  shape: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="g-col g-col-8">
      <div
        data-component="product-card"
        className="relative"
        style={{ padding: "120px 0", overflow: "visible" }}
      >
        {/* Corner overlays */}
        <CornerOverlay position="top-left" />
        <CornerOverlay position="top-right" />
        <CornerOverlay position="bottom-left" />
        <CornerOverlay position="bottom-right" />

        {/* Shape background — octagon centered in card */}
        <div
          className="shape relative flex items-center justify-center"
          style={{ height: "clamp(300px, 25vw, 500px)" }}
        >
          <Shape className="w-[80%] h-auto text-[#b8860b] opacity-60" />
        </div>

        {/* Content overlay — small title at top, subtitle at bottom of shape */}
        <div
          className="content absolute inset-0 flex flex-col justify-between"
          style={{ padding: "30px clamp(20px, 1vw, 40px) 40px" }}
        >
          {/* Small title + coming soon badge */}
          <div className="title-container">
            <div className="flex items-center gap-3">
              <span
                className="-text-3"
                style={{ textTransform: "uppercase", letterSpacing: "0.02em" }}
              >
                {name}
              </span>
              {comingSoon && (
                <span
                  className="-text-4"
                  style={{
                    border: "1px solid var(--color-geral-creme)",
                    borderRadius: 40,
                    padding: "4px 14px",
                    opacity: 0.6,
                  }}
                >
                  coming soon
                </span>
              )}
            </div>
          </div>

          {/* Subtitle — overlapping bottom of shape */}
          <h3 className="-title-3">{subtitle}</h3>
        </div>

        {/* External — giant title overlapping card bottom + description */}
        <div className="external" style={{ marginTop: -60, overflow: "hidden" }}>
          <span
            className="-title-1"
            style={{
              fontSize: "clamp(120px, 80px + 10vw, 280px)",
              lineHeight: 0.85,
              textTransform: "uppercase",
              display: "block",
              letterSpacing: "-0.05em",
            }}
          >
            {name}
          </span>
          <p
            className="-text-3 description"
            style={{
              marginTop: 16,
              opacity: 0.6,
              lineHeight: 1.3,
              maxWidth: "30ch",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section
      id="infrastructure"
      data-component="products"
      style={{
        backgroundColor: "var(--color-geral-brown)",
        color: "var(--color-geral-creme)",
        padding: "80px 0 120px",
      }}
    >
      {/* Section eyebrow */}
      <div className="g-row" style={{ marginBottom: 60 }}>
        <div className="g-col g-col-16">
          <div className="flex items-center gap-[clamp(6px,4.44px+0.4vw,12px)]">
            <GearIcon className="w-[15px] h-[14px] text-aum-creme" />
            <span className="-uppertitle" style={{ textTransform: "uppercase" }}>
              Infrastructure Components
            </span>
          </div>
        </div>
      </div>

      {/* Product cards */}
      <div className="g-row">
        <ProductCard
          name="Troy"
          subtitle="Digital Gold, Redefined."
          description="Each TROY represents ownership of one troy ounce of UAEGD, fully allocated gold. Built for on-chain transfer, institutional settlement, and legally protected ownership."
          shape={CardShape1}
        />
        <ProductCard
          name="Aux"
          subtitle="Stability Forged in Gold."
          description="A gold-backed stablecoin secured by allocated UAEGD gold, with AED stability maintained via a delta-neutral hedging strategy."
          comingSoon
          shape={CardShape2}
        />
      </div>

      {/* Combined value proposition */}
      <div className="g-row" style={{ marginTop: "clamp(60px, 40px + 4vw, 120px)" }}>
        <div className="g-col g-col-16 text-center">
          <p className="-title-3">
            Together, <HighlightedText small>TROY</HighlightedText> and{" "}
            <HighlightedText small>AUX</HighlightedText> enable gold to function as a reserve
            asset in modern finance
          </p>
        </div>
      </div>
    </section>
  );
}

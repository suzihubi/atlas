import AsteriskIcon from "../icons/AsteriskIcon";

export default function FeaturePoint({
  title,
  subtitle,
  offset,
}: {
  title: string;
  subtitle: string;
  offset?: boolean;
}) {
  return (
    <div
      data-component="feature-point"
      className="flex items-start"
      style={{
        gap: 15,
        marginLeft: offset ? "clamp(40px, 30px + 2vw, 90px)" : 0,
        marginBottom: "clamp(60px, 40px + 4vw, 120px)",
      }}
    >
      <AsteriskIcon
        className="shrink-0 text-aum-brown"
        style={{
          width: 20,
          height: 20,
          marginTop: "0.15em",
        }}
      />
      <div>
        <h3
          className="-title-3"
          style={{
            color: "var(--color-geral-brown)",
          }}
        >
          {title}
        </h3>
        <p
          className="-text-2"
          style={{
            color: "var(--color-geral-brown)",
            opacity: 0.5,
            marginTop: "0.3em",
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function HighlightedText({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      data-component="highlighted-text"
      className={small ? "small" : ""}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <span
        className="bg"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: small
            ? "clamp(2px, 1.22px + 0.2vw, 4px)"
            : "clamp(4px, 1.66px + 0.6vw, 12px)",
          border: "1px solid var(--color-geral-creme)",
        }}
      />
      <span style={{ position: "relative", padding: "0.15em 0.4em" }}>
        {children}
      </span>
    </span>
  );
}

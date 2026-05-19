type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const gradients: Record<Position, string> = {
  "top-left": "radial-gradient(circle at 100% 100%, transparent 70.8%, var(--color-geral-brown) 70.8%)",
  "top-right": "radial-gradient(circle at 0 100%, transparent 70.8%, var(--color-geral-brown) 70.8%)",
  "bottom-left": "radial-gradient(circle at 100% 0, transparent 70.8%, var(--color-geral-brown) 70.8%)",
  "bottom-right": "radial-gradient(circle at 0 0, transparent 70.8%, var(--color-geral-brown) 70.8%)",
};

const positionStyles: Record<Position, React.CSSProperties> = {
  "top-left": { top: -1, left: -1 },
  "top-right": { top: -1, right: -1 },
  "bottom-left": { bottom: -1, left: -1 },
  "bottom-right": { bottom: -1, right: -1 },
};

export default function CornerOverlay({ position }: { position: Position }) {
  return (
    <div
      className="corner-overlay absolute"
      style={{
        width: "min(12px, 12px + 100vw * 0)",
        height: "min(12px, 12px + 100vw * 0)",
        background: gradients[position],
        ...positionStyles[position],
      }}
    />
  );
}

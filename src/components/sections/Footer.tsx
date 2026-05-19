import ButtonSimple from "../ui/ButtonSimple";

export default function Footer() {
  return (
    <footer
      data-component="footer"
      style={{
        backgroundColor: "var(--color-geral-dark-brown)",
        color: "var(--color-geral-creme)",
        padding: "120px 0 82px",
      }}
    >
      <div className="g-row">
        <div className="g-col g-col-16 flex flex-col items-center text-center">
          {/* Large headline */}
          <h2 className="-title-1" style={{ marginBottom: "clamp(40px, 30px + 3vw, 80px)" }}>
            Gold, rebuilt as
            <br />
            monetary infrastructure
          </h2>

          {/* 3D gold bar placeholder — visual shape */}
          <div
            className="shape-container relative flex items-center justify-center"
            style={{
              width: "clamp(300px, 40vw, 600px)",
              height: "clamp(200px, 25vw, 400px)",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 24,
                background: "linear-gradient(135deg, #c9940a 0%, #a67c00 40%, #7a5c00 100%)",
                transform: "perspective(800px) rotateY(-8deg) rotateX(5deg)",
              }}
            />
          </div>

          {/* Tagline */}
          <p
            className="-text-1"
            style={{ opacity: 0.5, marginBottom: 32, fontStyle: "italic" }}
          >
            A new standard for gold
          </p>

          {/* CTA */}
          <ButtonSimple data-tally-open="7RXWZP" data-tally-layout="modal">
            Join the Waitlist
          </ButtonSimple>

          {/* Attribution */}
          <a
            href="https://burocratik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="-uppertitle"
            style={{
              color: "var(--color-geral-creme)",
              textDecoration: "none",
              opacity: 0.4,
              marginTop: "clamp(60px, 40px + 4vw, 120px)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Made by B&uuml;ro
          </a>
        </div>
      </div>
    </footer>
  );
}

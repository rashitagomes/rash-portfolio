// Calm static background: a faint dot grid plus a soft accent glow at the
// top. No animation — keeps the page quiet and professional.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--color-line) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent)",
        }}
      />
    </div>
  );
}

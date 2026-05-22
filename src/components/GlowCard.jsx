import { useEffect, useRef } from "react";

const GLOW_COLORS = {
  purple: { base: 263, spread: 280 },
  teal:   { base: 175, spread: 180 },
  blue:   { base: 217, spread: 220 },
  green:  { base: 145, spread: 200 },
};

const GLOW_CSS = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
      transparent 100%
    );
    filter: brightness(2);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)),
      transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

export function GlowCard({ children, glowColor = "blue", style = {} }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const sync = (e) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--x", e.clientX.toFixed(2));
      cardRef.current.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      cardRef.current.style.setProperty("--y", e.clientY.toFixed(2));
      cardRef.current.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  const { base, spread } = GLOW_COLORS[glowColor] ?? GLOW_COLORS.blue;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOW_CSS }} />
      <div
        ref={cardRef}
        data-glow
        style={{
          "--base": base,
          "--spread": spread,
          "--radius": "14",
          "--border": "2",
          "--backdrop": "rgba(255,255,255,0.97)",
          "--backup-border": "#d4d4e0",
          "--size": "260",
          "--outer": "1",
          "--border-size": "calc(var(--border, 2) * 1px)",
          "--spotlight-size": "calc(var(--size, 150) * 1px)",
          "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
          backgroundImage: `radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)),
            transparent
          )`,
          backgroundColor: "var(--backdrop, transparent)",
          backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
          backgroundPosition: "50% 50%",
          backgroundAttachment: "fixed",
          border: "var(--border-size) solid var(--backup-border)",
          borderRadius: 14,
          padding: "clamp(1rem,2.5vw,1.25rem)",
          position: "relative",
          overflow: "hidden",
          touchAction: "none",
          boxShadow: "0 4px 24px rgba(60,50,120,0.10), 0 1px 6px rgba(0,0,0,0.06)",
          ...style,
        }}
      >
        <div data-glow />
        {children}
      </div>
    </>
  );
}

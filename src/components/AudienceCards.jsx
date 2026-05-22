import { useState, useEffect, useRef } from "react";

function useCounter(target, active, duration = 900) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!active || !target) return;
    setVal(0);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);
  return val;
}

const fmt = (n) => n >= 1000 ? n.toLocaleString() : n;

// Brand colours — matches logo gradient: blue → purple → pink
const BRAND = {
  blue:        "#3b82f6",
  blueLight:   "#93c5fd",
  blueBg:      "rgba(59,130,246,0.22)",
  bluePill:    "rgba(59,130,246,0.55)",
  purple:      "#7c3aed",
  purpleLight: "#c4b5fd",
  purpleBg:    "rgba(124,58,237,0.22)",
  purplePill:  "rgba(124,58,237,0.55)",
  pink:        "#db2777",
  pinkLight:   "#fbcfe8",
  pinkBg:      "rgba(219,39,119,0.22)",
  pinkPill:    "rgba(219,39,119,0.55)",
  indigo:      "#4f46e5",
  indigoLight: "#a5b4fc",
  indigoBg:    "rgba(79,70,229,0.22)",
  indigoPill:  "rgba(79,70,229,0.55)",
};

const CARDS = [
  {
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=900&fit=crop&q=80",
    tag: "Creators",
    tagBg: BRAND.bluePill,
    overlayTag: "Creator metrics",
    overlayTagBg: BRAND.blueBg,
    overlayTagColour: BRAND.blueLight,
    title: "Content to income.",
    desc: "Turn attention into digital products and recurring revenue.",
    metrics: [
      { label: "Followers",      target: 47800, prefix: "",   suffix: "" },
      { label: "Monthly income", target: 8400,  prefix: "$",  suffix: "" },
      { label: "Products live",  static: "4" },
      { label: "Content", pill: true, static: "Automated", pillBg: BRAND.blueBg, pillColour: BRAND.blueLight },
    ],
  },
  {
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=900&fit=crop&q=80",
    tag: "Coaches",
    tagBg: BRAND.purplePill,
    overlayTag: "Coach metrics",
    overlayTagBg: BRAND.purpleBg,
    overlayTagColour: BRAND.purpleLight,
    title: "Scale beyond 1:1.",
    desc: "Courses, funnels and automated sales that work while you coach.",
    metrics: [
      { label: "Course revenue",    target: 14200, prefix: "$", suffix: "" },
      { label: "Active students",   target: 247,   prefix: "",  suffix: "" },
      { label: "Hours freed/week",  target: 18,    prefix: "",  suffix: "h" },
      { label: "Online program", pill: true, static: "Launched", pillBg: BRAND.purpleBg, pillColour: BRAND.purpleLight },
    ],
  },
  {
    photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=900&fit=crop&q=80",
    tag: "Consultants",
    tagBg: BRAND.pinkPill,
    overlayTag: "Consultant metrics",
    overlayTagBg: BRAND.pinkBg,
    overlayTagColour: BRAND.pinkLight,
    title: "Package your expertise.",
    desc: "High-value offers that grow without more client work.",
    metrics: [
      { label: "Active offers",  static: "3" },
      { label: "Avg deal size",  target: 4500, prefix: "$",  suffix: "" },
      { label: "New revenue",    target: 9200, prefix: "+$", suffix: "" },
      { label: "Group coaching", pill: true, static: "Scheduled", pillBg: BRAND.pinkBg, pillColour: BRAND.pinkLight },
    ],
  },
  {
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=900&fit=crop&q=80",
    tag: "Founders",
    tagBg: BRAND.indigoPill,
    overlayTag: "Founder metrics",
    overlayTagBg: BRAND.indigoBg,
    overlayTagColour: BRAND.indigoLight,
    title: "Build the machine.",
    desc: "Audience-driven business powered by content, automation and AI.",
    metrics: [
      { label: "Audience size",      target: 24000, prefix: "",  suffix: "" },
      { label: "Products live",      static: "5" },
      { label: "Monthly recurring",  target: 12400, prefix: "$", suffix: "" },
      { label: "AI stack", pill: true, static: "Running", pillBg: BRAND.indigoBg, pillColour: BRAND.indigoLight },
    ],
  },
];

function Card({ card }) {
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const isOn = on || hover;

  const c0f = useCounter(isOn ? 47800 : 0, isOn && card.tag === "Creators");
  const c0i = useCounter(isOn ? 8400  : 0, isOn && card.tag === "Creators");
  const c1i = useCounter(isOn ? 14200 : 0, isOn && card.tag === "Coaches");
  const c1s = useCounter(isOn ? 247   : 0, isOn && card.tag === "Coaches");
  const c1h = useCounter(isOn ? 18    : 0, isOn && card.tag === "Coaches");
  const c2d = useCounter(isOn ? 4500  : 0, isOn && card.tag === "Consultants");
  const c2r = useCounter(isOn ? 9200  : 0, isOn && card.tag === "Consultants");
  const c3a = useCounter(isOn ? 24000 : 0, isOn && card.tag === "Founders");
  const c3m = useCounter(isOn ? 12400 : 0, isOn && card.tag === "Founders");

  const getVal = (m) => {
    if (m.static) return m.static;
    if (card.tag === "Creators") {
      if (m.label === "Followers")      return fmt(c0f);
      if (m.label === "Monthly income") return "$" + fmt(c0i);
    }
    if (card.tag === "Coaches") {
      if (m.label === "Course revenue")   return "$" + fmt(c1i);
      if (m.label === "Active students")  return fmt(c1s);
      if (m.label === "Hours freed/week") return c1h + "h";
    }
    if (card.tag === "Consultants") {
      if (m.label === "Avg deal size") return "$" + fmt(c2d);
      if (m.label === "New revenue")   return "+$" + fmt(c2r);
    }
    if (card.tag === "Founders") {
      if (m.label === "Audience size")     return fmt(c3a);
      if (m.label === "Monthly recurring") return "$" + fmt(c3m);
    }
    return m.static || "—";
  };

  return (
    <div
      onClick={() => setOn(o => !o)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", borderRadius: 14, overflow: "hidden",
        cursor: "pointer", aspectRatio: "2/3",
        transform: isOn ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      {/* Photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url('${card.photo}')`,
        backgroundSize: "cover", backgroundPosition: "center top",
        filter: "brightness(0.65)",
        transform: isOn ? "scale(1.06)" : "scale(1)",
        transition: "transform 0.5s ease",
      }} />

      {/* Gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.6) 50%,rgba(0,0,0,0.15) 100%)", zIndex: 1 }} />

      {/* Border glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 14, zIndex: 5, pointerEvents: "none",
        border: `1.5px solid ${isOn ? "rgba(255,255,255,0.45)" : "transparent"}`,
        transition: "border-color 0.35s ease",
      }} />

      {/* Tag top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "1rem", zIndex: 2 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "5px 13px", borderRadius: 20, color: "#fff",
          background: card.tagBg, display: "inline-block",
        }}>{card.tag}</span>
      </div>

      {/* Base info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.1rem", zIndex: 2,
        transform: isOn ? "translateY(-6px)" : "translateY(0)",
        opacity: isOn ? 0 : 1, pointerEvents: isOn ? "none" : "auto",
        transition: "transform 0.4s ease, opacity 0.35s ease",
      }}>
        <div style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 500, color: "#fff", marginBottom: "0.3rem", lineHeight: 1.2 }}>{card.title}</div>
        <div style={{ fontSize: "clamp(12px,1.4vw,13px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{card.desc}</div>
      </div>

      {/* Overlay metrics */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.1rem",
        opacity: isOn ? 1 : 0, transform: isOn ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <div style={{ background: "rgba(6,6,16,0.93)", border: "0.5px solid rgba(255,255,255,0.15)", borderRadius: 11, padding: "0.9rem", backdropFilter: "blur(8px)" }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: 20, display: "inline-block", marginBottom: "0.7rem",
            background: card.overlayTagBg, color: card.overlayTagColour,
          }}>{card.overlayTag}</span>
          {card.metrics.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: i < card.metrics.length - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{m.label}</span>
              {m.pill
                ? <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 20, fontWeight: 600, background: m.pillBg, color: m.pillColour }}>{getVal(m)}</span>
                : <span style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{getVal(m)}</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AudienceCards() {
  return (
    <>
      <div className="audience-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {CARDS.map((card, i) => <Card key={i} card={card} />)}
      </div>
      <style>{`
        @media (max-width: 900px) { .audience-cards-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .audience-cards-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; } }
        @media (max-width: 360px) { .audience-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

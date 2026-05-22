import { useState, useEffect, useRef } from "react";

const WORDS = ["Founder.", "Entrepreneur.", "Business Owner."];

function useCounter(target, active, duration = 1400) {
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

function AnimBar({ pct, colour, active, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay]);
  return (
    <div style={{ height: 3, background: "#ccccd8", borderRadius: 2 }}>
      <div style={{ height: 3, borderRadius: 2, background: colour, width: `${w}%`, transition: "width 1.6s ease" }} />
    </div>
  );
}

function Tag({ children, bg, colour }) {
  return (
    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: bg, color: colour, display: "inline-block" }}>
      {children}
    </span>
  );
}

function CheckRow({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#333", padding: "3px 0" }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, background: "#E1F5EE", color: "#0F6E56", fontWeight: 700 }}>✓</div>
      {children}
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div style={{ flex: 1, background: "#e8e8f2", borderRadius: 8, padding: 8, textAlign: "center" }}>
      <div style={{ fontSize: 17, fontWeight: 500, color: "#0a0a14" }}>{value}</div>
      <div style={{ fontSize: 9, color: "#333", marginTop: 2, fontFamily: "monospace", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function BarRow({ label, value, colour, pct, active, delay }) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#444", marginBottom: 4 }}>
        <span>{label}</span><span>{value}</span>
      </div>
      <AnimBar pct={pct} colour={colour} active={active} delay={delay} />
    </div>
  );
}


function CardTop({ stepLabel, stepColour, stepNum, numColour }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
      <span style={{ fontSize: 13, fontWeight: 400, color: stepColour, textDecoration: "underline", textUnderlineOffset: 3 }}>{stepLabel}</span>
      <span style={{ fontSize: 48, fontWeight: 500, opacity: 0.07, lineHeight: 1, fontFamily: "monospace", color: numColour }}>{stepNum}</span>
    </div>
  );
}

function BottomTag({ icon, children, bg, colour }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "3px 10px", borderRadius: 20, marginTop: "0.5rem", fontWeight: 500, background: bg, color: colour }}>
      {icon && <span style={{ fontSize: 12 }}>{icon}</span>}
      {children}
    </div>
  );
}

export default function ThinkBeyondContent() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  const followers = useCounter(active ? 47832 : 0, active, 1400);
  const emails    = useCounter(active ? 1284  : 0, active, 1200);
  const leads     = useCounter(active ? 847   : 0, active, 1200);
  const monthly   = useCounter(active ? 12400 : 0, active, 1600);
  const yearly    = useCounter(active ? 148800: 0, active, 1800);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setVisible(true); }, 400);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fmt = (n) => n >= 1000 ? n.toLocaleString() : n;

  return (
    <section ref={ref} style={{ padding: "clamp(2.5rem,6vw,5rem) clamp(1rem,5vw,3rem)", background: "linear-gradient(135deg, #ece8f8 0%, #e4eef8 50%, #e4f2ec 100%)" }}>

      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span className="pbm-eyebrow">The Business</span>

        <h2 style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 500, color: "#0a0a14", lineHeight: 1.2, marginBottom: "0.75rem", marginTop: "0.5rem" }}>
          Think Beyond Content.<br />
          Operate Like a{" "}
          <span className="pbm-title-grad" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease", display: "inline-block" }}>
            {WORDS[wordIdx]}
          </span>
        </h2>

        <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "#333", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Your audience already trusts you.<br />
          Here is how we turn it into an{" "}
          <strong style={{ color: "#0a0a14", fontWeight: 500 }}>info business that runs itself.</strong>
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: "1.5rem", maxWidth: 1200, margin: "0 auto 1.5rem" }}>

        {/* Card 1 — Audience */}
        <div className="biz-card" style={{ borderTop: "3px solid #6358cc" }}>
          <CardTop stepLabel="Step 1 — AUDIENCE" stepColour="#534AB7" stepNum="01" numColour="#7F77DD" />
          <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a14", marginBottom: "0.75rem" }}>You already built attention.</div>
          <div style={{ fontSize: 28, fontWeight: 500, color: "#0a0a14", marginBottom: 2, lineHeight: 1 }}>{fmt(followers)}</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: "0.75rem" }}>followers</div>
          <BarRow label="Engagement rate" value="3.8%" colour="#7F77DD" pct={58} active={active} delay={300} />
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "0.5rem" }}>
            <Tag bg="#EEEDFE" colour="#534AB7">Instagram</Tag>
            <Tag bg="#EEEDFE" colour="#534AB7">TikTok</Tag>
            <Tag bg="#EEEDFE" colour="#534AB7">YouTube</Tag>
          </div>
          <BottomTag bg="#EEEDFE" colour="#534AB7">↑ +2,341 new this month</BottomTag>
        </div>

        {/* Card 2 — Product */}
        <div className="biz-card" style={{ borderTop: "3px solid #0b8a8e" }}>
          <CardTop stepLabel="Step 2 — PRODUCT" stepColour="#0F6E56" stepNum="02" numColour="#0EA5AA" />
          <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a14", marginBottom: "0.75rem" }}>Package what you know</div>
          <div style={{ marginBottom: "0.75rem" }}>
            <CheckRow>Online course</CheckRow>
            <CheckRow>Membership community</CheckRow>
            <CheckRow>Digital downloads</CheckRow>
            <CheckRow>Templates and guides</CheckRow>
            <CheckRow>1:1 coaching program</CheckRow>
          </div>
          <BottomTag bg="#E1F5EE" colour="#0F6E56">5 products · avg. $297 per sale</BottomTag>
        </div>

        {/* Card 3 — Automation */}
        <div className="biz-card" style={{ borderTop: "3px solid #2470c4" }}>
          <CardTop stepLabel="Step 3 — AUTOMATION" stepColour="#185FA5" stepNum="03" numColour="#378ADD" />
          <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a14", marginBottom: "0.75rem" }}>Your funnel runs 24/7</div>
          <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
            <StatBox value={fmt(emails)} label="Emails sent" />
            <StatBox value={fmt(leads)} label="Leads captured" />
            <StatBox value="24" label="Active flows" />
          </div>
          <BarRow label="Conversion rate" value="3.8%" colour="#378ADD" pct={55} active={active} delay={500} />
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <Tag bg="#E6F1FB" colour="#185FA5">Email sequences</Tag>
            <Tag bg="#E6F1FB" colour="#185FA5">DM automation</Tag>
            <Tag bg="#E6F1FB" colour="#185FA5">AI funnels</Tag>
          </div>
        </div>

        {/* Card 4 — Revenue */}
        <div className="biz-card" style={{ borderTop: "3px solid #15855f" }}>
          <CardTop stepLabel="Step 4 — REVENUE" stepColour="#0F6E56" stepNum="04" numColour="#1D9E75" />
          <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a14", marginBottom: "0.75rem" }}>Income while you sleep</div>
          <div style={{ fontSize: 32, fontWeight: 500, color: "#185FA5", lineHeight: 1, marginBottom: 2 }}>${fmt(monthly)}</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: "0.5rem" }}>/month</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#0a0a14", marginBottom: 2 }}>${fmt(yearly)}</div>
          <div style={{ fontSize: 12, color: "#444", marginBottom: "0.75rem" }}>/year</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#EAF3DE", color: "#3B6D11", fontWeight: 500, marginBottom: "0.75rem" }}>↑ +124% growth</div>
          <BarRow label="Monthly target" value="87%" colour="#1D9E75" pct={87} active={active} delay={700} />
        </div>

      </div>

      {/* Connector */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", padding: "0.5rem 0" }}>
        {[
          { label: "audience", arrowColour: "#7F77DD" },
          { label: "product",  arrowColour: "#0EA5AA" },
          { label: "automation", arrowColour: "#378ADD" },
        ].map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: "#444" }}>{s.label}</span>
            <span style={{ fontSize: 13, color: s.arrowColour, fontWeight: 500 }}>→</span>
          </span>
        ))}
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1D9E75" }}>passive revenue</span>
      </div>
    </section>
  );
}

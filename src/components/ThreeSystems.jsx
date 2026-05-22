import { useState, useEffect, useRef } from "react";

const C = {
  purple: "#7F77DD", purpleLight: "#CCC8F5", purpleBg: "rgba(127,119,221,0.12)", purpleBorder: "rgba(127,119,221,0.25)",
  teal: "#0EA5AA", tealLight: "#7DE8EB", tealBg: "rgba(14,165,170,0.12)", tealBorder: "rgba(14,165,170,0.25)",
  blue: "#378ADD", blueLight: "#9DC8F0", blueBg: "rgba(55,138,221,0.12)", blueBorder: "rgba(55,138,221,0.25)",
};
const WORDS = ["Sell.", "Grow.", "Scale.", "Convert."];

function useCounter(target, active, duration = 1200) {
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
    <div style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, flex: 1 }}>
      <div style={{ height: 2, borderRadius: 2, background: colour, width: `${w}%`, transition: "width 1.6s ease" }} />
    </div>
  );
}

const dc = { background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "9px 11px" };
const dl = { fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6, fontFamily: "monospace" };
const drl = { fontSize: 12, color: "rgba(255,255,255,0.75)", flex: 1 };
const drv = { fontSize: 12, fontWeight: 500, color: "#fff" };

function DC({ label, children, style }) {
  return <div style={{ ...dc, ...style }}>{label && <div style={dl}>{label}</div>}{children}</div>;
}
function DR({ label, value, bar, pct, colour, active, delay = 0 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
      <span style={drl}>{label}</span>
      {bar && <AnimBar pct={pct} colour={colour} active={active} delay={delay} />}
      <span style={drv}>{value}</span>
    </div>
  );
}
function Pill({ children, colour, bg }) {
  return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: bg, color: colour, display: "inline-block" }}>{children}</span>;
}
function Status({ colour, children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.65)" }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: colour, flexShrink: 0 }} />{children}</div>;
}
function G2({ children }) { return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>{children}</div>; }
function G3({ children }) { return <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>{children}</div>; }
function MC({ value, label }) {
  return <div style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 8, textAlign: "center" }}><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{value}</div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 2, fontFamily: "monospace" }}>{label}</div></div>;
}

function ProductInfographic({ item, active }) {
  const monthly = useCounter(item === 2 && active ? 7500 : 0, active && item === 2);
  const aud = useCounter(item === 4 && active ? 12400 : 0, active && item === 4);
  const cvr = useCounter(item === 5 && active ? 34 : 0, active && item === 5);
  if (item === 1) return (<><DC label="Brand positioning"><DR label="Niche clarity" bar pct={88} colour={C.purple} active={active} delay={0} value="88%" /><DR label="Audience fit" bar pct={94} colour={C.teal} active={active} delay={200} value="94%" /><DR label="Message clarity" bar pct={79} colour={C.blue} active={active} delay={400} value="79%" /></DC><G2><DC label="Audience"><div style={drv}>Coaches 30–45</div></DC><DC label="Category"><div style={drv}>Info business</div></DC></G2><DC label="Brand voice"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.purpleLight} bg={C.purpleBg}>Bold</Pill><Pill colour={C.tealLight} bg={C.tealBg}>Direct</Pill><Pill colour={C.blueLight} bg={C.blueBg}>Warm</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>Expert</Pill></div></DC><Status colour={C.teal}>Positioning complete</Status></>);
  if (item === 2) return (<><DC label="Offer stack"><DR label="Entry product" value="$47 ebook" /><DR label="Core offer" value="$997 course" /><DR label="Premium tier" value="$3,500 coaching" /></DC><G2><DC label="Monthly target"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>${monthly.toLocaleString()}</div></DC><DC label="Avg order value"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>$847</div></DC></G2><DC label="Pricing model"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.purpleLight} bg={C.purpleBg}>One-time</Pill><Pill colour={C.tealLight} bg={C.tealBg}>Recurring</Pill><Pill colour={C.blueLight} bg={C.blueBg}>Upsell</Pill></div></DC><Status colour={C.teal}>Offer architecture locked</Status></>);
  if (item === 3) {
    const steps = [
      { icon: "💡", label: "Course outline", sub: "8 modules mapped", status: "Done", done: true },
      { icon: "📦", label: "Bonus stack", sub: "3 bonuses defined", status: "Done", done: true },
      { icon: "✏️", label: "Unique angle", sub: "Positioning finalised", status: "Review", done: true },
      { icon: "🔒", label: "Ready to build", sub: "Awaiting approval", status: "Pending", done: false },
    ];
    return (<>{steps.map((step, i) => (<div key={i}><div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px" }}><div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: step.done ? `${C.purple}25` : "rgba(255,255,255,0.04)", flexShrink: 0 }}>{step.icon}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500, color: step.done ? "#fff" : "rgba(255,255,255,0.4)" }}>{step.label}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{step.sub}</div></div><Pill colour={step.done ? C.purpleLight : "rgba(255,255,255,0.3)"} bg={step.done ? C.purpleBg : "rgba(255,255,255,0.05)"}>{step.status}</Pill></div>{i < steps.length - 1 && <div style={{ textAlign: "center", fontSize: 11, color: step.done ? C.purple : "rgba(255,255,255,0.2)", padding: "2px 0" }}>↓</div>}</div>))}</>);
  }
  if (item === 4) return (<><DC label="Launch plan"><DR label="Target audience" value="Defined" /><DR label="Primary channels" value="Instagram + TikTok" /><DR label="Launch window" value="21 days" /></DC><G3><MC value={aud >= 1000 ? `${(aud / 1000).toFixed(1)}k` : aud} label="Audience" /><MC value="3" label="Channels" /><MC value="12" label="Steps" /></G3><Status colour={C.teal}>Go-to-market plan ready</Status></>);
  if (item === 5) return (<><DC label="Launch assets"><DR label="Sales page" bar pct={100} colour={C.purple} active={active} delay={0} value="Done" /><DR label="Checkout flow" bar pct={100} colour={C.teal} active={active} delay={200} value="Done" /><DR label="Launch content" bar pct={75} colour={C.blue} active={active} delay={400} value="75%" /></DC><G2><DC label="Conversion est."><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{(cvr / 10).toFixed(1)}%</div></DC><DC label="Page status"><div style={{ fontSize: 14, fontWeight: 500, color: C.tealLight }}>Live</div></DC></G2><Status colour={C.teal}>Launch content in final review</Status></>);
  return null;
}

function PromotionInfographic({ item, active }) {
  const sched = useCounter(item === 2 && active ? 28 : 0, active && item === 2, 900);
  const pros = useCounter(item === 3 && active ? 240 : 0, active && item === 3);
  const conv = useCounter(item === 3 && active ? 38 : 0, active && item === 3);
  const qual = useCounter(item === 3 && active ? 14 : 0, active && item === 3);
  const rr = useCounter(item === 3 && active ? 18 : 0, active && item === 3);
  const imp = useCounter(item === 4 && active ? 48 : 0, active && item === 4);
  const flw = useCounter(item === 4 && active ? 340 : 0, active && item === 4);
  const cvr4 = useCounter(item === 4 && active ? 24 : 0, active && item === 4);
  const roas = useCounter(item === 5 && active ? 48 : 0, active && item === 5);
  const adrev = useCounter(item === 5 && active ? 5760 : 0, active && item === 5);
  if (item === 1) return (<><DC label="Content pillars"><DR label="Education" bar pct={85} colour={C.teal} active={active} delay={0} value="85%" /><DR label="Authority" bar pct={72} colour={C.purple} active={active} delay={200} value="72%" /><DR label="Conversion" bar pct={60} colour={C.blue} active={active} delay={400} value="60%" /></DC><G2><DC label="Post frequency"><div style={drv}>5x / week</div></DC><DC label="Formats"><div style={drv}>4 types</div></DC></G2><DC label="Content themes"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.tealLight} bg={C.tealBg}>Info business</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>Mindset</Pill><Pill colour={C.blueLight} bg={C.blueBg}>Strategy</Pill><Pill colour={C.tealLight} bg={C.tealBg}>Results</Pill></div></DC><Status colour={C.teal}>Content strategy approved</Status></>);
  if (item === 2) {
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const states = ["filled","filled","live","filled","filled","",""];
    return (<><DC label="Content calendar — this week"><div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, marginTop: 6 }}>{days.map((d,i) => <div key={i} style={{ aspectRatio: 1, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)" }}>{d}</div>)}{states.map((st,i) => <div key={i} style={{ aspectRatio: 1, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", background: st === "live" ? C.teal : st === "filled" ? `${C.teal}30` : "rgba(255,255,255,0.03)", color: st === "live" ? "#fff" : st === "filled" ? C.tealLight : "rgba(255,255,255,0.25)" }}>{st === "live" ? "▶" : st === "filled" ? "✓" : "·"}</div>)}</div></DC><G2><DC label="Scheduled"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{sched}</div></DC><DC label="Platforms"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>5</div></DC></G2><DC label="Platforms"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.tealLight} bg={C.tealBg}>Instagram</Pill><Pill colour={C.blueLight} bg={C.blueBg}>LinkedIn</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>TikTok</Pill><Pill colour="#F5B49A" bg="rgba(216,90,48,0.2)">Meta</Pill><Pill colour={C.tealLight} bg={C.tealBg}>YouTube</Pill></div></DC><Status colour={C.teal}>28 posts scheduled</Status></>);
  }
  if (item === 3) return (<><DC label="Outreach pipeline"><DR label="Prospects identified" value={pros} /><DR label="Conversations active" value={conv} /><DR label="Qualified leads" value={qual} /></DC><G2><DC label="Response rate"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{rr}%</div></DC><DC label="Lead quality"><div style={{ fontSize: 14, fontWeight: 500, color: C.tealLight }}>High</div></DC></G2><DC label="Outreach channels"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.tealLight} bg={C.tealBg}>Instagram DM</Pill><Pill colour={C.blueLight} bg={C.blueBg}>LinkedIn</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>Email</Pill></div></DC><Status colour={C.teal}>Outreach sequences running</Status></>);
  if (item === 4) return (<><DC label="Performance overview"><DR label="Reach growth" bar pct={78} colour={C.teal} active={active} delay={0} value="+78%" /><DR label="Engagement rate" bar pct={62} colour={C.purple} active={active} delay={200} value="4.2%" /><DR label="Click-through" bar pct={44} colour={C.blue} active={active} delay={400} value="2.8%" /></DC><G3><MC value={`${imp}k`} label="Impressions" /><MC value={flw} label="Followers" /><MC value={`${(cvr4/10).toFixed(1)}%`} label="Conv. rate" /></G3><Status colour={C.teal}>All tracking live</Status></>);
  if (item === 5) return (<><DC label="Ad performance"><DR label="ROAS" bar pct={82} colour={C.teal} active={active} delay={0} value={`${(roas/10).toFixed(1)}x`} /><DR label="CTR" bar pct={55} colour={C.purple} active={active} delay={200} value="3.4%" /><DR label="Cost per lead" bar pct={40} colour={C.blue} active={active} delay={400} value="$4.20" /></DC><G2><DC label="Ad spend"><div style={drv}>$1,200</div></DC><DC label="Revenue driven"><div style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>${adrev.toLocaleString()}</div></DC></G2><DC label="Ad platforms"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour="#F5B49A" bg="rgba(216,90,48,0.2)">Meta</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>TikTok</Pill><Pill colour={C.blueLight} bg={C.blueBg}>LinkedIn</Pill></div></DC><Status colour={C.teal}>Campaigns live and scaling</Status></>);
  return null;
}

function ProfitInfographic({ item, active }) {
  const leads = useCounter(item === 1 && active ? 47 : 0, active && item === 1);
  const emails = useCounter(item === 2 && active ? 312 : 0, active && item === 2);
  const openr = useCounter(item === 2 && active ? 38 : 0, active && item === 2);
  const nl = useCounter(item === 3 && active ? 84 : 0, active && item === 3);
  const inN = useCounter(item === 3 && active ? 47 : 0, active && item === 3);
  const sq = useCounter(item === 3 && active ? 23 : 0, active && item === 3);
  const cu = useCounter(item === 3 && active ? 18 : 0, active && item === 3);
  const pv = useCounter(item === 3 && active ? 24000 : 0, active && item === 3);
  const cr = useCounter(item === 3 && active ? 22 : 0, active && item === 3);
  const hrs = useCounter(item === 4 && active ? 18 : 0, active && item === 4);
  const tls = useCounter(item === 4 && active ? 12 : 0, active && item === 4);
  const mrr = useCounter(item === 5 && active ? 8400 : 0, active && item === 5);
  const ots = useCounter(item === 5 && active ? 3200 : 0, active && item === 5);
  const cust = useCounter(item === 5 && active ? 94 : 0, active && item === 5);
  if (item === 1) return (<><DC label="Funnel stages"><div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>{["Awareness","Interest","Purchase"].map((stage,i) => (<div key={stage} style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}><div style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 500, padding: "5px 4px", borderRadius: 5, background: i < 2 ? C.blueBg : "rgba(255,255,255,0.04)", border: `0.5px solid ${i < 2 ? C.blueBorder : "rgba(255,255,255,0.1)"}`, color: i < 2 ? C.blueLight : "rgba(255,255,255,0.35)" }}>{stage}</div>{i < 2 && <span style={{ fontSize: 11, color: C.blue, fontWeight: 500 }}>→</span>}</div>))}</div></DC><G2><DC label="Leads entering"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{leads}/day</div></DC><DC label="Conversion"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>3.2%</div></DC></G2><DC label="Funnel steps"><DR label="Opt-in page" value={<Pill colour={C.tealLight} bg={C.tealBg}>Live</Pill>} /><DR label="Lead magnet delivery" value={<Pill colour={C.tealLight} bg={C.tealBg}>Live</Pill>} /><DR label="Sales sequence" value={<Pill colour={C.blueLight} bg={C.blueBg}>Running</Pill>} /></DC><Status colour={C.teal}>Funnel live and converting</Status></>);
  if (item === 2) return (<>{[{icon:"✉️",label:"Welcome sequence",sub:"5 emails over 7 days",status:"Active",colour:C.tealLight,bg:C.tealBg},{icon:"💬",label:"DM nurture flow",sub:"Instagram auto-reply",status:"Active",colour:C.tealLight,bg:C.tealBg},{icon:"🛒",label:"Cart abandonment",sub:"3-step recovery",status:"Running",colour:C.blueLight,bg:C.blueBg}].map((n,i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px" }}><div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>{n.icon}</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{n.label}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{n.sub}</div></div><Pill colour={n.colour} bg={n.bg}>{n.status}</Pill></div>))}<G2><DC label="Emails today"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{emails}</div></DC><DC label="Open rate"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{openr}%</div></DC></G2><Status colour={C.teal}>All sequences running</Status></>);
  if (item === 3) return (<><DC label="CRM pipeline"><DR label="New leads" value={nl} /><DR label="In nurture" value={inN} /><DR label="Sales qualified" value={sq} /><DR label="Customers" value={cu} /></DC><G2><DC label="Pipeline value"><div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>${pv.toLocaleString()}</div></DC><DC label="Close rate"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{cr}%</div></DC></G2><Status colour={C.teal}>CRM synced and live</Status></>);
  if (item === 4) return (<><DC label="Automations active">{["New sale onboarding","Invoice creation","Slack notifications","Weekly reports"].map((a,i) => (<DR key={i} label={a} value={<Pill colour={C.tealLight} bg={C.tealBg}>Auto</Pill>} />))}</DC><G2><DC label="Hours saved/week"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{hrs}h</div></DC><DC label="Tools connected"><div style={{ fontSize: 15, fontWeight: 500, color: "#fff" }}>{tls}</div></DC></G2><DC label="Integrations"><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}><Pill colour={C.blueLight} bg={C.blueBg}>Zapier</Pill><Pill colour={C.tealLight} bg={C.tealBg}>Make</Pill><Pill colour={C.purpleLight} bg={C.purpleBg}>Notion</Pill><Pill colour={C.tealLight} bg={C.tealBg}>Slack</Pill></div></DC><Status colour={C.teal}>14 workflows active</Status></>);
  if (item === 5) return (<><DC label="Revenue dashboard"><DR label="Monthly recurring" bar pct={82} colour={C.teal} active={active} delay={0} value={`$${mrr.toLocaleString()}`} /><DR label="One-time sales" bar pct={65} colour={C.blue} active={active} delay={200} value={`$${ots.toLocaleString()}`} /><DR label="Growth MoM" bar pct={55} colour={C.purple} active={active} delay={400} value="+24%" /></DC><G3><MC value={`$${Math.round((mrr+ots)/1000)}k`} label="Total rev" /><MC value={cust} label="Customers" /><MC value={`$${cust > 0 ? Math.round((mrr+ots)/cust) : 0}`} label="Avg LTV" /></G3><Status colour={C.teal}>Dashboard live</Status></>);
  return null;
}

const INFOGRAPHICS = { product: ProductInfographic, promotion: PromotionInfographic, profit: ProfitInfographic };

const FEATURES = [
  { key: "product", tag: "01 — Product", tagColour: C.purpleLight, tagBg: C.purpleBg, sectionBg: "rgba(127,119,221,0.05)", sectionBorder: "rgba(127,119,221,0.2)", glassBg: "rgba(127,119,221,0.08)", glassBorder: "rgba(127,119,221,0.3)", dot: C.purple, chevron: C.purple, chevronFade: "rgba(127,119,221,0.4)", arrowFrom: C.purple, arrowTo: C.teal, panelLabel: "Product builder", title: "Strategy & Brand", description: "Turn your expertise into a product people want to buy.", items: [{ label: "Brand positioning & messaging", description: "Define your audience, your angle, and why people should choose you." }, { label: "Offer creation & pricing", description: "Shape your offer and price it so it feels clear, valuable, and easy to buy." }, { label: "Digital product development", description: "Create courses, memberships, or programs built around your knowledge." }, { label: "Go-to-market planning", description: "Map the right audience, channels, and launch steps before you go live." }, { label: "Sales page & launch assets", description: "Build the pages, checkout, and launch content needed to start selling." }] },
  { key: "promotion", tag: "02 — Promotion", tagColour: C.tealLight, tagBg: C.tealBg, sectionBg: "rgba(14,165,170,0.05)", sectionBorder: "rgba(14,165,170,0.2)", glassBg: "rgba(14,165,170,0.08)", glassBorder: "rgba(14,165,170,0.3)", dot: C.teal, chevron: C.teal, chevronFade: "rgba(14,165,170,0.4)", arrowFrom: C.teal, arrowTo: C.blue, panelLabel: "Promotion system", title: "Audience & Attention", description: "Turn attention into trust, demand, and sales.", items: [{ label: "Content strategy", description: "Create the message, themes, and ideas your audience actually cares about." }, { label: "Social media automation", description: "Plan, schedule, and automate consistent content across the right platforms." }, { label: "Outreach & lead generation", description: "Start real conversations with people who are ready for what you offer." }, { label: "Analytics & tracking", description: "See what is working, what is not, and where to improve." }, { label: "Paid advertising", description: "Use ads to reach more of the right people once your offer is ready." }] },
  { key: "profit", tag: "03 — Profit", tagColour: C.blueLight, tagBg: C.blueBg, sectionBg: "rgba(55,138,221,0.05)", sectionBorder: "rgba(55,138,221,0.2)", glassBg: "rgba(55,138,221,0.08)", glassBorder: "rgba(55,138,221,0.3)", dot: C.blue, chevron: C.blue, chevronFade: "rgba(55,138,221,0.4)", arrowFrom: null, arrowTo: null, panelLabel: "Automation stack", title: "AI & Automation", description: "Build the backend systems that sell, deliver and scale, without you in the middle of everything.", items: [{ label: "AI sales funnels", description: "Guide people from interest to purchase through an automated sales journey." }, { label: "Email & DM automation", description: "Follow up, sell, and onboard customers automatically." }, { label: "CRM & lead tracking", description: "Keep every contact, enquiry, and customer organised in one place." }, { label: "Workflow automation", description: "Connect your tools and remove repetitive manual tasks." }, { label: "Performance analytics", description: "Understand your sales, traffic, and next best growth moves clearly." }] },
];

function FeatureBlock({ feature, sectionActive }) {
  const [open, setOpen] = useState(1);
  const Inf = INFOGRAPHICS[feature.key];
  return (
    <div className="fb" style={{ background: feature.sectionBg, border: `0.5px solid ${feature.sectionBorder}`, borderRadius: 12, padding: "clamp(1rem,3vw,1.75rem)", display: "grid", gap: "clamp(1rem,2.5vw,1.5rem)" }}>
      <div>
        <span style={{ display: "inline-flex", alignItems: "center", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: feature.tagColour, background: feature.tagBg, padding: "3px 10px", borderRadius: 20, marginBottom: "0.75rem" }}>{feature.tag}</span>
        <div style={{ fontSize: "clamp(16px,2.5vw,19px)", fontWeight: 500, color: "#fff", marginBottom: "0.25rem" }}>{feature.title}</div>
        <div style={{ fontSize: "clamp(13px,1.8vw,14px)", color: "rgba(255,255,255,0.65)", marginBottom: "1rem", lineHeight: 1.6 }}>{feature.description}</div>
        {feature.items.map((item, idx) => {
          const n = idx + 1; const isOpen = open === n;
          return (<div key={n} style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}><button onClick={() => setOpen(n)} style={{ width: "100%", background: "none", border: "none", padding: "0.65rem 0", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}><span style={{ fontSize: 10, fontWeight: 500, color: feature.tagColour, minWidth: 20, fontFamily: "monospace" }}>{String(n).padStart(2, "0")}</span><span style={{ fontSize: "clamp(13px,1.8vw,14px)", fontWeight: 500, textAlign: "left", flex: 1, color: isOpen ? "#fff" : "rgba(255,255,255,0.5)", transition: "color 0.2s" }}>{item.label}</span><span style={{ fontSize: 11, color: isOpen ? feature.chevron : feature.chevronFade, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>⌄</span></button><div style={{ overflow: "hidden", maxHeight: isOpen ? 70 : 0, opacity: isOpen ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.25s ease" }}><p style={{ fontSize: "clamp(12px,1.6vw,13px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, paddingBottom: "0.65rem", paddingLeft: 28 }}>{item.description}</p></div></div>);
        })}
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }} />
      </div>
      <div style={{ background: feature.glassBg, border: `0.5px solid ${feature.glassBorder}`, borderRadius: 12, padding: "clamp(0.85rem,2vw,1.1rem)", display: "flex", flexDirection: "column", gap: 9, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", alignSelf: "start" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace" }}>{feature.panelLabel}</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: feature.dot, display: "block" }} />
        </div>
        <Inf item={open} active={sectionActive} />
      </div>
    </div>
  );
}

function Connector({ from, to }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "0.5rem 0", padding: "0 0.5rem" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: from, flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${from},${to})` }} />
      <div style={{ fontSize: 14, color: to, padding: "0 2px" }}>→</div>
      <div style={{ flex: 1, height: 1, background: to }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: to, flexShrink: 0 }} />
    </div>
  );
}

export default function ThreeSystems() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => { setVisible(false); setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setVisible(true); }, 400); }, 2500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="framework" style={{ background: "#0a0a0f", padding: "clamp(2rem,6vw,5rem) clamp(1rem,5vw,3rem)" }}>
      <style>{`
        .fb { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .fb { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .fb { padding: 1rem !important; } }
      `}</style>
      <div style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)", maxWidth: 680, margin: "0 auto clamp(2rem,5vw,3.5rem)" }}>
        <span className="pbm-eyebrow">The Model</span>
        <h2 style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          Three Systems. One Info Business.<br />
          <span style={{ display: "inline-block" }}>Built to{" "}
            <span style={{ background: "linear-gradient(90deg,#5B8DEF,#9B6FD4,#E05C97)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: visible ? 1 : 0, transition: "opacity 0.4s ease", display: "inline-block" }}>{WORDS[wordIdx]}</span>
          </span>
        </h2>
        <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
          You have the audience. You have the knowledge.<br />Here is the system that turns both into income.
        </p>
      </div>
      {FEATURES.map((f) => (
        <div key={f.key} style={{ marginBottom: f.arrowFrom ? 0 : 0 }}>
          <FeatureBlock feature={f} sectionActive={active} />
          {f.arrowFrom && <Connector from={f.arrowFrom} to={f.arrowTo} />}
        </div>
      ))}
    </section>
  );
}

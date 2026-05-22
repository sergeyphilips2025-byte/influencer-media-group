import { useState, useEffect, useRef } from 'react'
import './App.css'
import ThreeSystems from './components/ThreeSystems'
import ThinkBeyondContent from './components/ThinkBeyondContent'
import AudienceCards from './components/AudienceCards'
import CommunityCircle from './components/CommunityCircle'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── DATA ─────────────────────────────────────────────────────────────────────


const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop`

const NICHES = [
  { name: 'Business Coaching',     photo: PX(5934185)  },
  { name: 'Fitness & Health',      photo: PX(8692291)  },
  { name: 'Personal Finance',      photo: PX(4968545)  },
  { name: 'Life Coaching',         photo: PX(3958426)  },
  { name: 'AI & Tech',             photo: PX(3861969)  },
  { name: 'Wellness',              photo: PX(6958258)  },
  { name: 'Music',                 photo: PX(8044226)  },
  { name: 'Fashion',               photo: PX(1536619)  },
  { name: 'Food & Nutrition',      photo: PX(7890204)  },
  { name: 'Real Estate',           photo: PX(7578906)  },
  { name: 'Mindset',               photo: PX(4498216)  },
  { name: 'Marketing',             photo: PX(6772076)  },
  { name: 'Photography',           photo: PX(1983037)  },
  { name: 'Travel',                photo: PX(1268869)  },
  { name: 'Relationship Coaching', photo: PX(7741572)  },
  { name: 'Sports',                photo: PX(863988)   },
  { name: 'Online Education',      photo: PX(8055832)  },
  { name: 'Spirituality',          photo: PX(7596959)  },
  { name: 'E-Commerce',            photo: PX(6207729)  },
  { name: 'Copywriting',           photo: PX(3059745)  },
]


const TESTIMONIALS = [
  { name: 'Sarah M.', handle: '@sarahcoaches', text: 'The AI Profit Sprint completely transformed my business. I went from $3K/month to $28K in 90 days. The funnel they built converts better than anything I\'ve ever tried.', seed: 'sarah123' },
  { name: 'Marcus D.', handle: '@marcusfit', text: 'IMG built my entire digital product suite in 2 weeks. My courses now sell while I sleep. Best investment I\'ve made in my creator career.', seed: 'marcus456' },
  { name: 'Priya K.', handle: '@priyaconsults', text: 'The AI DM automation they set up handles 80% of my lead generation. I spend my time delivering results, not chasing clients.', seed: 'priya789' },
  { name: 'Jordan T.', handle: '@jordantv', text: 'From 50K followers doing brand deals to $50K/month in direct revenue. This team knows exactly how to unlock the value in your audience.', seed: 'jordan321' },
  { name: 'Alex R.', handle: '@alexgrowth', text: 'They created my entire course suite and automated the marketing. 340% ROI in the first quarter. I only wish I had found them sooner.', seed: 'alex654' },
  { name: 'Tanya L.', handle: '@tanyalive', text: 'In 6 months IMG helped me build a $200K/year knowledge business from scratch. The systems they put in place run almost entirely on autopilot.', seed: 'tanya987' },
  { name: 'Chris B.', handle: '@chrisbceo', text: 'The funnel they built converts at 8.4%. I genuinely can not believe I waited this long to invest in proper infrastructure for my brand.', seed: 'chris111' },
  { name: 'Luna V.', handle: '@lunavibe', text: 'My audience was there. IMG showed me exactly how to monetize it. $0 to $15K the very first month. The AI automations are insane.', seed: 'luna222' },
]

const FAQS = [
  {
    q: 'What exactly is an info business?',
    a: "A business built on your knowledge and audience. Courses, memberships, templates, communities. Sold through automated systems that don't need you to show up every time.",
  },
  {
    q: 'What is the AI Profit Sprint?',
    a: 'Our 90-day flagship programme. Product, funnel, automation built from scratch. Done with you, not just for you.',
  },
  {
    q: "Sprint vs Immersion — what's the difference?",
    a: 'Sprint is remote, 90 days, with full support. Immersion is in-person. Same outcome, different speed and format.',
  },
  {
    q: 'Who is this for?',
    a: "Creators, coaches, consultants and brand owners who have an audience or expertise and want scalable income. You don't need a huge following. You need the right system.",
  },
  {
    q: 'How fast will I see results?',
    a: 'Most clients see first revenue within 30 days. Full automated results in the 60-90 day window.',
  },
  {
    q: 'Do you take a cut of my revenue?',
    a: 'No. You keep 100% of everything. We charge a programme fee.',
  },
  {
    q: 'What if I have a small following?',
    a: "We've built profitable info businesses from 2,000 engaged followers. Engagement beats follower count every time.",
  },
]


// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function useCountUp(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf, t0
    const tick = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function IMGLogo({ height = 44 }) {
  // Gradient: blue → purple → red  (matches the uploaded logo)
  return (
    <svg
      viewBox="-40 0 410 300"
      height={height}
      width={height * (410 / 300)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Influencer Media Group"
      overflow="visible"
    >
      <defs>
        <linearGradient id="imgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#3b82f6" />
          <stop offset="48%"  stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>

      {/* Gradient circle border */}
      <circle cx="165" cy="142" r="128" stroke="url(#imgG)" strokeWidth="7" />

      {/* "Influencer" — gradient fill, bold */}
      <text
        x="165" y="168"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="72"
        fontWeight="900"
        fill="url(#imgG)"
        letterSpacing="-2"
      >
        Influencer
      </text>

      {/* "MEDIA GROUP" — purple, spaced */}
      <text
        x="165" y="202"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="21"
        fontWeight="600"
        letterSpacing="5"
        fill="url(#imgG)"
      >
        MEDIA GROUP
      </text>
    </svg>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Influencer Media Group home">
          <IMGLogo height={44} />
        </a>

        <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#program" onClick={() => setMenuOpen(false)}>AI Profit Sprint</a>
          <a href="#results" onClick={() => setMenuOpen(false)}>Results</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </div>

        <div className="nav-cta">
          <a href="#apply" className="btn-primary">Build with Us →</a>
        </div>

        <button
          className={`hamburger${menuOpen ? ' hamburger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

const FLOATING_CARDS = [
  {
    src: '/images/influencer1.png',
    width: 200, height: 255,
    cls: 'fcard fcard--1',
    result: { label: 'Monthly Revenue', amount: '$12,400', sub: '@sarah_coach', color: '#34d399' },
  },
  {
    src: '/images/influencer2.png',
    width: 175, height: 225,
    cls: 'fcard fcard--2',
    result: { label: 'New Subscriber', amount: '+$297/mo', sub: '@marcusfit', color: '#34d399' },
  },
  {
    src: '/images/influencer3.png',
    width: 200, height: 255,
    cls: 'fcard fcard--3',
    result: { label: '1:1 Call Booked', amount: '$2,500', sub: '@priya_consult', color: '#a855f7' },
  },
  {
    src: '/images/influencer4.png',
    width: 175, height: 225,
    cls: 'fcard fcard--4',
    result: { label: 'Course Launched', amount: '$5,800', sub: '@emilycreates', color: '#db2777' },
  },
]

const TICKER_ITEMS =
  'REVENUE ACCELERATION · AI AGENCY · ' +
  'DIGITAL PRODUCTS · AI AUTOMATION · INFO BUSINESS · ' +
  'AUDIENCE MONETISATION · AI PROFIT SPRINT · 24/7 · ' +
  'INFLUENCER GROWTH · AI AGENTS · '

function Hero() {
  const sectionRef = useRef(null)
  const badgeRef   = useRef(null)
  const titleRef   = useRef(null)
  const subRef     = useRef(null)
  const btnsRef    = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animations ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(badgeRef.current,  { y: 24, opacity: 0, duration: 0.7 }, 0.15)
        .from(titleRef.current.children, { y: 64, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.35)
        .from(subRef.current,   { y: 24, opacity: 0, duration: 0.7 }, 0.85)
        .from(btnsRef.current,  { y: 20, opacity: 0, duration: 0.6 }, 1.05)
        .from(cardsRef.current.children, { scale: 0.88, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.5)

      // ── ScrollTrigger: parallax on glows as user scrolls out of hero ──
      gsap.to('.hero-glow', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // ── ScrollTrigger: floating cards drift upward slightly on scroll ──
      gsap.to(cardsRef.current.children, {
        y: -60,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // ── ScrollTrigger: hero center content fades out as section exits ──
      gsap.to('.hero-center', {
        y: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={sectionRef}>
      {/* background glow */}
      <div className="hero-glow hero-glow--l" aria-hidden="true" />
      <div className="hero-glow hero-glow--r" aria-hidden="true" />

      {/* floating creator cards */}
      <div ref={cardsRef} style={{ display: 'contents' }}>
        {FLOATING_CARDS.map((card, i) => (
          <div key={i} className={card.cls} aria-hidden="true">
            <img src={card.src} alt="" width={card.width} height={card.height} className="fcard-img" />
            <div className="fresult">
              <div className="fresult-label">{card.result.label}</div>
              <div className="fresult-amount" style={{ color: card.result.color }}>
                {card.result.amount}
              </div>
              <div className="fresult-sub">
                <span className="fresult-dot" style={{ background: card.result.color }} />
                {card.result.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* center content */}
      <div className="hero-center">
        <div className="hero-badge" ref={badgeRef}>
          AI Marketing Agency &amp; Consulting
        </div>

        <h1 className="hero-title" ref={titleRef}>
          <span className="ht-white">We Build</span>
          <span className="ht-row">
            <span className="ht-grad">AI-Powered</span>
          </span>
          <span className="ht-white">Info Businesses</span>
          <span className="ht-white">That Sell.</span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          <span className="hero-sub-pain">Creators burn out. Coaches cap out. Consultants trade time for money.</span>
          <span className="hero-sub-promise">There is a smarter model. We build it with you.</span>
        </p>

        <div className="hero-btns" ref={btnsRef}>
          <a href="#apply" className="hero-btn-primary">
            <span className="hbtn-line1">Build with Us →</span>
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>

      {/* bottom ticker */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="ticker-inner">
          {[TICKER_ITEMS, TICKER_ITEMS, TICKER_ITEMS, TICKER_ITEMS].map((t, i) => (
            <span key={i} className="ticker-text">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FOR WHO ──────────────────────────────────────────────────────────────────


const FW_WORDS = ['Creators', 'Coaches', 'Consultants', 'Founders']

function ForWho() {
  const ref = useRef(null)
  const v = useInView(ref)
  const [wordIdx, setWordIdx] = useState(0)
  const [animClass, setAnimClass] = useState('fw-word--in')

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('fw-word--out')
      setTimeout(() => {
        setWordIdx(i => (i + 1) % FW_WORDS.length)
        setAnimClass('fw-word--in')
      }, 320)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="forwho sec-light" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">The Fit</span>
          <h2 className="pbm-title">
            For{' '}
            <span className={`fw-word pbm-title-grad ${animClass}`}>
              {FW_WORDS[wordIdx]}
            </span>
            <br />building info businesses.
          </h2>
          <p className="pbm-sub">
            Turn your audience, expertise, or personal brand into scalable digital products, automated systems, and recurring revenue.
          </p>
        </div>
        <AudienceCards />
      </div>
    </section>
  )
}


// ─── STATS ────────────────────────────────────────────────────────────────────

// ─── MARQUEE ──────────────────────────────────────────────────────────────────

function NicheCard({ n }) {
  return (
    <div className="niche-card">
      <img
        className="niche-card__photo"
        src={n.photo}
        alt={n.name}
        loading="lazy"
        decoding="async"
      />
      <span className="niche-card__name">{n.name}</span>
    </div>
  )
}

function Marquee() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const row1 = NICHES.slice(0, 10)
  const row2 = NICHES.slice(10)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 44, opacity: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
      gsap.from('.marquee-wrap', {
        y: 36, opacity: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="marquee-section" ref={sectionRef}>
      <div className="pbm-header marquee-header" ref={headerRef}>
        <span className="pbm-eyebrow">The Niche</span>
        <h2 className="pbm-title">
          One <span className="pbm-title-grad">Growth System.</span>
        </h2>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-row marquee-fwd">
          {[...row1, ...row1].map((n, i) => <NicheCard key={i} n={n} />)}
        </div>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-row marquee-rev">
          {[...row2, ...row2].map((n, i) => <NicheCard key={i} n={n} />)}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────


// ─── THE OPPORTUNITY ──────────────────────────────────────────────────────────

const SHIFT_STATS = [
  { value: '$26 Trillion', label: 'Projected digital product market by 2034', ref: 1 },
  { value: '$840 Billion', label: 'Online education alone by 2030',            ref: 2 },
  { value: '90% of consumers', label: 'will pay for digital content that solves a problem', ref: 3, bold: true },
]

function Opportunity() {
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="opportunity" ref={ref}>

      <div className="opp-glow" aria-hidden="true" />

      <div className="wrap">

        <div className={`opp-header${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">The Shift</span>
          <h2 className="opp-title">
            The Biggest Wealth Transfer<br />
            <span className="gtext">Is Happening Now.</span>
          </h2>
          <p className="opp-copy">
            Most creators and coaches are still renting their income from platforms.
            The ones building info businesses are buying it outright.
          </p>
        </div>

        <div className={`shift-stats${v ? ' in' : ''}`}>
          {SHIFT_STATS.map((s, i) => (
            <div key={i} className="shift-stat" style={{ transitionDelay: `${120 + i * 110}ms` }}>
              <span className={`shift-stat-value${s.bold ? ' gtext' : ''}`}>{s.value}</span>
              <span className="shift-stat-sep"> — </span>
              <span className="shift-stat-label">{s.label}</span>
              <sup className="shift-stat-ref">{s.ref}</sup>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}


// ─── AI PROFIT SPRINT ─────────────────────────────────────────────────────────

const BA_ROWS = [
  { before: 'Trading hours for income',   after: 'Products selling while you sleep' },
  { before: 'Starting from $0 every month', after: 'Recurring, compounding revenue' },
  { before: 'Relying on the algorithm',   after: 'Owning your audience and funnel' },
  { before: 'Burning out on content',     after: 'One content system, automated' },
  { before: 'Chasing the next client',    after: 'A pipeline that fills itself' },
]

function Sprint() {
  const ref = useRef(null)
  const v = useInView(ref)

  return (
    <section className="sprint sec-light" id="program" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">The Program</span>
          <h2 className="pbm-title">
            The Secret:<br />
            <span className="pbm-title-grad">AI Profit Sprint.</span>
          </h2>
          <p className="pbm-sub">
            A step-by-step program designed to help creators, coaches and consultants build
            scalable info businesses. We take your expertise and audience and do the work.
            Product, funnel, AI automation and ongoing strategy. From scratch.
            Done with you every step of the way.
          </p>
        </div>

        <div className="sprint-body">

          {/* ── Left: Mock dashboard UI ── */}
          <div className="sprint-ui">
            <div className="sui-stack">

              {/* Pill — top right */}
              <div className="sui-pill">
                <span className="sui-pill-dots"><i/><i/></span>
                🤖 AI Running
              </div>

              {/* Card 1 — AI Content Engine, behind */}
              <div className="sui-card sui-card--1">
                <div className="sui-card-label">
                  <span className="sui-dot sui-dot--blue" />AI Content Engine
                </div>
                <div className="sui-tags">
                  <span className="sui-tag sui-tag--blue">Posts Scheduled</span>
                  <span className="sui-tag sui-tag--pink">Auto DMs</span>
                </div>
              </div>

              {/* Card 2 — Revenue Dashboard */}
              <div className="sui-card sui-card--2">
                <div className="sui-card-label">
                  <span className="sui-dot sui-dot--red" />Revenue Dashboard
                </div>
                <div className="sui-big-number">$8,420</div>
              </div>

              {/* Card 3 — Digital Product Sales, front */}
              <div className="sui-card sui-card--3">
                <div className="sui-card-label">
                  <span className="sui-dot sui-dot--purple" />Digital Product Sales
                </div>
                <div className="sui-big-number">247</div>
                <div className="sui-card-sub">Units sold · Running 24/7 automatically</div>
                <div className="sui-bar">
                  <div className="sui-bar-fill" style={{ width: '76%' }} />
                </div>
                <div className="sui-card-sub">76% of monthly goal reached</div>
              </div>

            </div>
          </div>

          {/* ── Right: Before / After infographic ── */}
          <div className={`sprint-ba${v ? ' in' : ''}`}>
            <div className="sprint-ba-head">
              <span className="sprint-ba-col-label sprint-ba-col-before">Before</span>
              <span className="sprint-ba-col-label sprint-ba-col-after">After</span>
            </div>
            {BA_ROWS.map((row, i) => (
              <div key={i} className="sprint-ba-row" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="sprint-ba-before">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sprint-ba-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  {row.before}
                </div>
                <div className="sprint-ba-arrow" aria-hidden="true">→</div>
                <div className="sprint-ba-after">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sprint-ba-check"><polyline points="20 6 9 17 4 12"/></svg>
                  {row.after}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── CALCULATOR ───────────────────────────────────────────────────────────────

function Calculator() {
  const ref = useRef(null)
  const v = useInView(ref)
  const [fans, setFans] = useState(5000)
  const [price, setPrice] = useState(47)

  const monthly = Math.round(fans * 0.01 * price)
  const yearly = monthly * 12
  const fmt = n => '$' + n.toLocaleString('en-US')

  return (
    <section className="calc-section sec-light" id="calculator" ref={ref}>
      <div className="wrap">
        <div className="calc-grid">
          <div className={`calc-left${v ? ' in' : ''}`}>
            <span className="pbm-eyebrow">The Numbers</span>
            <h2 className="pbm-title">See Your<br />Earning Potential</h2>
            <p className="pbm-sub">This is what your audience is worth as <strong>digital products</strong> — not brand deals or 1:1 calls. Enter your numbers and see what a product-first business could generate.</p>

            <p className="calc-why-label">Why an Info Business Wins</p>
            <div className="dp-benefits-list">
              {[
                { label: 'Total control', text: 'You own it. You set the price. You keep 70-90% of revenue.' },
                { label: 'Predictability', text: "Recurring income that doesn't vanish when a brand moves on." },
                { label: 'Scalability', text: 'No cap. Sell 10 or 500 units. Same effort.' },
                { label: '24/7', text: "Your info business sells while you sleep. Client work doesn't." },
              ].map((b, i) => (
                <div key={i} className="dp-benefit-row">
                  <span className="dp-benefit-label">{b.label}</span>
                  <span className="dp-benefit-text">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`calc-right${v ? ' in' : ''}`} style={{ transitionDelay: '140ms' }}>
            <div className="calc-card">
              <label className="clabel">
                Audience Size <span className="cval">{fans.toLocaleString()}</span>
              </label>
              <input type="range" min="100" max="500000" step="100" value={fans}
                onChange={e => setFans(+e.target.value)} className="cslider" aria-label="Audience size" />
              <div className="crange"><span>100</span><span>500K</span></div>

              <label className="clabel" style={{ marginTop: '1.5rem' }}>
                Avg Product Price <span className="cval">${price}</span>
              </label>
              <input type="range" min="10" max="2000" step="5" value={price}
                onChange={e => setPrice(+e.target.value)} className="cslider" aria-label="Average price" />
              <div className="crange"><span>$10</span><span>$2,000</span></div>

              <div className="cresult">
                <div className="cresult-item">
                  <div className="crlabel">Monthly Revenue</div>
                  <div className="crval">{fmt(monthly)}</div>
                </div>
                <div className="cr-div" />
                <div className="cresult-item">
                  <div className="crlabel">Yearly Potential</div>
                  <div className="crval crval--big gtext">{fmt(yearly)}</div>
                </div>
              </div>

              <a href="#apply" className="btn-primary btn-block">Start Monetizing Today →</a>
              <p className="calc-disclaimer">⚠️ Figures are projected estimates based on a 1% conversion rate applied to your audience size. They are not based on IMG client results and do not constitute a promise, guarantee, or representation of expected income. Actual results vary based on niche, offer quality, marketing, and audience engagement.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function TCard({ t }) {
  return (
    <div className="tcard">
      <div className="tcard-top">
        <img
          src={`https://api.dicebear.com/7.x/personas/svg?seed=${t.seed}&backgroundColor=1a1a2e,2d1b69`}
          alt={t.name}
          className="tcard-av"
          width="44" height="44"
          loading="lazy"
        />
        <div className="tcard-meta">
          <div className="tcard-name">{t.name}</div>
          <div className="tcard-handle">{t.handle}</div>
        </div>
        <div className="tcard-stars" aria-label="5 stars">★★★★★</div>
      </div>
      <p className="tcard-txt">"{t.text}"</p>
    </div>
  )
}

function Testimonials() {
  const ref = useRef(null)
  const v = useInView(ref)
  const half = Math.ceil(TESTIMONIALS.length / 2)
  const r1 = TESTIMONIALS.slice(0, half)
  const r2 = TESTIMONIALS.slice(half)

  return (
    <section className="testimonials sec-light" id="results" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">Success Stories</span>
          <h2 className="pbm-title">Creators Are<br /><span className="pbm-title-grad">Crushing It</span></h2>
          <p className="pbm-sub">Join hundreds of creators, coaches, and consultants building real businesses with AI-powered monetization.</p>
        </div>
      </div>
      <div className="tmarquee">
        <div className="trow tfwd">
          {[...r1, ...r1].map((t, i) => <TCard key={i} t={t} />)}
        </div>
        <div className="trow trev">
          {[...r2, ...r2].map((t, i) => <TCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}


// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="faq sec-light" id="faq" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">The FAQs</span>
          <h2 className="pbm-title">Good Questions.<br /><span className="pbm-title-grad">Straight Answers.</span></h2>
        </div>
        <div className={`faq-list${v ? ' in' : ''}`} style={{ transitionDelay: '120ms' }}>
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg className="faq-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-a" aria-hidden={open !== i}>
                <div className="faq-a-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="final-cta" id="apply" ref={ref}>
      <div className="final-glow" aria-hidden="true" />
      <div className="wrap">
        <div className={`final-inner${v ? ' in' : ''}`}>
          <span className="pbm-eyebrow">Join IMG Today</span>
          <h2 className="pbm-title final-title">
            Ready to Get Rewarded<br />
            <span className="pbm-title-grad">For What You Know?</span>
          </h2>
          <p className="pbm-sub">Whether you're just starting or an established creator ready to scale — we're ready to turn your audience into sustainable, automated income.</p>
          <div className="final-includes">
            {['Built-in AI marketing & automation', 'Done-for-you digital product setup', 'Dedicated growth strategist', 'Keep 100% of your revenue'].map((item, i) => (
              <div key={i} className="fi-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </div>
            ))}
          </div>
          <div className="final-btns">
            <a href="mailto:apply@influencermediagroup.com" className="btn-primary btn-lg">Apply Now →</a>
            <a href="#services" className="btn-ghost btn-lg">Learn More</a>
          </div>
          <p className="final-fine">Limited spots available. Apply to see if you qualify.</p>
        </div>
      </div>
    </section>
  )
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <div className="newsletter">
      <div className="wrap">
        <div className="nl-inner">
          <div className="nl-text">
            <strong>Stay in the Loop</strong>
            <span> — Join 10,000+ creators getting exclusive AI monetization strategies.</span>
          </div>
          {sent
            ? <div className="nl-success">You're in! Check your inbox.</div>
            : (
              <form className="nl-form" onSubmit={e => { e.preventDefault(); if (email) setSent(true) }}>
                <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required className="nl-input" aria-label="Email address" />
                <button type="submit" className="btn-primary">Subscribe</button>
              </form>
            )
          }
        </div>
      </div>
    </div>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <IMGLogo height={52} />
            <p className="footer-blurb">The all-in-one AI marketing platform for creator monetization, audience growth &amp; business automation.</p>
          </div>
          <div className="footer-cols">
            <div className="fcol">
              <div className="fcol-title">Services</div>
              <a href="#services">AI Profit Sprint</a>
              <a href="#services">Digital Products</a>
              <a href="#services">Funnels & Automation</a>
              <a href="#services">DM Automation</a>
              <a href="#services">Coaching Programs</a>
            </div>
            <div className="fcol">
              <div className="fcol-title">Resources</div>
              <a href="#faq">FAQ</a>
              <a href="#">Blog</a>
              <a href="#">Case Studies</a>
              <a href="#">Free AI Audit</a>
            </div>
            <div className="fcol">
              <div className="fcol-title">Company</div>
              <a href="#">About IMG</a>
              <a href="#">Careers</a>
              <a href="mailto:press@influencermediagroup.com">Press</a>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-refs">
          <sup>1</sup> Statista, 2023 &nbsp;·&nbsp;
          <sup>2</sup> Facts &amp; Factors, 2024 &nbsp;·&nbsp;
          <sup>3</sup> McKinsey &amp; Company, 2025
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Influencer Media Group™. All Rights Reserved.</span>
          <span className="footer-right">Your Audience. Your Business. Your Rules.</span>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ThinkBeyondContent />
        <ThreeSystems />
        <Marquee />
        <ForWho />
        <Opportunity />
        <Sprint />
        <Calculator />
        <Testimonials />
        <CommunityCircle />
        <FAQ />
        <FinalCTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

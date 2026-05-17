import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    tag: 'PRODUCT',
    title: 'Turn Your Expertise\nInto Digital Products',
    copy: [
      'Your knowledge shouldn’t stop at 1:1 calls or brand deals.',
      'We help you package what you know into scalable offers people can buy anytime.',
    ],
    includes: ['Online courses', 'Memberships', 'Paid communities', 'Templates & digital downloads', 'Coaching programs', 'Offer positioning & pricing'],
    color: '#3b82f6',
  },
  {
    tag: 'PROMOTION',
    title: 'Build Systems That\nGrow & Convert',
    copy: [
      'Attention alone doesn’t generate revenue.',
      'We create AI-powered growth systems that turn followers, viewers, and traffic into qualified leads and paying customers.',
    ],
    includes: ['AI sales funnels', 'Lead magnets', 'Email sequences', 'Content systems', 'AI DM automation', 'Audience growth systems'],
    color: '#7c3aed',
  },
  {
    tag: 'PROFIT',
    title: 'Scale Revenue\nWith AI Automation',
    copy: [
      'We automate the backend of your business so leads, sales, onboarding, and follow-ups happen automatically — helping you grow faster without burning out.',
    ],
    includes: ['CRM systems', 'Workflow automations', 'Sales pipelines', 'Client onboarding', 'Lead qualification', 'Analytics & optimisation'],
    color: '#db2777',
  },
]

const NICHES = [
  'Business Coaching', 'Fitness & Health', 'Personal Finance',
  'Life Coaching', 'AI & Tech', 'Wellness', 'Music', 'Fashion',
  'Food & Nutrition', 'Real Estate', 'Mindset', 'Marketing',
  'Photography', 'Travel', 'Relationship Coaching', 'Sports',
  'Online Education', 'Spirituality', 'E-Commerce', 'Copywriting',
]

const SERVICES = [
  {
    tag: 'Signature Program',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    title: 'AI Profit Sprint',
    desc: 'Our signature 90-day intensive. Go from audience to $10K–$50K/month with a fully automated AI monetization system.',
    featured: true,
  },
  {
    tag: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    title: 'AI DM Automation',
    desc: 'Turn every comment, follow, and story reply into a sales conversation — automatically, 24/7.',
    featured: false,
  },
  {
    tag: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
    ),
    title: 'Digital Products',
    desc: 'Courses, templates, memberships, eBooks — we build, price, and launch your complete digital product suite.',
    featured: false,
  },
  {
    tag: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 1.16h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>
    ),
    title: '1:1 & Group Coaching',
    desc: 'High-ticket coaching programs structured to command premium rates and deliver transformational results.',
    featured: false,
  },
  {
    tag: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    title: 'Audience Building Funnels',
    desc: 'AI-powered content strategies and lead magnets that compound your audience growth month over month.',
    featured: false,
  },
  {
    tag: '',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
    ),
    title: 'Full AI Automation Stack',
    desc: 'Email sequences, lead scoring, CRM, and analytics — the complete back-end of a 7-figure knowledge business.',
    featured: false,
  },
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
    q: 'What is the AI Profit Sprint?',
    a: 'The AI Profit Sprint is our signature 90-day intensive program where we build your complete AI-powered monetization system — from digital products to automated funnels to DM sequences that sell. You bring the audience; we build the engine.',
  },
  {
    q: 'Who is this for?',
    a: 'Creators, coaches, and consultants with an existing audience — social following, email list, or community — who are ready to stop trading time for money and build scalable, recurring income from their knowledge.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Most clients close their first digital product sales within 30 days. Full funnel automation typically goes live in weeks 4–6. By day 90 you\'ll have a fully operational AI-powered business running 24/7.',
  },
  {
    q: 'What AI tools do you use?',
    a: 'We deploy a custom stack based on your specific needs — including ManyChat for DM automation, ConvertKit or Beehiiv for email, Kajabi or Whop for products, and proprietary AI agents for content strategy and lead generation.',
  },
  {
    q: 'Do you take a percentage of my revenue?',
    a: 'Never. You keep 100% of what you earn. We work on a program fee model. Your success drives our reputation — so we are completely aligned with making you as much money as possible.',
  },
  {
    q: "What if I don't have a big following?",
    a: "Audience size matters less than audience quality. We've helped consultants with 2,000 email subscribers build $100K+ businesses. Our audience-building funnels also compound your growth while the monetization system runs.",
  },
]

const COMPARISON = [
  { feature: 'AI-Powered Funnels' },
  { feature: 'Done-For-You Setup' },
  { feature: 'Digital Product Creation' },
  { feature: 'DM Automation' },
  { feature: 'Dedicated Strategist' },
  { feature: 'Keep 100% of Revenue' },
  { feature: 'Audience Building System' },
  { feature: 'Ongoing Optimization' },
]

// ─── HOOK ─────────────────────────────────────────────────────────────────────

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
  return (
    <section className="hero" id="top">
      {/* background glow */}
      <div className="hero-glow hero-glow--l" aria-hidden="true" />
      <div className="hero-glow hero-glow--r" aria-hidden="true" />

      {/* floating creator cards */}
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

      {/* center content */}
      <div className="hero-center">
        <div className="hero-badge">
          AI Marketing Agency &amp; Consulting
        </div>

        <h1 className="hero-title">
          <span className="ht-white">We Build</span>
          <span className="ht-row">
            <span className="ht-blue">AI</span>
            <span className="ht-grad">Systems</span>
          </span>
          <span className="ht-white">That Sell.</span>
        </h1>

        <p className="hero-sub">
          Influencer Media Group helps creators, coaches and consultants turn
          their audience and expertise into AI-powered businesses that
          generate revenue, scale faster, and operate 24/7.
        </p>

        <div className="hero-btns">
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

// ─── PILLARS ──────────────────────────────────────────────────────────────────

function Pillars() {
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="pillars pillars-dark" ref={ref}>
      <div className="wrap">
        <div className={`pillars-hd${v ? ' in' : ''}`}>
          <div className="framework-label">
            <span className="framework-label-line" aria-hidden="true" />
            <span className="framework-label-text">The Framework</span>
          </div>
          <h2 className="pillars-title">
            <span className="pillars-title-white">Build An AI-Powered</span>
            <br />
            <span className="pillars-title-grad">Info Business.</span>
          </h2>
          <p className="pillars-sub">
            Most creators, coaches &amp; consultants already have an audience or expertise —
            what&apos;s missing is the infrastructure that turns attention into scalable revenue.
            We build the products, funnels, automations, and AI systems behind modern Info Businesses.
          </p>
        </div>

        <div className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div
                key={i}
                className={`pcard${v ? ' in' : ''}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <div className="pcard-header">
                  <span className="pcard-tag" style={{ color: p.color, borderColor: `${p.color}55`, background: `${p.color}12` }}>{p.tag}</span>
                </div>

                <div className="pcard-line" style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />

                <h3 className="pcard-title">{p.title}</h3>

                <div className="pcard-copy">
                  {p.copy.map((para, j) => <p key={j}>{para}</p>)}
                </div>

                <div className="pcard-includes">
                  <div className="pcard-inc-label">Includes</div>
                  <ul className="pcard-list">
                    {p.includes.map((item, j) => (
                      <li key={j} className="pcard-item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" style={{ flexShrink: 0 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const ref = useRef(null)
  const v = useInView(ref)
  const items = [
    { value: '500+', label: 'Creators Helped' },
    { value: '$10M+', label: 'Revenue Generated' },
    { value: '3×', label: 'Average 90-Day ROI' },
    { value: '9 Figures', label: 'Total Creator Earnings' },
  ]
  return (
    <div className="stats-bar" ref={ref}>
      {items.map((s, i) => (
        <div key={i} className={`stat${v ? ' stat--in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
          <div className="stat-val">{s.value}</div>
          <div className="stat-lbl">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────

function Marquee() {
  return (
    <section className="marquee-section">
      <p className="marquee-label">Every niche. One growth system.</p>
      <div className="marquee-wrap">
        <div className="marquee-row marquee-fwd" aria-hidden="true">
          {[...NICHES, ...NICHES].map((n, i) => (
            <span key={i} className="mchip">{n}</span>
          ))}
        </div>
      </div>
      <div className="marquee-wrap">
        <div className="marquee-row marquee-rev" aria-hidden="true">
          {[...NICHES, ...NICHES].reverse().map((n, i) => (
            <span key={i} className="mchip">{n}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="services sec-light" id="services" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <div className="sec-tag">What We Do</div>
          <h2 className="sec-title">Our Full<br />Service Suite</h2>
          <p className="sec-sub">Every tool, system, and strategy you need — built and run for you, so you can focus on what you do best.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`scard${s.featured ? ' scard--feat' : ''}${v ? ' in' : ''}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {s.tag && <div className="scard-tag">{s.tag}</div>}
              <div className="scard-icon">{s.icon}</div>
              <h3 className="scard-title">{s.title}</h3>
              <p className="scard-desc">{s.desc}</p>
              <div className="scard-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI PROFIT SPRINT ─────────────────────────────────────────────────────────

function Sprint() {
  const ref = useRef(null)
  const v = useInView(ref)
  const steps = [
    { n: '01', title: 'Strategy Call', desc: 'We map your audience, niche, and fastest path to $10K+/month.' },
    { n: '02', title: 'Build Your System', desc: 'Digital products, funnels, and AI automations — built in weeks, not months.' },
    { n: '03', title: 'Launch & Scale', desc: 'Go live with a complete monetization stack. Optimize with data weekly.' },
    { n: '04', title: 'Profit on Autopilot', desc: 'Your AI-powered business earns 24/7 while you focus on creating.' },
  ]
  const includes = [
    'Done-for-you funnel setup',
    'Digital product creation',
    'AI DM automation',
    'Email sequence build-out',
    'Weekly strategy calls',
    'Dedicated growth strategist',
  ]
  return (
    <section className="sprint" id="program" ref={ref}>
      <div className="sprint-glow" aria-hidden="true" />
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <div className="sec-tag">The Secret</div>
          <h2 className="sec-title gtext">The AI Profit Sprint</h2>
          <p className="sec-sub">Our signature 90-day intensive that transforms your audience into a predictable, AI-powered revenue machine.</p>
        </div>

        <div className={`sprint-steps${v ? ' in' : ''}`}>
          {steps.map((s, i) => (
            <div key={i} className="step" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="step-n">{s.n}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`sprint-box${v ? ' in' : ''}`} style={{ transitionDelay: '380ms' }}>
          <div className="sprint-box-inner">
            <div className="sprint-inc">
              {includes.map((item, i) => (
                <div key={i} className="inc-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </div>
              ))}
            </div>
            <div className="sprint-apply">
              <div className="sprint-apply-label">Ready to Sprint?</div>
              <p className="sprint-apply-note">Limited spots each cohort.</p>
              <a href="#apply" className="btn-primary btn-lg">Apply for AI Profit Sprint →</a>
              <p className="sprint-fine">No contracts. Keep 100% of your revenue.</p>
            </div>
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

  const monthly = Math.round(fans * 0.02 * price)
  const yearly = monthly * 12
  const fmt = n => n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `$${n}`

  return (
    <section className="calc-section sec-light" id="calculator" ref={ref}>
      <div className="wrap">
        <div className="calc-grid">
          <div className={`calc-left${v ? ' in' : ''}`}>
            <div className="sec-tag">Revenue Calculator</div>
            <h2 className="sec-title">See Your<br />Earning Potential</h2>
            <p className="sec-sub">Calculate what an AI-powered monetization system could generate from your existing audience.</p>
            <div className="calc-pills">
              {['Keep 100%', 'AI Runs 24/7', 'Up in Weeks'].map((h, i) => (
                <div key={i} className="cpill"><span className="cpill-dot" />{h}</div>
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

              <p className="cnote">Based on 2% conversion — typical for AI-optimized funnels. Many IMG clients achieve 4–8%.</p>
              <a href="#apply" className="btn-primary btn-block">Start Monetizing Today →</a>
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
    <section className="testimonials" id="results" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <div className="sec-tag">Success Stories</div>
          <h2 className="sec-title">Creators Are<br /><span className="gtext">Crushing It</span></h2>
          <p className="sec-sub">Join hundreds of creators, coaches, and consultants building real businesses with AI-powered monetization.</p>
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

// ─── COMPARISON ───────────────────────────────────────────────────────────────

function Comparison() {
  const ref = useRef(null)
  const v = useInView(ref)
  return (
    <section className="comparison sec-light" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <div className="sec-tag">See How We Compare</div>
          <h2 className="sec-title">Why Top Creators<br />Choose IMG</h2>
        </div>
        <div className={`ctable${v ? ' in' : ''}`} style={{ transitionDelay: '120ms' }}>
          <div className="cthead">
            <div className="ctfeat">Feature</div>
            <div className="ctus">Influencer Media Group</div>
            <div className="ctthem">Others</div>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={i} className="ctrow">
              <div className="ctfeat">{row.feature}</div>
              <div className="ctcell ctcell--yes">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="ctcell ctcell--no">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
            </div>
          ))}
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
    <section className="faq" id="faq" ref={ref}>
      <div className="wrap">
        <div className={`sec-hd${v ? ' in' : ''}`}>
          <div className="sec-tag">Got Questions?</div>
          <h2 className="sec-title">Frequently Asked<br />Questions</h2>
          <p className="sec-sub">Everything you need to know about working with Influencer Media Group.</p>
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
    <section className="final-cta sec-light" id="apply" ref={ref}>
      <div className="final-glow" aria-hidden="true" />
      <div className="wrap">
        <div className={`final-inner${v ? ' in' : ''}`}>
          <div className="sec-tag">Join IMG Today</div>
          <h2 className="sec-title final-title">
            Ready to Get Rewarded<br />
            <span className="gtext">For What You Know?</span>
          </h2>
          <p className="sec-sub">Whether you're just starting or an established creator ready to scale — we're ready to turn your audience into sustainable, automated income.</p>
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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Stats />
        <Marquee />
        <Services />
        <Sprint />
        <Calculator />
        <Testimonials />
        <Comparison />
        <FAQ />
        <FinalCTA />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

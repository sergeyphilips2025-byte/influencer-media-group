'use client'

// In Next.js: replace with `import Image from 'next/image'`

// ─── types ────────────────────────────────────────────────────────────────────

interface CreatorCard {
  src: string
  width: number
  height: number
  top: string
  left?: string
  right?: string
  rotate: string
  keyframe: string
  delay: string
  dotColor: string
  pill: string
  cardClass: string
}

// ─── data ─────────────────────────────────────────────────────────────────────

const TICKER_TEXT =
  'REVENUE ACCELERATION · AI AGENCY · SYDNEY AU · ' +
  'DIGITAL PRODUCTS · AI AUTOMATION · ' +
  'AUDIENCE MONETISATION · AI SPRINT PROFIT PROGRAM · ' +
  'INFLUENCER GROWTH · '

const CARDS: CreatorCard[] = [
  {
    src: '/images/influencer1.png',
    width: 165,
    height: 210,
    top: '15%',
    left: '4%',
    rotate: '-4deg',
    keyframe: 'card1In',
    delay: '0.2s',
    dotColor: '#34d399',
    pill: '@sarah_coach · +$12,400/mo',
    cardClass: 'hero-card-1',
  },
  {
    src: '/images/influencer2.png',
    width: 145,
    height: 185,
    top: '52%',
    left: '12%',
    rotate: '-2deg',
    keyframe: 'card2In',
    delay: '0.4s',
    dotColor: '#34d399',
    pill: '@marcusfit · +$8,200/mo',
    cardClass: 'hero-card-2',
  },
  {
    src: '/images/influencer3.png',
    width: 165,
    height: 210,
    top: '22%',
    right: '5%',
    rotate: '4deg',
    keyframe: 'card3In',
    delay: '0.3s',
    dotColor: '#a855f7',
    pill: '@priyaconsults · +$2,500 booking',
    cardClass: 'hero-card-3',
  },
]

// ─── component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <>
      {/* ── Keyframe animations & custom CSS ─────────────────────────── */}
      <style>{`
        /* entrance animations */
        @keyframes heroBadgeFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroHeadlineUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSubUp {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroButtonsUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* card entrance */
        @keyframes card1In {
          from { opacity: 0; transform: translateX(-60px) rotate(-4deg); }
          to   { opacity: 1; transform: translateX(0)    rotate(-4deg); }
        }
        @keyframes card2In {
          from { opacity: 0; transform: translateX(-40px) rotate(-2deg); }
          to   { opacity: 1; transform: translateX(0)    rotate(-2deg); }
        }
        @keyframes card3In {
          from { opacity: 0; transform: translateX(60px) rotate(4deg); }
          to   { opacity: 1; transform: translateX(0)   rotate(4deg); }
        }

        /* ticker */
        @keyframes heroTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* badge decorative lines */
        .hero-badge-line::before,
        .hero-badge-line::after {
          content: '';
          display: inline-block;
          width: 40px;
          height: 1px;
          background: #222222;
          vertical-align: middle;
          margin: 0 12px;
        }

        /* card: shared transition + hover */
        .hero-creator-card {
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease;
        }
        .hero-creator-card:hover {
          transform: translateY(-10px) rotate(0deg) scale(1.04) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8) !important;
        }

        /* button hover */
        .hero-btn-primary {
          transition: filter 0.2s ease, transform 0.2s ease;
        }
        .hero-btn-primary:hover {
          filter: brightness(1.15);
          transform: scale(1.03);
        }
        .hero-btn-secondary {
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .hero-btn-secondary:hover {
          background-color: #1f2937 !important;
          transform: scale(1.03);
        }

        /* Tablet (768px – 1023px): scale cards down ~20% */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-card-1 {
            width: 132px !important;
            height: 168px !important;
            left: 2% !important;
          }
          .hero-card-2 {
            width: 116px !important;
            height: 148px !important;
            left: 6% !important;
          }
          .hero-card-3 {
            width: 132px !important;
            height: 168px !important;
            right: 2% !important;
          }
        }

        /* Mobile (<768px): hide cards, full-width buttons */
        @media (max-width: 767px) {
          .hero-creator-card {
            display: none !important;
          }
        }
      `}</style>

      <section
        className="relative min-h-screen flex flex-col items-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #0f0a1a 0%, #080a0f 70%)',
        }}
      >
        {/* ── Creator photo cards (left + right) ────────────────────── */}
        {CARDS.map((card) => (
          <div
            key={card.cardClass}
            className={`hero-creator-card absolute ${card.cardClass}`}
            style={{
              top: card.top,
              ...(card.left  ? { left:  card.left  } : {}),
              ...(card.right ? { right: card.right } : {}),
              width:        card.width,
              height:       card.height,
              borderRadius: 18,
              overflow:     'hidden',
              boxShadow:    '0 8px 40px rgba(0, 0, 0, 0.6)',
              border:       '0.5px solid rgba(255, 255, 255, 0.08)',
              /* resting transform (overridden on hover by CSS) */
              transform:        `rotate(${card.rotate})`,
              animation:        `${card.keyframe} 0.7s ease-out ${card.delay} both`,
            }}
          >
            {/* In Next.js swap for: <Image src={card.src} alt={card.pill} width={card.width} height={card.height} priority /> */}
            <img
              src={card.src}
              alt={card.pill}
              width={card.width}
              height={card.height}
              style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }}
            />

            {/* Result pill */}
            <div
              style={{
                position:          'absolute',
                bottom:             12,
                left:               12,
                right:              12,
                background:         'rgba(0, 0, 0, 0.75)',
                backdropFilter:     'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius:       20,
                padding:            '6px 12px',
                display:            'flex',
                alignItems:         'center',
                gap:                6,
                fontSize:           12,
                color:              'white',
              }}
            >
              <span
                style={{
                  width:        7,
                  height:       7,
                  borderRadius: '50%',
                  background:   card.dotColor,
                  flexShrink:   0,
                }}
              />
              {card.pill}
            </div>
          </div>
        ))}

        {/* ── Center content ─────────────────────────────────────────── */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{
            maxWidth:     620,
            paddingTop:   120,
            paddingLeft:  24,
            paddingRight: 24,
            paddingBottom: 108, /* clear the ticker + scroll indicator */
          }}
        >
          {/* 1. Badge */}
          <div
            className="hero-badge-line"
            style={{
              fontSize:      11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         '#555555',
              marginBottom:  40,
              animation:     'heroBadgeFade 0.5s ease-out 0s both',
            }}
          >
            AI MARKETING AGENCY &amp; CONSULTING
          </div>

          {/* 2. Headline */}
          <h1
            style={{
              fontWeight:   900,
              lineHeight:   1.1,
              fontSize:     'clamp(52px, 7vw, 88px)',
              marginBottom: 28,
              animation:    'heroHeadlineUp 0.6s ease-out 0.15s both',
            }}
          >
            {/* Line 1 */}
            <span style={{ display: 'block', color: '#ffffff' }}>We Build</span>

            {/* Line 2 */}
            <span style={{ display: 'block', color: '#3b82f6' }}>AI</span>

            {/* Line 3 — gradient text */}
            <span
              style={{
                display:                  'block',
                background:               'linear-gradient(to right, #a855f7, #f43f5e)',
                WebkitBackgroundClip:     'text',
                WebkitTextFillColor:      'transparent',
                backgroundClip:           'text',
              }}
            >
              Systems
            </span>

            {/* Line 4 */}
            <span style={{ display: 'block', color: '#ffffff' }}>That Sell.</span>
          </h1>

          {/* 3. Subheadline */}
          <p
            style={{
              fontSize:     16,
              color:        '#9ca3af',
              lineHeight:   1.7,
              maxWidth:     520,
              marginBottom: 36,
              animation:    'heroSubUp 0.6s ease-out 0.3s both',
            }}
          >
            Influencer Media Group helps creators, coaches and consultants turn
            their audience and expertise into AI-powered businesses that generate
            revenue, scale faster, and operate 24/7.
          </p>

          {/* 4. CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row w-full sm:w-auto sm:justify-center"
            style={{
              gap:       12,
              animation: 'heroButtonsUp 0.6s ease-out 0.45s both',
            }}
          >
            {/* Primary */}
            <button
              className="hero-btn-primary sm:w-auto w-full"
              style={{
                background:   'linear-gradient(135deg, #7c3aed, #db2777)',
                color:        'white',
                border:       'none',
                borderRadius: 12,
                padding:      '14px 28px',
                cursor:       'pointer',
                textAlign:    'left',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600 }}>Build It With Us</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>1:1 consulting + implementation</div>
            </button>

            {/* Secondary */}
            <button
              className="hero-btn-secondary sm:w-auto w-full"
              style={{
                backgroundColor: '#111827',
                color:           'white',
                border:          '0.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius:    12,
                padding:         '14px 28px',
                cursor:          'pointer',
                textAlign:       'left',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600 }}>Build It Yourself</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>Join the online AI Profit Sprint</div>
            </button>
          </div>
        </div>

        {/* ── Scroll indicator ──────────────────────────────────────── */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            bottom:    68, /* 36px ticker + 32px gap */
            left:      '50%',
            transform: 'translateX(-50%)',
            gap:       8,
          }}
        >
          <span
            style={{
              fontSize:      10,
              letterSpacing: '0.2em',
              color:         '#333333',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div style={{ width: 1, height: 48, background: '#222222' }} />
        </div>

        {/* ── Bottom marquee ticker ────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
          style={{
            background:  '#0d0d0d',
            borderTop:   '1px solid #1a1a1a',
            height:       36,
          }}
        >
          {/* Duplicate the string so the seamless loop works:
              inner div = 2× natural width → translate -50% = one full cycle */}
          <div
            style={{
              display:    'flex',
              whiteSpace: 'nowrap',
              animation:  'heroTicker 30s linear infinite',
            }}
          >
            {[TICKER_TEXT, TICKER_TEXT].map((text, i) => (
              <span
                key={i}
                style={{
                  fontSize:      11,
                  letterSpacing: '0.15em',
                  color:         '#444444',
                  textTransform: 'uppercase',
                  paddingRight:  '2rem',
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

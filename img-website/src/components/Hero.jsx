import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const BADGES = [
  { text: '$847K in 90 days',   delay: 0.8  },
  { text: 'AI Systems Live 24/7', delay: 1.0 },
  { text: '3× Revenue Growth',  delay: 1.2  },
  { text: '90-Day Sprint',       delay: 1.4  },
];

const H1_LINES = ['We Build', 'AI Systems', 'That Sell.'];

const sentence = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const line = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const yBg      = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={containerRef} id="hero">

      {/* Ambient background */}
      <motion.div className="hero__bg" style={{ y: yBg }}>
        <div className="hero__bg-orb hero__bg-orb--gold"   />
        <div className="hero__bg-orb hero__bg-orb--blue"   />
        <div className="hero__bg-orb hero__bg-orb--purple" />
        <div className="hero__grid" aria-hidden="true" />
      </motion.div>

      {/* Content */}
      <motion.div className="hero__content" style={{ y: yContent, opacity }}>

        {/* Eyebrow */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="hero__badge-dot" />
          AI Marketing Agency & Consulting
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="hero__headline"
          variants={sentence}
          initial="hidden"
          animate="visible"
          aria-label="We Build AI Systems That Sell."
        >
          {H1_LINES.map((text, i) => (
            <motion.span key={i} className="hero__headline-line" variants={line}>
              {i === 1
                ? <span className="text-gold animate-shimmer">{text}</span>
                : text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Floating badges */}
        <motion.div
          className="hero__badges-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {BADGES.map(({ text, delay }) => (
            <motion.span
              key={text}
              className="hero__floating-badge"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* Body */}
        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Influencer Media Group helps creators, coaches and consultants turn their
          audience and expertise into scalable AI-powered businesses — with automated
          funnels, sales systems, and digital products that work 24/7.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            className="hero__cta-primary"
            onClick={() => document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="hero__cta-label">Build It With Us →</span>
            <span className="hero__cta-sub">1:1 consulting + implementation</span>
          </button>
          <button
            className="hero__cta-secondary"
            onClick={() => document.querySelector('#program')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="hero__cta-label">Build It Yourself →</span>
            <span className="hero__cta-sub">Join the online AI business program</span>
          </button>
        </motion.div>

      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="hero__scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </motion.div>

    </section>
  );
}

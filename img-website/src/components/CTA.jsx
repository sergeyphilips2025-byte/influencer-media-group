import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './CTA.css';

export default function CTA() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section className="cta-section" id="cta" ref={sectionRef}>

      <div className="cta-section__bg" aria-hidden="true">
        <div className="cta-section__bg-orb cta-section__bg-orb--main"  />
        <div className="cta-section__bg-orb cta-section__bg-orb--left"  />
        <div className="cta-section__bg-orb cta-section__bg-orb--right" />
        <div className="cta-section__grid" />
        <div className="cta-section__vignette" />
      </div>

      <div className="container">
        <div className="cta-section__inner">

          <motion.span
            className="cta-section__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="cta-section__eyebrow-dot" />
            Get Started
          </motion.span>

          <motion.h2
            className="cta-section__headline"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Ready to Build<br />
            <span className="text-gold animate-shimmer">Your AI Business?</span>
          </motion.h2>

          <motion.p
            className="cta-section__body"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Book a free strategy call and discover how to turn your audience,
            expertise, or content into scalable automated revenue systems.
          </motion.p>

          <motion.div
            className="cta-section__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <button className="cta-section__btn-primary">
              <span className="cta-section__btn-label">Build It With Us →</span>
              <span className="cta-section__btn-sub">1:1 consulting + implementation</span>
            </button>
            <button className="cta-section__btn-secondary">
              <span className="cta-section__btn-label">Build It Yourself →</span>
              <span className="cta-section__btn-sub">Join the online AI business program</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

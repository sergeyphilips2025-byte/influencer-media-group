import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Program.css';

const STEPS = [
  {
    number:  '01',
    title:   'Build Your Offer',
    body:    'Define your niche, position your offer, and create a business model designed to generate consistent revenue.',
    icon:    <OfferIcon />,
  },
  {
    number:  '02',
    title:   'Create Your Growth System',
    body:    'Build the funnels, content systems, and marketing engine that attract leads and turn attention into sales.',
    icon:    <SystemIcon />,
  },
  {
    number:  '03',
    title:   'Launch & Monetise',
    body:    'Launch your offer with automated sales systems designed to convert your audience into paying clients.',
    icon:    <LaunchIcon />,
  },
  {
    number:  '04',
    title:   'Scale & Automate',
    body:    'Automate the backend of your business so leads, sales, onboarding and follow-ups happen around the clock.',
    icon:    <AutomateIcon />,
  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const stepVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Program() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="program section" id="program" ref={sectionRef}>
      <div className="container">

        <motion.div
          className="program__header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="program__eyebrow">The Secret:</span>
          <h2 className="program__title">
            <span className="text-gold">AI Profit Sprint</span>
          </h2>
          <p className="program__desc">
            A step-by-step program designed to help creators, coaches and consultants
            build scalable AI-powered businesses with the right strategy, systems,
            and automation.
          </p>
        </motion.div>

        <motion.div
          className="program__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function StepCard({ step }) {
  const { number, title, body, icon } = step;

  return (
    <motion.div
      className="program-step"
      variants={stepVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="program-step__top">
        <div className="program-step__icon" aria-hidden="true">{icon}</div>
        <span className="program-step__number" aria-hidden="true">{number}</span>
      </div>
      <h3 className="program-step__title">{title}</h3>
      <p className="program-step__body">{body}</p>
      <div className="program-step__glow" aria-hidden="true" />
    </motion.div>
  );
}

/* ── Icons ── */

function OfferIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3 6.3L22 9.3l-5 4.9 1.2 6.8L12 18l-6.2 3 1.2-6.8L2 9.3l7-.9L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8h4M7 11h6M13 8h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C12 2 7 6 7 13l2.5 2.5L12 17l2.5-1.5L17 13C17 6 12 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 15.5L7 22l5-3 5 3-2.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function AutomateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 11V9a4 4 0 014-4h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 22l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

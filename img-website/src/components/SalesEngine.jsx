import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SalesEngine.css';

const STAGES = [
  {
    number:    '01',
    title:     'Awareness',
    platforms: 'LinkedIn · Instagram · TikTok · Email',
    systems:   ['Content distribution', 'Outreach systems', 'Lead magnets', 'Paid traffic'],
    icon:      <BroadcastIcon />,
    core:      false,
  },
  {
    number:    '02',
    title:     'Engagement',
    platforms: 'Auto-replies · Follow-ups · Lead nurturing',
    systems:   ['AI-powered DMs', 'Follow-up automations', 'Audience segmentation', 'Behaviour tracking'],
    icon:      <ChatIcon />,
    core:      false,
  },
  {
    number:    '03',
    title:     'Qualification',
    platforms: 'Discovery forms · AI chatbots · Call booking',
    systems:   ['Lead scoring', 'Qualification systems', 'CRM enrichment', 'Sales tracking'],
    icon:      <FilterIcon />,
    core:      true,
  },
  {
    number:    '04',
    title:     'Conversion',
    platforms: 'Sales calls · Payment links · Offer delivery',
    systems:   ['Sales automation', 'Proposal generation', 'Checkout systems', 'Client onboarding'],
    icon:      <ZapIcon />,
    core:      false,
  },
  {
    number:    '05',
    title:     'Retention',
    platforms: 'Referrals · Upsells · Renewals',
    systems:   ['Referral systems', 'Retention campaigns', 'Upsell automations', 'Ongoing client nurture'],
    icon:      <LoopIcon />,
    core:      false,
  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stepVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function SalesEngine() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="sales-engine section" id="sales-engine" ref={sectionRef}>
      <div className="container">

        <motion.div
          className="sales-engine__header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="sales-engine__eyebrow">The Sales Engine</span>
          <h2 className="sales-engine__title">
            Your Funnel<br />
            <span className="text-gold">Never Sleeps</span>
          </h2>
        </motion.div>

        <div className="sales-engine__track">
          <div
            className={`sales-engine__connector${inView ? ' is-visible' : ''}`}
            aria-hidden="true"
          />

          <motion.div
            className="sales-engine__steps"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {STAGES.map((stage) => (
              <StageCard key={stage.number} stage={stage} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function StageCard({ stage }) {
  const { number, title, platforms, systems, icon, core } = stage;

  return (
    <motion.div
      className={`se-step${core ? ' se-step--core' : ''}`}
      variants={stepVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="se-step__top">
        <div className="se-step__icon" aria-hidden="true">{icon}</div>
        <span className="se-step__number" aria-hidden="true">{number}</span>
      </div>

      <h3 className="se-step__title">{title}</h3>

      <p className="se-step__platforms">{platforms}</p>

      <ul className="se-step__systems">
        {systems.map((s) => (
          <li key={s} className="se-step__system">
            <DotIcon />
            {s}
          </li>
        ))}
      </ul>

      {core && <div className="se-step__glow" aria-hidden="true" />}
    </motion.div>
  );
}

/* ── Icons ── */

function BroadcastIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.3 6.3a8 8 0 000 11.4M17.7 6.3a8 8 0 010 11.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3.5 3.5a14 14 0 000 17M20.5 3.5a14 14 0 010 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 11V9a4 4 0 014-4h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 22l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DotIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor" aria-hidden="true">
      <circle cx="3" cy="3" r="3"/>
    </svg>
  );
}

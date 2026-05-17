import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

const SERVICES = [
  {
    number:  '01',
    title:   'Strategy & GTM Funnels',
    body:    'Proven go-to-market playbooks and automated sales funnels that turn attention into paying clients — 24 hours a day, 7 days a week.',
    items:   ['Offer design & positioning', 'Go-to-market roadmap', 'Email & DM automations', 'Revenue forecasting & KPIs', 'Brand positioning'],
    icon:    <FunnelIcon />,
  },
  {
    number:  '02',
    title:   'Digital Marketing',
    body:    'Multi-platform content systems that turn your expertise into inbound lead machines across LinkedIn, Instagram and TikTok — powered by AI.',
    items:   ['AI-assisted content creation', 'Content planning & strategy', 'Outreach systems', 'High-converting funnel builds', 'Analytics & optimisation'],
    icon:    <MegaphoneIcon />,
  },
  {
    number:  '03',
    title:   'AI Stack & Automation',
    body:    'End-to-end AI infrastructure that automates your client journey — from lead capture to onboarding and follow-up.',
    items:   ['AI agents & chatbots', 'CRM automation', 'Lead qualification systems', 'Workflow automations', 'Connected systems & automations'],
    icon:    <BotIcon />,
  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="services section" id="services" ref={sectionRef}>
      <div className="container">

        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="services__title">
            Three Pillars.<br />
            <span className="text-gold">One Growth System.</span>
          </h2>
          <p className="services__subtitle">
            Everything we build is designed to help you grow faster, sell more,
            and scale without burning out.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const { number, title, body, items, icon } = service;

  return (
    <motion.div
      className="service-card"
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="service-card__top">
        <span className="service-card__number">{number}</span>
        <div className="service-card__icon" aria-hidden="true">{icon}</div>
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{body}</p>
      </div>

      <ul className="service-card__features">
        {items.map((item) => (
          <li key={item} className="service-card__feature">
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <div className="service-card__glow" aria-hidden="true" />
    </motion.div>
  );
}

/* ── Icons ── */

function FunnelIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16l-6 7v7l-4-2V11L4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 5.5C19 5.5 17 7 12 7H7a3 3 0 000 6h.5l1.5 5h2l-.5-5H12c5 0 7 1.5 7 1.5V5.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12h.01M15 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8V4M9 4h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

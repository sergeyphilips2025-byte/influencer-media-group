import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Metrics.css';

const METRICS = [
  { value: '$10K',   unit: 'Weekend Target'    },
  { value: '48H',    unit: 'Launch Time'        },
  { value: '24/7',   unit: 'Funnel Activity'    },
  { value: '3×',     unit: 'Revenue Growth'     },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Metrics() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="metrics section" id="metrics" ref={sectionRef}>

      <div className="metrics__bg" aria-hidden="true">
        <div className="metrics__bg-glow" />
      </div>

      <div className="container">
        <motion.div
          className="metrics__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {METRICS.map(({ value, unit }) => (
            <motion.div
              key={unit}
              className="metric-card"
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              <span className="metric-card__value">{value}</span>
              <span className="metric-card__unit">{unit}</span>
              <div className="metric-card__bar" aria-hidden="true">
                <div className="metric-card__bar-fill" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

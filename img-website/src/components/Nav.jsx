import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Nav.css';

const NAV_LINKS = [
  { label: 'Services',    href: '#services'     },
  { label: 'How It Works', href: '#sales-engine' },
  { label: 'Results',     href: '#metrics'      },
  { label: 'Program',     href: '#program'      },
];

export default function Nav() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner">

          {/* Logo */}
          <a className="nav__logo" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="nav__logo-img">IMG</span>
            <span className="nav__logo-divider" />
            <span className="nav__logo-sub">Influencer Media Group</span>
          </a>

          {/* Desktop links */}
          <nav className="nav__links" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                className={`nav__link${activeSection === href.slice(1) ? ' nav__link--active' : ''}`}
                onClick={() => handleNavClick(href)}
              >
                {label}
                <span className="nav__link-dot" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="nav__actions">
            <button className="nav__cta" onClick={() => handleNavClick('#cta')}>
              Book a Call
            </button>

            {/* Hamburger */}
            <button
              className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="nav__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="nav__drawer-links" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    className={`nav__drawer-link${activeSection === href.slice(1) ? ' nav__drawer-link--active' : ''}`}
                    onClick={() => handleNavClick(href)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="nav__drawer-index">0{i + 1}</span>
                    {label}
                  </motion.button>
                ))}
              </nav>

              <motion.button
                className="nav__drawer-cta"
                onClick={() => handleNavClick('#cta')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Book a Call
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

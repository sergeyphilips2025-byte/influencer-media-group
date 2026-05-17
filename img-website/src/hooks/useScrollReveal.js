import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to elements matching `selector` inside the ref'd container
 * when they enter the viewport. Pairs with the `.reveal*` classes in animations.css.
 *
 * @param {object} options
 * @param {string}  options.selector   - CSS selector for reveal targets (default: '.reveal, .reveal-left, .reveal-right, .reveal-scale')
 * @param {number}  options.threshold  - Intersection ratio to trigger (default: 0.15)
 * @param {string}  options.rootMargin - IntersectionObserver rootMargin (default: '0px 0px -60px 0px')
 * @param {boolean} options.once       - Unobserve after first reveal (default: true)
 * @returns {{ ref: React.RefObject }} — attach `ref` to the section/container element
 */
export function useScrollReveal({
  selector   = '.reveal, .reveal-left, .reveal-right, .reveal-scale',
  threshold  = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once       = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = Array.from(container.querySelectorAll(selector));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          if (once) observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin, once]);

  return { ref };
}

/**
 * Observe a single element ref directly (useful for one-off elements).
 *
 * @param {object} options — same as useScrollReveal
 * @returns {{ ref: React.RefObject }}
 */
export function useRevealElement({
  threshold  = 0.2,
  rootMargin = '0px 0px -40px 0px',
  once       = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-visible');
        if (once) observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref };
}

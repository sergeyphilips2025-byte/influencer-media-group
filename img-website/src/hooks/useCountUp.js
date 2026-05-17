import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Animates a number from `start` to `end` when the element enters the viewport.
 * Designed for the Metrics section stat counters.
 *
 * @param {object} options
 * @param {number}   options.end        - Target number
 * @param {number}   options.start      - Starting number (default: 0)
 * @param {number}   options.duration   - Animation duration in ms (default: 2000)
 * @param {number}   options.decimals   - Decimal places to display (default: 0)
 * @param {string}   options.prefix     - Prepend string, e.g. '$' (default: '')
 * @param {string}   options.suffix     - Append string, e.g. '%', 'M+' (default: '')
 * @param {number}   options.threshold  - Intersection threshold to start (default: 0.4)
 * @param {Function} options.easing     - Easing function t => value (default: easeOutExpo)
 * @returns {{ ref: React.RefObject, value: string, hasStarted: boolean }}
 */
export function useCountUp({
  end,
  start     = 0,
  duration  = 2000,
  decimals  = 0,
  prefix    = '',
  suffix    = '',
  threshold = 0.4,
  easing    = easeOutExpo,
} = {}) {
  const ref        = useRef(null);
  const rafRef     = useRef(null);
  const startTime  = useRef(null);

  const [displayValue, setDisplayValue] = useState(format(start, decimals, prefix, suffix));
  const [hasStarted, setHasStarted]     = useState(false);

  const animate = useCallback((timestamp) => {
    if (!startTime.current) startTime.current = timestamp;

    const elapsed  = timestamp - startTime.current;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easing(progress);
    const current  = start + (end - start) * eased;

    setDisplayValue(format(current, decimals, prefix, suffix));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(format(end, decimals, prefix, suffix));
    }
  }, [end, start, duration, decimals, prefix, suffix, easing]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted) return;
        setHasStarted(true);
        rafRef.current = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, threshold, hasStarted]);

  return { ref, value: displayValue, hasStarted };
}

/* ── Helpers ── */

function format(value, decimals, prefix, suffix) {
  const fixed = Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${fixed}${suffix}`;
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function linear(t) {
  return t;
}

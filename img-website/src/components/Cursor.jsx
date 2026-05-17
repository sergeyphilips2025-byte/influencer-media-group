import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx         = -100;
    let my         = -100;
    let isHovering = false;
    let isPressed  = false;

    function moveDot(x, y) {
      const s = isPressed ? (8 / 12) : isHovering ? (20 / 12) : 1;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
    }

    function moveRing(x, y) {
      const s = isHovering ? (52 / 36) : 1;
      ring.style.transform   = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${s})`;
      ring.style.borderColor = isHovering ? 'rgba(200,34,106,0.8)' : 'rgba(200,34,106,0.5)';
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;

      moveDot(mx, my);

      /* Capture coords for the closure before the 80ms delay */
      const cx = mx;
      const cy = my;
      setTimeout(() => moveRing(cx, cy), 80);

      /* Hover detection via event delegation */
      const hovering = !!e.target.closest('button, a, [data-cursor]');
      if (hovering !== isHovering) {
        isHovering = hovering;
        moveDot(mx, my);
      }
    }

    function onDown() {
      isPressed = true;
      moveDot(mx, my);
    }

    function onUp() {
      isPressed = false;
      moveDot(mx, my);
    }

    function onLeave() {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    }

    function onEnter() {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    }

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

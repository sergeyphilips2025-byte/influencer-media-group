import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './MagneticCursor.css'

// Elements that trigger the magnetic snap + element nudge
const MAGNETIC_SELECTOR = 'a, button, [data-magnetic]'

// How strongly the cursor pulls toward the element center (0–1)
const PULL_CURSOR  = 0.38
// How strongly the element nudges toward the cursor (0–1)
const PULL_ELEMENT = 0.18
// Distance (px) beyond the element's own radius that activates the effect
const ACTIVATION_PADDING = 72

export default function MagneticCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)

  // Mutable state lives in a ref so closures always see latest values
  const s = useRef({
    mouse:     { x: -200, y: -200 },
    prev:      { x: -200, y: -200 },
    vel:       { x: 0,    y: 0    },
    activeEl:  null,
    rafId:     null,
  })

  useEffect(() => {
    // Desktop only
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const st   = s.current

    // Spring setters — quickTo re-uses a single tween for max performance
    const moveDotX  = gsap.quickTo(dot,  'x', { duration: 0.10, ease: 'power3.out' })
    const moveDotY  = gsap.quickTo(dot,  'y', { duration: 0.10, ease: 'power3.out' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })

    // ── Mouse tracking ─────────────────────────────────────────────────────────
    function onMouseMove(e) {
      st.prev.x = st.mouse.x
      st.prev.y = st.mouse.y
      st.mouse.x = e.clientX
      st.mouse.y = e.clientY
    }

    // ── Per-frame loop ─────────────────────────────────────────────────────────
    function tick() {
      st.vel.x = st.mouse.x - st.prev.x
      st.vel.y = st.mouse.y - st.prev.y

      const mx = st.mouse.x
      const my = st.mouse.y

      // ── Magnetic snap ──
      let snapX   = mx
      let snapY   = my
      let hitEl   = null

      document.querySelectorAll(MAGNETIC_SELECTOR).forEach(el => {
        if (hitEl) return                        // already found one
        const r    = el.getBoundingClientRect()
        const cx   = r.left + r.width  * 0.5
        const cy   = r.top  + r.height * 0.5
        const dist = Math.hypot(mx - cx, my - cy)
        const zone = Math.max(r.width, r.height) * 0.5 + ACTIVATION_PADDING

        if (dist < zone) {
          const t  = 1 - dist / zone            // 0 at edge → 1 at center
          const p  = t * PULL_CURSOR
          snapX    = mx + (cx - mx) * p
          snapY    = my + (cy - my) * p
          hitEl    = el

          // Nudge element toward cursor
          gsap.to(el, {
            x: (mx - cx) * t * PULL_ELEMENT,
            y: (my - cy) * t * PULL_ELEMENT,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })

      // Spring-reset element that just lost focus
      if (st.activeEl && st.activeEl !== hitEl) {
        gsap.to(st.activeEl, {
          x: 0, y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto',
        })
      }
      st.activeEl = hitEl

      // ── Move cursors ──
      moveDotX(snapX)
      moveDotY(snapY)
      moveRingX(snapX)
      moveRingY(snapY)

      // ── Velocity distortion ──
      const speed   = Math.hypot(st.vel.x, st.vel.y)
      const angle   = Math.atan2(st.vel.y, st.vel.x) * (180 / Math.PI)
      const stretch = Math.min(speed * 0.04, 0.55)   // cap elongation

      gsap.to(ring, {
        scaleX:   1 + stretch,
        scaleY:   1 - stretch * 0.4,
        rotation: angle,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // ── Ring size + opacity when over a magnetic target ──
      gsap.to(ring, {
        width:      hitEl ? 52 : 38,
        height:     hitEl ? 52 : 38,
        marginLeft: hitEl ? -26 : -19,
        marginTop:  hitEl ? -26 : -19,
        opacity:    hitEl ? 0.9 : 0.5,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      st.prev.x = mx
      st.prev.y = my
      st.rafId  = requestAnimationFrame(tick)
    }

    // ── Visibility ─────────────────────────────────────────────────────────────
    const show = () => gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3  })

    // ── Click ripple on dot ────────────────────────────────────────────────────
    function onClick() {
      gsap.timeline()
        .to(dot,  { scale: 2.5, opacity: 0, duration: 0.35, ease: 'power2.out' })
        .to(dot,  { scale: 1,   opacity: 1, duration: 0,    ease: 'none'       })
    }

    window.addEventListener('mousemove',   onMouseMove)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    document.addEventListener('click',      onClick)

    // Start hidden until mouse enters
    gsap.set([dot, ring], { opacity: 0 })
    st.rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove',   onMouseMove)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('click',      onClick)
      cancelAnimationFrame(st.rafId)
      if (st.activeEl) gsap.to(st.activeEl, { x: 0, y: 0, duration: 0.4 })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="mcursor__dot"  aria-hidden="true" />
      <div ref={ringRef} className="mcursor__ring" aria-hidden="true" />
    </>
  )
}

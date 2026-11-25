import { useEffect, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Deterministic pseudo-random generator per letter index so initial scatter looks organic
function pseudoRandom(seed) {
  const x = Math.sin(seed * 91.3458 + 17.13) * 47453.5453
  return x - Math.floor(x)
}

export default function KineticHeading({
  text,
  className = '',
  accentClass = 'text-primary',
  radius = 90,
  force = 60,
  ready = true,
  triggerOnScroll = true,
}) {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, amount: 'some' })
  const letterRefs = useRef([])
  const statesRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })

  const shouldShow = ready && (!triggerOnScroll || inView)

  const scatterOffsets = useMemo(() => {
    return Array.from({ length: text.length }, (_, i) => ({
      x: (pseudoRandom(i + 1) - 0.5) * 640,
      y: (pseudoRandom(i + 101) - 0.5) * 380,
      rotate: (pseudoRandom(i + 201) - 0.5) * 540,
      scale: 0.25 + pseudoRandom(i + 301) * 0.3,
    }))
  }, [text])

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, text.length)
    statesRef.current = Array.from({ length: text.length }, () => ({
      x: 0,
      y: 0,
      r: 0,
      tx: 0,
      ty: 0,
      tr: 0,
    }))
  }, [text])

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    let rafId = 0

    const tick = () => {
      const m = mouseRef.current
      const els = letterRefs.current
      const states = statesRef.current

      for (let i = 0; i < els.length; i++) {
        const el = els[i]
        const st = states[i]
        if (!el || !st) continue

        if (m.active) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2 - st.x
          const cy = rect.top + rect.height / 2 - st.y
          const dx = cx - m.x
          const dy = cy - m.y
          const dist = Math.hypot(dx, dy)

          if (dist < radius && dist > 0.001) {
            const angle = Math.atan2(dy, dx)
            const strength = (radius - dist) / radius
            st.tx = Math.cos(angle) * strength * force
            st.ty = Math.sin(angle) * strength * force
            st.tr = Math.cos(angle) * strength * 14
          } else {
            st.tx = 0
            st.ty = 0
            st.tr = 0
          }
        } else {
          st.tx = 0
          st.ty = 0
          st.tr = 0
        }

        const ease = st.tx === 0 && st.ty === 0 ? 0.12 : 0.24
        st.x += (st.tx - st.x) * ease
        st.y += (st.ty - st.y) * ease
        st.r += (st.tr - st.r) * ease

        if (
          Math.abs(st.x) > 0.05 ||
          Math.abs(st.y) > 0.05 ||
          Math.abs(st.r) > 0.05
        ) {
          el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0) rotate(${st.r.toFixed(2)}deg)`
        } else if (el.style.transform) {
          el.style.transform = ''
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, force])

  const words = text.split(' ')
  const totalLetters = Math.max(text.replace(/\s+/g, '').length, 1)
  const baseDuration = Math.min(Math.max(1.1, totalLetters * 0.028), 1.4)
  const staggerStep = baseDuration / (totalLetters * 2)
  let charIndex = 0

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
    >
      {words.map((word, wIdx) => (
        <span key={`${word}-${wIdx}`} className="inline-flex whitespace-nowrap">
          {word.split('').map((char) => {
            const idx = charIndex++
            const scatter = scatterOffsets[idx] || {
              x: 0,
              y: 40,
              rotate: 0,
              scale: 0.4,
            }

            return (
              <motion.span
                key={`${text}-${idx}`}
                initial={{ ...scatter, opacity: 0 }}
                animate={
                  shouldShow
                    ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                    : { ...scatter, opacity: 0 }
                }
                transition={{
                  duration: baseDuration,
                  delay: idx * staggerStep,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="inline-block"
              >
                <span
                  ref={(node) => {
                    letterRefs.current[idx] = node
                  }}
                  className={`inline-block cursor-default select-none will-change-transform ${accentClass}`}
                >
                  {char}
                </span>
              </motion.span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

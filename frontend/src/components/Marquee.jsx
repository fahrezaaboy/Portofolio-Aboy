import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function Marquee({ items }) {
  const row = items.join(' // ') + ' // '
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
  })
  const shiftX = useTransform(smoothScroll, [0, 1], ['0%', '-16%'])

  return (
    <div
      ref={ref}
      className="relative z-20 bg-primary text-background border-y border-black/20 py-3.5 overflow-hidden select-none"
    >
      <motion.div style={{ x: shiftX }} className="will-change-transform">
        <div className="animate-marquee font-display text-2xl md:text-3xl font-black uppercase tracking-wider whitespace-nowrap">
          <span className="pr-4">{row}</span>
          <span className="pr-4" aria-hidden="true">
            {row}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

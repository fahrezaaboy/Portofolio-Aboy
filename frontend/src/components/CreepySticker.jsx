import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function CreepySticker({
  src,
  alt,
  className = '',
  floatY = 12,
  rotateRange = [-6, 6],
  duration = 4.5,
  delay = 0,
  scalePulse = false,
  mirror = false,
  parallaxSpeed = -55,
  parallaxX = 0,
  parallaxRotate = 0,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 22,
    mass: 0.35,
  })
  const scrollY = useTransform(smoothProgress, [0, 1], [-parallaxSpeed, parallaxSpeed])
  const scrollX = useTransform(smoothProgress, [0, 1], [-parallaxX, parallaxX])
  const scrollRotate = useTransform(smoothProgress, [0, 1], [
    -parallaxRotate,
    parallaxRotate,
  ])

  return (
    <motion.div
      ref={ref}
      style={{ y: scrollY, x: scrollX, rotate: scrollRotate }}
      initial={{ opacity: 0, scale: 0.78 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay }}
      className={`pointer-events-auto select-none will-change-transform ${className}`}
    >
      <div className={mirror ? '-scale-x-100' : ''}>
        <motion.img
          src={src}
          alt={alt}
          draggable={false}
          animate={{
            y: [0, -floatY, 0],
            rotate: [rotateRange[0], rotateRange[1], rotateRange[0]],
            ...(scalePulse ? { scale: [1, 1.08, 0.96, 1] } : {}),
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
          whileHover={{
            scale: 1.15,
            rotate: 0,
            transition: { type: 'spring', stiffness: 320, damping: 16 },
          }}
          className="w-full h-auto drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)]"
        />
      </div>
    </motion.div>
  )
}

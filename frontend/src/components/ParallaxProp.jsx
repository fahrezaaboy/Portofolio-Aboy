import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ParallaxProp({
  src,
  alt,
  className = '',
  speed = -90,
  xSpeed = 0,
  rotateScroll = 0,
  floatY = 10,
  rotateRange = [-4, 4],
  scaleRange = [1, 1],
  duration = 6,
  mirror = false,
  opacity = 1,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  })

  const y = useTransform(smoothProgress, [0, 1], [-speed, speed])
  const x = useTransform(smoothProgress, [0, 1], [-xSpeed, xSpeed])
  const rotate = useTransform(smoothProgress, [0, 1], [-rotateScroll, rotateScroll])
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [
    scaleRange[0],
    1,
    scaleRange[1],
  ])

  return (
    <motion.div
      ref={ref}
      style={{ y, x, rotate, scale, opacity }}
      className={`pointer-events-none select-none will-change-transform ${className}`}
    >
      <div className={mirror ? '-scale-x-100' : ''}>
        <motion.img
          src={src}
          alt={alt}
          draggable={false}
          animate={{
            y: [0, -floatY, 0],
            rotate: [rotateRange[0], rotateRange[1], rotateRange[0]],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-auto drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)]"
        />
      </div>
    </motion.div>
  )
}

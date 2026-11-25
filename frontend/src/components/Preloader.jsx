import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Preloader({ onReveal }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setVisible(false)
      onReveal?.()
    }, 1550)
    return () => clearTimeout(revealTimer)
  }, [onReveal])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center px-4">
            {/* Left word: starts hidden at center behind bolt, slides OUT to the left */}
            <div className="overflow-hidden pr-1 sm:pr-2">
              <motion.span
                initial={{ x: '110%' }}
                animate={{ x: '0%' }}
                transition={{
                  duration: 0.85,
                  delay: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight text-white leading-none"
              >
                FAHREZA
              </motion.span>
            </div>

            {/* Big center coral lightning bolt appears FIRST */}
            <motion.svg
              initial={{ scale: 0.25, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              viewBox="0 0 64 128"
              fill="none"
              className="w-12 h-24 sm:w-16 sm:h-32 md:w-20 md:h-40 shrink-0 z-10 -mx-2 sm:-mx-3"
            >
              <path
                d="M46 4L8 70H31L18 124L56 54H33L46 4Z"
                fill="#f65f4e"
              />
            </motion.svg>

            {/* Right word: starts hidden at center behind bolt, slides OUT to the right */}
            <div className="overflow-hidden pl-1 sm:pl-2">
              <motion.span
                initial={{ x: '-110%' }}
                animate={{ x: '0%' }}
                transition={{
                  duration: 0.85,
                  delay: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block font-display text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight text-white leading-none"
              >
                ABOY
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

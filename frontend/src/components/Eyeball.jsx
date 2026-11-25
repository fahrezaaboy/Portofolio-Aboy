import { useEffect, useRef, useState } from 'react'

export default function Eyeball({ size = 28, className = '', creepy = false }) {
  const eyeRef = useRef(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      if (!eyeRef.current) return
      const rect = eyeRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx)
      const maxOffset = size * 0.2
      const dist =
        Math.min(Math.hypot(e.clientX - cx, e.clientY - cy) / 24, 1) * maxOffset
      setPupil({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [size])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
    }, 3800 + Math.random() * 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      ref={eyeRef}
      style={{
        width: size,
        height: size,
        background: creepy
          ? 'radial-gradient(circle at 35% 30%, #ffffff 0%, #dcdad6 65%, #8f8a85 100%)'
          : 'radial-gradient(circle at 35% 30%, #ffffff 0%, #eaeaea 75%, #b5b5b5 100%)',
      }}
      className={`inline-flex items-center justify-center rounded-full border border-black/70 shadow-lg shadow-black/60 overflow-hidden shrink-0 relative ${className}`}
    >
      {/* Subtle creepy capillary veins */}
      {creepy && (
        <svg
          viewBox="0 0 40 40"
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
        >
          <path
            d="M3 16 Q9 14 12 18 M5 26 Q11 23 14 25 M36 14 Q30 16 27 14 M34 27 Q29 24 26 26"
            stroke="#c93b2b"
            strokeWidth="0.9"
            fill="none"
          />
        </svg>
      )}

      {/* Iris + Pupil */}
      <span
        style={{
          width: size * 0.5,
          height: blink ? 2 : size * 0.5,
          transform: `translate(${pupil.x}px, ${pupil.y}px)`,
          background: creepy
            ? 'radial-gradient(circle, #121212 36%, #3f6d8c 62%, #1d364a 100%)'
            : '#121212',
        }}
        className="rounded-full transition-transform duration-75 relative flex items-center justify-center"
      >
        {!blink && (
          <span
            style={{ width: size * 0.14, height: size * 0.14 }}
            className="rounded-full bg-white/95 absolute top-[18%] right-[20%]"
          />
        )}
      </span>
    </span>
  )
}

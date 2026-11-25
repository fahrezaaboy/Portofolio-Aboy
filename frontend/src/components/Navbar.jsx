import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import Eyeball from './Eyeball'

export default function Navbar({ lang, onToggleLang, t }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.certificates, href: '#certificates' },
    { name: t.nav.contact, href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          className="font-display text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-1 uppercase"
        >
          <span className="text-secondary">//</span>
          <span>FAHREZA</span>
          <span className="text-primary">.DEV</span>
        </a>

        {/* Centered Frosted Glass Pill Nav (Techyscouts style) */}
        <nav className="hidden lg:flex items-center gap-6 px-7 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 shadow-lg shadow-black/30">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right Controls: Language Switcher + Coral Pill CTA */}
        <div className="flex items-center gap-2.5">
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 p-0.5 font-mono text-xs"
          >
            {['id', 'en'].map((code) => {
              const active = lang === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onToggleLang(code)}
                  className={`px-2.5 py-1 rounded-full uppercase font-bold transition-all duration-200 ${
                    active
                      ? 'bg-primary text-background'
                      : 'text-foreground hover:text-white'
                  }`}
                >
                  {code}
                </button>
              )
            })}
          </div>

          <a href="#contact" className="hidden sm:inline-flex btn-coral py-2 px-4">
            <Eyeball size={18} />
            <span>{t.nav.hireMe}</span>
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden text-2xl text-white hover:text-primary transition-colors"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface/95 backdrop-blur-md border-y border-white/10 mt-3 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-foreground hover:text-primary py-1.5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-coral mt-2 w-full"
              >
                <Eyeball size={18} />
                {t.nav.hireMe}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

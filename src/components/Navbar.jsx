import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { name: 'Home',        href: '#home' },
  { name: 'About',       href: '#about' },
  { name: 'Projects',    href: '#projects' },
  { name: 'Skills',      href: '#skills' },
  { name: 'Sertifikat',  href: '#certificates' },
  { name: 'Contact',     href: '#contact' },
]


export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg shadow-black/30' : 'py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-lg font-bold grad-text">
          &lt;FahrezaDev /&gt;
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm text-muted hover:text-white transition-colors relative group"
            >
              {l.name}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-light group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#contact" className="btn-primary">Hire Me</a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl text-muted hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mx-4 mt-3 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted hover:text-white py-2 transition-colors"
                >
                  {l.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
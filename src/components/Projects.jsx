import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const filters = [
  { label: 'Semua', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Tugas Sekolah', value: 'sekolah' },
]

export default function Projects() {
  const [ref, visible] = useScrollReveal()
  const [active, setActive] = useState('all')
  const [hovered, setHovered] = useState(null)

  // ✅ FILTER FIX + SUPPORT MULTI CATEGORY
  const filtered =
    active === 'all'
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.category)
            ? p.category.includes(active)
            : p.category === active
        )

  return (
    <section id="projects" className="sec-padding">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Proyek <span className="grad-text">Saya</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                active === f.value
                  ? 'bg-accent text-white'
                  : 'glass text-muted hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.article
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                className="glass rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-violet-950/60 to-blue-950/60 flex items-center justify-center overflow-hidden">

                  {/* ✅ IMAGE / EMOJI */}
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-contain p-4 bg-white/90"
                    />
                  ) : (
                    <span className="text-5xl">{proj.emoji}</span>
                  )}

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered === proj.id ? 1 : 0 }}
                    className="absolute inset-0 bg-dark/80 flex items-center justify-center gap-4"
                  >
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/40 transition-all"
                    >
                      <FiGithub />
                    </a>

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/40 transition-all"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-1.5">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-accent/10 text-accent-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
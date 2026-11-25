import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import KineticHeading from './KineticHeading'
import ParallaxProp from './ParallaxProp'

export default function Projects({ projects, t }) {
  const [ref, visible] = useScrollReveal()
  const [active, setActive] = useState('all')
  const sectionRef = useRef(null)
  const isDesktop = useIsDesktop()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  })
  const headerY = useTransform(smoothScroll, [0, 1], [40, -45])
  const col0Y = useTransform(smoothScroll, [0, 1], isDesktop ? [45, -45] : [0, 0])
  const col1Y = useTransform(smoothScroll, [0, 1], isDesktop ? [105, -105] : [0, 0])
  const col2Y = useTransform(smoothScroll, [0, 1], isDesktop ? [20, -20] : [0, 0])
  const colTransforms = [col0Y, col1Y, col2Y]

  const filtered =
    active === 'all'
      ? projects
      : projects.filter((proj) =>
          Array.isArray(proj.category)
            ? proj.category.includes(active)
            : proj.category === active
        )

  return (
    <section ref={sectionRef} id="projects" className="sec-container relative">
      {/* Diagonal + rotating ringed planet parallax */}
      <ParallaxProp
        src="/stickers/saturn.png"
        alt="Ringed dark planet"
        className="hidden md:block absolute top-6 right-10 w-44 z-0"
        speed={-110}
        xSpeed={-55}
        rotateScroll={22}
        floatY={8}
        opacity={0.38}
        scaleRange={[0.88, 1.12]}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 will-change-transform"
        >
          <div>
            <span className="section-kicker">{t.projects.kicker}</span>
            <h2 className="section-heading">
              <KineticHeading text={`${t.projects.headingLead} ${t.projects.headingAccent}`} />
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {t.projects.filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setActive(f.value)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  active === f.value
                    ? 'bg-secondary text-white font-bold shadow-lg shadow-secondary/25'
                    : 'bg-white/[0.04] border border-white/10 text-foreground hover:border-primary/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="editorial-card p-10 text-center text-muted font-mono text-sm">
            {t.projects.empty}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, idx) => (
                <motion.article
                  key={proj.id}
                  style={{ y: colTransforms[idx % 3] }}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.06, duration: 0.45 }}
                  whileHover={{ y: -8 }}
                  className="editorial-card-hover flex flex-col overflow-hidden group will-change-transform"
                >
                  <div
                    className={`relative h-48 bg-black/30 border-b border-white/10 overflow-hidden flex items-center justify-center ${
                      proj.image && !proj.image.includes('logo') ? 'p-0' : 'p-5'
                    }`}
                  >
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-background/90 border border-white/15 font-mono text-[11px] text-primary font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className={
                          !proj.image.includes('logo')
                            ? 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                            : 'max-h-32 w-auto object-contain rounded-xl bg-white/95 p-3 group-hover:scale-105 transition-transform duration-300'
                        }
                      />
                    ) : (
                      <span className="font-display text-4xl text-primary">
                        {proj.title.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-foreground text-sm leading-relaxed">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-background/70 border border-white/10 font-mono text-[11px] text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {(proj.github || proj.live) && (
                        <div className="pt-3 border-t border-white/10 flex items-center gap-4">
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-white hover:text-primary transition-colors"
                            >
                              <FiGithub />
                              {t.projects.viewCode}
                            </a>
                          )}
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-primary transition-colors"
                            >
                              <FiExternalLink />
                              {t.projects.viewLive}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </section>
  )
}

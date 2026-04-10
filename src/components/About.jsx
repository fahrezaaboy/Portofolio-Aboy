import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { profile, experiences } from '../data/projects'

export default function About() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="about" className="sec-padding bg-surface/40">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Tentang <span className="grad-text">Aku</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio */}
          <div>
            {profile.bio.map((p, i) => (
              <p key={i} className="text-muted text-sm leading-relaxed mb-4">{p}</p>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {profile.stats.map(({ value, label }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl font-bold grad-text">{value}</div>
                  <div className="text-xs text-dim mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-accent-light mb-6">
              Perjalananku
            </h3>
            <div className="relative pl-5 border-l border-accent/20">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="relative mb-7 last:mb-0"
                >
                  {/* Dot */}
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-dark" />
                  <div className="text-xs text-accent mb-1">{exp.period}</div>
                  <div className="text-sm font-semibold">{exp.role}</div>
                  <div className="text-xs text-dim">{exp.place}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
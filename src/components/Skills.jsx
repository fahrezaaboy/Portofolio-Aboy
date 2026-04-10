import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { skills } from '../data/projects'

export default function Skills() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="skills" className="sec-padding bg-surface/40">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Skill <span className="grad-text">Teknologi</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.15 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-sm font-semibold text-accent-light mb-6">
                {group.category}
              </h3>

              <div className="space-y-5">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-accent-light">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={visible ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.4 + gi * 0.15 + si * 0.08, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech emoji icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {['⚛️', '📘', '🐘', '🟢', '🍃', '🐳', '☁️', '🔥'].map((em, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, rotate: 6 }}
              className="w-14 h-14 glass rounded-xl flex items-center justify-center text-2xl cursor-pointer"
            >
              {em}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
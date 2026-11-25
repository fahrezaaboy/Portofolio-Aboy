import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsDesktop } from '../hooks/useIsDesktop'
import KineticHeading from './KineticHeading'
import CreepySticker from './CreepySticker'
import Eyeball from './Eyeball'

const cardTilts = ['-rotate-2', 'rotate-1', '-rotate-1']
const cardColors = [
  'bg-primary text-background border-primary',
  'bg-white/[0.06] text-white border-white/15',
  'bg-secondary text-white border-secondary',
]

export default function About({ profile, experiences, t }) {
  const [ref, visible] = useScrollReveal()
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

  const bioColY = useTransform(smoothScroll, [0, 1], isDesktop ? [65, -65] : [0, 0])
  const timelineColY = useTransform(smoothScroll, [0, 1], isDesktop ? [125, -125] : [0, 0])
  const headerY = useTransform(smoothScroll, [0, 1], [36, -36])

  return (
    <section ref={sectionRef} id="about" className="sec-container relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <motion.div
            style={{ y: headerY }}
            className="lg:col-span-8 will-change-transform"
          >
            <span className="section-kicker">{t.about.kicker}</span>
            <h2 className="section-heading">
              <KineticHeading text={`${t.about.headingLead} ${t.about.headingAccent}`} />
            </h2>
          </motion.div>

          <div className="hidden lg:flex lg:col-span-4 justify-end items-center relative">
            <CreepySticker
              src="/stickers/tentacle-crt.png"
              alt="Tentacles bursting from vintage CRT monitor"
              className="w-52"
              floatY={10}
              rotateRange={[-3, 4]}
              duration={5.4}
              parallaxSpeed={-95}
              parallaxX={24}
              parallaxRotate={8}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-2"
            >
              <Eyeball size={26} creepy />
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            style={{ y: bioColY }}
            className="lg:col-span-5 flex flex-col gap-8 will-change-transform"
          >
            <div className="space-y-4">
              {profile.bio?.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-foreground text-sm md:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              {profile.stats?.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + idx * 0.08 }}
                  whileHover={{ rotate: 0, scale: 1.06, y: -4 }}
                  className={`rounded-2xl border p-4 cursor-default transition-shadow shadow-xl shadow-black/40 ${
                    cardTilts[idx % cardTilts.length]
                  } ${cardColors[idx % cardColors.length]}`}
                >
                  <div className="font-display text-4xl md:text-5xl font-extrabold leading-none">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider mt-2 opacity-85">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ y: timelineColY }}
            className="lg:col-span-7 will-change-transform"
          >
            <div className="editorial-card p-6 md:p-8">
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
                // {t.about.journeyTitle}
              </div>

              <div className="divide-y divide-white/10">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={exp.id || idx}
                    initial={{ opacity: 0, x: 18 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="py-5 first:pt-0 last:pb-0 grid sm:grid-cols-12 gap-2 sm:gap-4"
                  >
                    <div className="sm:col-span-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-background/70 border border-white/15 font-mono text-xs text-secondary">
                        {exp.period}
                      </span>
                    </div>
                    <div className="sm:col-span-8">
                      <h3 className="text-white font-semibold text-base mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-foreground text-sm leading-relaxed">
                        {exp.place}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

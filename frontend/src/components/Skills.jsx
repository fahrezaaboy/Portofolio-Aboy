import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsDesktop } from '../hooks/useIsDesktop'
import Eyeball from './Eyeball'
import KineticHeading from './KineticHeading'
import CreepySticker from './CreepySticker'
import ParallaxProp from './ParallaxProp'

const cardTilts = ['md:-rotate-2', 'md:rotate-1', 'md:rotate-2']

export default function Skills({ skills, t }) {
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

  const headerY = useTransform(smoothScroll, [0, 1], [35, -35])
  const card0Y = useTransform(smoothScroll, [0, 1], isDesktop ? [45, -45] : [0, 0])
  const card1Y = useTransform(smoothScroll, [0, 1], isDesktop ? [100, -100] : [0, 0])
  const card2Y = useTransform(smoothScroll, [0, 1], isDesktop ? [25, -25] : [0, 0])
  const cardTransforms = [card0Y, card1Y, card2Y]

  return (
    <section ref={sectionRef} id="skills" className="sec-container relative">
      {/* Subtle atmospheric moon in background */}
      <ParallaxProp
        src="/stickers/moon.png"
        alt="Atmospheric dark moon"
        className="hidden md:block absolute top-10 left-8 w-28 z-0"
        speed={-95}
        xSpeed={35}
        rotateScroll={-20}
        floatY={8}
        opacity={0.32}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-14">
          <motion.div
            style={{ y: headerY }}
            className="lg:col-span-8 will-change-transform"
          >
            <span className="section-kicker">{t.skills.kicker}</span>
            <h2 className="section-heading mb-4">
              <KineticHeading
                text={`${t.skills.headingLead} ${t.skills.headingAccent}`}
              />
            </h2>
            <p className="text-foreground text-sm md:text-base leading-relaxed max-w-2xl">
              {t.skills.subtitle}
            </p>
          </motion.div>

          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative w-48">
              <CreepySticker
                src="/stickers/astro-octopus.png"
                alt="Astronaut helmet octopus monster"
                className="w-full"
                floatY={10}
                rotateRange={[-4, 5]}
                duration={5.6}
                parallaxSpeed={-90}
                parallaxX={18}
                parallaxRotate={-10}
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1 -left-5"
              >
                <Eyeball size={24} creepy />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 -right-3"
              >
                <Eyeball size={20} creepy />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Original full-width 3-column tilted Skills cards with distinct per-column parallax */}
        <div className="grid md:grid-cols-3 gap-7">
          {skills.map((group, gi) => (
            <motion.div
              key={group.id || group.category}
              style={{ y: cardTransforms[gi % 3] }}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className={`editorial-card p-6 hover:border-primary/70 transition-all duration-300 shadow-2xl shadow-black/50 will-change-transform ${
                cardTilts[gi % cardTilts.length]
              }`}
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  // {group.category}
                </h3>
                <Eyeball size={24} creepy />
              </div>

              <div className="space-y-4">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-background/70 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={visible ? { width: `${skill.level}%` } : {}}
                        transition={{
                          delay: 0.25 + gi * 0.1 + si * 0.06,
                          duration: 0.75,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dedicated balanced sticker stage with dramatic multi-speed parallax */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 px-2">
          <div className="flex items-end gap-2">
            <CreepySticker
              src="/stickers/tv-stack.png"
              alt="Vintage CRT TV stack"
              className="w-36 sm:w-44"
              floatY={8}
              rotateRange={[-3, 2]}
              duration={5.2}
              parallaxSpeed={-55}
              parallaxX={-20}
            />
            <CreepySticker
              src="/stickers/earth-globe.png"
              alt="Earth globe with balancing astronauts"
              className="w-44 sm:w-52 -ml-4"
              floatY={10}
              rotateRange={[-2, 3]}
              duration={6}
              delay={0.2}
              parallaxSpeed={-105}
              parallaxRotate={12}
            />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <ParallaxProp
              src="/stickers/moon.png"
              alt="Cratered moon"
              className="w-24"
              speed={-85}
              xSpeed={-25}
              rotateScroll={-25}
              floatY={8}
              opacity={0.78}
            />
            <ParallaxProp
              src="/stickers/saturn.png"
              alt="Ringed dark planet"
              className="w-36"
              speed={-130}
              xSpeed={30}
              rotateScroll={16}
              floatY={10}
              opacity={0.85}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi'
import KineticHeading from './KineticHeading'
import Eyeball from './Eyeball'
import CreepySticker from './CreepySticker'
import ParallaxProp from './ParallaxProp'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
})

export default function Hero({ profile, t, revealed }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  })

  // Strong opposite vertical velocities create unmistakable 3D parallax depth on scroll
  const copyY = useTransform(smoothProgress, [0, 1], [0, 115])
  const copyScale = useTransform(smoothProgress, [0, 1], [1, 0.94])
  const copyOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0.18])

  const cardY = useTransform(smoothProgress, [0, 1], [0, -150])
  const cardRotate = useTransform(smoothProgress, [0, 1], [-1, 7])
  const cardScale = useTransform(smoothProgress, [0, 1], [1, 0.92])

  const suitLeftX = useTransform(smoothProgress, [0, 1], [0, -85])
  const suitLeftY = useTransform(smoothProgress, [0, 1], [0, -170])
  const suitRightX = useTransform(smoothProgress, [0, 1], [0, 85])
  const suitRightY = useTransform(smoothProgress, [0, 1], [0, -145])

  const nameParts = profile.name.split(' ')
  const firstTwo = nameParts.slice(0, 2).join(' ')
  const lastPart = nameParts.slice(2).join(' ')

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden z-10"
    >
      {/* Background moons & planets with diagonal + rotational scroll parallax */}
      <ParallaxProp
        src="/stickers/moon.png"
        alt="Dark cratered moon"
        className="hidden md:block absolute top-24 right-[32%] w-24 z-0"
        speed={130}
        xSpeed={-40}
        rotateScroll={22}
        floatY={8}
        opacity={0.48}
      />
      <ParallaxProp
        src="/stickers/saturn.png"
        alt="Ringed dark planet"
        className="hidden lg:block absolute top-20 right-6 w-40 z-0"
        speed={165}
        xSpeed={50}
        rotateScroll={-18}
        floatY={10}
        rotateRange={[-6, 4]}
        opacity={0.58}
      />

      {/* Symmetrical floating eyeball-suit figures flying outward on scroll */}
      <motion.div
        style={{ x: suitLeftX, y: suitLeftY }}
        className="hidden xl:block absolute bottom-4 left-2 w-48 opacity-90 z-20 will-change-transform"
      >
        <CreepySticker
          src="/stickers/eyeball-suit.png"
          alt="Floating eyeball suit figure left"
          className="w-full"
          floatY={16}
          rotateRange={[-7, 4]}
          duration={5.6}
          parallaxSpeed={0}
        />
      </motion.div>

      <motion.div
        style={{ x: suitRightX, y: suitRightY }}
        className="hidden xl:block absolute bottom-6 right-2 w-44 opacity-85 z-20 will-change-transform"
      >
        <CreepySticker
          src="/stickers/eyeball-suit.png"
          alt="Floating eyeball suit figure right"
          className="w-full"
          floatY={14}
          rotateRange={[-5, 6]}
          duration={5.1}
          delay={0.4}
          mirror
          parallaxSpeed={0}
        />
      </motion.div>

      {/* Vintage speaker top-left */}
      <CreepySticker
        src="/stickers/retro-speaker.png"
        alt="Vintage speaker with electric sparks"
        className="hidden lg:block absolute top-24 left-6 xl:left-12 w-28 md:w-32 opacity-95 z-20"
        floatY={10}
        rotateRange={[-16, -6]}
        duration={4.1}
        scalePulse
        parallaxSpeed={-95}
        parallaxX={-28}
        parallaxRotate={-14}
      />

      {/* Floating mouse-tracking bloodshot eyeballs */}
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute bottom-28 left-40 z-20"
      >
        <Eyeball size={34} creepy />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="hidden md:block absolute top-40 right-24 z-20"
      >
        <Eyeball size={26} creepy />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left editorial copy */}
          <motion.div
            style={{ y: copyY, scale: copyScale, opacity: copyOpacity }}
            className="lg:col-span-7 relative will-change-transform"
          >
            <motion.div
              {...fadeUp(0.05)}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground">
                {profile.school} · {profile.grade} · {profile.major}
              </span>
            </motion.div>

            <motion.p
              {...fadeUp(0.1)}
              className="font-kicker text-3xl md:text-4xl font-normal uppercase tracking-[0.26em] sm:tracking-[0.32em] text-secondary mb-3 leading-none"
            >
              {t.hero.greeting} // {profile.role}
            </motion.p>

            <div className="relative mb-6">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-normal uppercase leading-[1.15] tracking-[-0.01em] text-primary">
                <KineticHeading
                  text={firstTwo}
                  accentClass="text-primary"
                  ready={revealed}
                  triggerOnScroll={false}
                />
                {lastPart && (
                  <>
                    <br />
                    <KineticHeading
                      text={lastPart}
                      accentClass="text-primary"
                      ready={revealed}
                      triggerOnScroll={false}
                    />
                  </>
                )}
              </h1>

              <CreepySticker
                src="/stickers/creepy-mouth.png"
                alt="Creepy screaming mouth sticker"
                className="hidden sm:block absolute -bottom-5 -left-7 w-14 md:w-16 z-20"
                floatY={6}
                rotateRange={[-14, -2]}
                duration={3.2}
                scalePulse
                parallaxSpeed={-30}
              />
            </div>

            <motion.p
              {...fadeUp(0.26)}
              className="text-foreground text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              {profile.bio?.[0]}
            </motion.p>

            <motion.div
              {...fadeUp(0.34)}
              className="flex flex-wrap items-center gap-3.5 mb-8"
            >
              <a href="#contact" className="btn-coral px-6 py-3">
                <Eyeball size={20} creepy />
                <span>{t.hero.ctaContact}</span>
                <FiArrowUpRight className="text-base" />
              </a>
              <a href="#projects" className="btn-outline-dark">
                {t.hero.ctaProjects}
              </a>
              <a
                href="/resume.pdf"
                download="CV_Fahreza_Aboy.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider text-foreground hover:text-primary transition-colors"
              >
                <FiDownload />
                {t.hero.ctaResume}
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.42)} className="flex flex-wrap items-center gap-3">
              {[
                { icon: FiGithub, href: profile.github, label: 'GitHub' },
                { icon: FiLinkedin, href: profile.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-foreground hover:text-primary hover:border-primary/60 transition-all"
                >
                  <Icon className="text-sm" />
                  <span>{label}</span>
                </a>
              ))}
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted ml-1">
                // {t.hero.status}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: Sleek Dark Framed Portrait with fast upward + tilt parallax */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end will-change-transform"
          >
            <div className="relative w-full max-w-sm">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -left-5 z-20"
              >
                <Eyeball size={40} creepy />
              </motion.div>

              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-4 z-20"
              >
                <Eyeball size={30} creepy />
              </motion.div>

              <div className="absolute inset-0 rounded-2xl border border-primary/40 rotate-2 pointer-events-none" />

              <motion.div
                style={{ rotate: cardRotate }}
                whileHover={{ rotate: 0 }}
                className="relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/15 p-4 transition-shadow duration-300 shadow-2xl shadow-black/70"
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
                    // SUBJECT_ABOY
                  </span>
                  <span className="font-mono text-[11px] text-primary">
                    BOGOR · ID
                  </span>
                </div>

                <div className="aspect-[4/4.2] rounded-xl overflow-hidden bg-background border border-white/10">
                  <img
                    src="/profil.jpeg"
                    alt={profile.name}
                    className="w-full h-full object-cover grayscale-[25%] contrast-110 hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Next.js', 'React', 'NestJS', 'Laravel', 'Tailwind', 'SQLite'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-background/70 border border-white/10 font-mono text-[11px] text-foreground"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:flex flex-col items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {t.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/25 flex justify-center pt-1.5"
        >
          <span className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

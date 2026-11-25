import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { FiExternalLink, FiAward } from 'react-icons/fi'
import KineticHeading from './KineticHeading'
import CreepySticker from './CreepySticker'

export default function Certificates({ certificates, t }) {
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
  const leftCardY = useTransform(smoothScroll, [0, 1], isDesktop ? [45, -45] : [0, 0])
  const rightCardY = useTransform(smoothScroll, [0, 1], isDesktop ? [110, -110] : [0, 0])

  return (
    <section ref={sectionRef} id="certificates" className="sec-container relative">
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
            <span className="section-kicker">{t.certificates.kicker}</span>
            <h2 className="section-heading">
              <KineticHeading text={`${t.certificates.headingLead} ${t.certificates.headingAccent}`} />
            </h2>
          </motion.div>

          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <CreepySticker
              src="/stickers/tv-stack.png"
              alt="Vintage CRT TV stack with eyeball"
              className="w-40"
              floatY={9}
              rotateRange={[-3, 3]}
              duration={5.2}
              parallaxSpeed={-85}
              parallaxX={20}
              parallaxRotate={-8}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <motion.article
              key={cert.id || cert.title}
              style={{ y: idx % 2 === 0 ? leftCardY : rightCardY }}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="editorial-card-hover p-6 flex flex-col justify-between gap-5 will-change-transform"
            >
              <div>
                {cert.image && (
                  <div className="mb-5 rounded-xl overflow-hidden bg-black/30 border border-white/10 p-3">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-52 object-contain"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                      {cert.year}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1">
                      {cert.title}
                    </h3>
                    {cert.issuer && cert.issuer !== '—' && (
                      <p className="text-foreground text-sm mt-1">
                        {cert.issuer}
                      </p>
                    )}
                  </div>

                  <div className="w-11 h-11 rounded-full bg-background/70 border border-white/10 flex items-center justify-center text-primary shrink-0">
                    <FiAward className="text-lg" />
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark text-xs py-2.5 px-5"
                >
                  {t.certificates.viewPdf}
                  <FiExternalLink />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

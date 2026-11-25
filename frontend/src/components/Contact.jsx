import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { submitContact } from '../services/api'
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Eyeball from './Eyeball'
import KineticHeading from './KineticHeading'

export default function Contact({ profile, lang, t }) {
  const [ref, visible] = useScrollReveal()
  const sectionRef = useRef(null)
  const isDesktop = useIsDesktop()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  })
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  })
  const infoColY = useTransform(smoothScroll, [0, 1], isDesktop ? [80, 0] : [0, 0])
  const formColY = useTransform(smoothScroll, [0, 1], isDesktop ? [140, 0] : [0, 0])
  const moonY = useTransform(smoothScroll, [0, 1], [100, -25])
  const moonScale = useTransform(smoothScroll, [0, 1], [0.82, 1.04])
  const moonOpacity = useTransform(smoothScroll, [0, 0.7, 1], [0.12, 0.34, 0.46])
  const moonRotate = useTransform(smoothScroll, [0, 1], [-8, 4])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setFeedback('')
    try {
      const res = await submitContact({ ...form, lang })
      setStatus('sent')
      setFeedback(res.message || '')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setFeedback(err.message)
    }
  }

  const contactItems = [
    { icon: FiMail, label: t.contact.emailLabel, value: profile.email },
    { icon: FiPhone, label: t.contact.whatsappLabel, value: profile.whatsapp },
    { icon: FiMapPin, label: t.contact.locationLabel, value: profile.location },
  ]

  return (
    <section ref={sectionRef} id="contact" className="sec-container pb-28 relative overflow-visible">
      {/* Giant atmospheric rising Moon (fully unclipped behind Contact) */}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-[340px] sm:w-[460px] md:w-[540px] z-0">
        <motion.div
          style={{ y: moonY, scale: moonScale, opacity: moonOpacity, rotate: moonRotate }}
          className="w-full will-change-transform"
        >
          <img
            src="/stickers/moon.png"
            alt="Giant cratered moon"
            draggable={false}
            className="w-full h-auto drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)]"
          />
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative z-10"
      >
        <div className="mb-12">
          <span className="section-kicker">{t.contact.kicker}</span>
          <h2 className="section-heading">
            <KineticHeading text={`${t.contact.headingLead} ${t.contact.headingAccent}`} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <motion.div
            style={{ y: infoColY }}
            className="lg:col-span-5 space-y-6 will-change-transform"
          >
            <p className="text-foreground text-sm md:text-base leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="editorial-card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-background/70 border border-white/10 flex items-center justify-center text-primary shrink-0">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {label}
                    </div>
                    <div className="text-sm text-white font-medium truncate">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            style={{ y: formColY }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 editorial-card p-6 md:p-8 space-y-5 relative z-10 will-change-transform"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted mb-2">
                  {t.contact.form.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-5 py-3 bg-white/[0.04] border border-white/15 rounded-full text-sm text-white placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted mb-2">
                  {t.contact.form.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full px-5 py-3 bg-white/[0.04] border border-white/15 rounded-full text-sm text-white placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-muted mb-2">
                {t.contact.form.messageLabel}
              </label>
              <textarea
                name="message"
                required
                minLength={5}
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/15 rounded-2xl text-sm text-white placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            {feedback && (
              <div
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono border ${
                  status === 'sent'
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-secondary/10 border-secondary/40 text-secondary'
                }`}
              >
                {status === 'sent' ? (
                  <FiCheckCircle className="shrink-0 text-base" />
                ) : (
                  <FiAlertCircle className="shrink-0 text-base" />
                )}
                <span>{feedback}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-coral py-3 px-7 disabled:opacity-60"
            >
              <Eyeball size={20} creepy />
              <span>
                {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
              </span>
              <FiSend />
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { certificates } from '../data/projects'
import { FiFileText, FiExternalLink } from 'react-icons/fi'

export default function Certificates() {
  const [ref, visible] = useScrollReveal()

  return (
    <section id="certificates" className="sec-padding bg-surface/40">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Sertifikat <span className="grad-text">Saya</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {certificates.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="glass rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
            >
              <div className="p-6">
                {c.image ? (
                  <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-56 object-contain bg-transparent"
                    />
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-base mb-2">{c.title}</h3>
                    <div className="text-xs text-muted leading-relaxed">
                      {c.issuer && c.issuer !== '—' ? `${c.issuer} · ` : ''}
                      {c.year ? c.year : ''}
                    </div>
                  </div>


                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-light">
                    <FiFileText className="text-xl" />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Lihat PDF
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}


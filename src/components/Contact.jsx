import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { profile } from '../data/projects'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

const contactItems = (p) => [
  { icon: FiMail,   label: 'Email',     value: p.email },
  { icon: FiPhone,  label: 'WhatsApp',  value: p.whatsapp },
  { icon: FiMapPin, label: 'Lokasi',    value: p.location },
]

export default function Contact() {
  const [ref, visible] = useScrollReveal()
  const [form, setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <section id="contact" className="sec-padding">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Kontak <span className="grad-text">Saya</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Punya proyek menarik atau mau kolaborasi bareng? Aku terbuka untuk
              freelance, magang, atau sekadar ngobrol soal coding. Jangan ragu
              hubungi aku! 😊
            </p>

            <div className="space-y-5">
              {contactItems(profile).map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-accent-light">
                    <Icon className="text-base" />
                  </div>
                  <div>
                    <div className="text-xs text-dim">{label}</div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-7 space-y-5"
          >
            {[
              { label: 'Nama Kamu', name: 'name',    type: 'text',  placeholder: 'Fahreza Aboy' },
              { label: 'Email',     name: 'email',   type: 'email', placeholder: 'fahrezaaboyfiransyah30@gmail.com' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-xs text-dim mb-2">{label}</label>
                <input
                  type={type}
                  name={name}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/8 rounded-lg text-sm focus:border-accent/50 focus:outline-none transition-colors placeholder:text-dim"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs text-dim mb-2">Pesan</label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Hei Fahreza, aku mau tanya soal/saya ingin memberi saran..."
                className="w-full px-4 py-2.5 bg-gray-900/50 border border-white/8 rounded-lg text-sm focus:border-accent/50 focus:outline-none transition-colors resize-none placeholder:text-dim"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === 'sending' ? (
                'Mengirim...'
              ) : status === 'sent' ? (
                'Terkirim! ✅'
              ) : (
                <>Kirim Pesan <FiSend /></>
              )}
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}   
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import { profile } from '../data/projects'

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
})

export default function Hero() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center sec-padding pt-32 relative"
        >
            <div className="grid lg:grid-cols-2 gap-14 items-center w-full">
                {/* --- Left: Text --- */}
                <div>
                    <motion.span
                        {...fadeUp(0.1)}
                        className="inline-block px-4 py-1.5 rounded-full glass text-accent-light text-xs mb-6"
                    >
                         {profile.grade} · {profile.major}
                    </motion.span>

                    <motion.h1
                        {...fadeUp(0.2)}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
                    >
                        Hai, Saya{' '}
                        <span className="grad-text">{profile.name}</span>
                        <br />
                        <span className="text-slate-500 text-3xl md:text-4xl font-bold">
                            {profile.role}
                        </span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.3)}
                        className="text-muted text-base leading-relaxed mb-8 max-w-md"
                    >
                        {profile.bio[0]}
                    </motion.p>

                    <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-8">
                        <a href="#contact" className="btn-primary">Hubungi Saya</a>
                        <a href="#projects" className="btn-outline">Lihat Proyekku</a>
                        
                        {/* FITUR DOWNLOAD CV */}
                        <a
                            href="/resume.pdf"
                            download="CV_Fahreza_Aboy.pdf"
                            className="btn-outline flex items-center gap-1.5"
                        >
                            <FiDownload className="text-sm" /> CV / Resume
                        </a>
                    </motion.div>

                    {/* Social icons */}
                    <motion.div {...fadeUp(0.5)} className="flex gap-3">
                        {[
                            { icon: FiGithub, href: profile.github },
                            { icon: FiLinkedin, href: profile.linkedin },
                        ].map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/40 transition-all"
                            >
                                <Icon />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* --- Right: Avatar --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="hidden lg:flex justify-center"
                >
                    <div className="relative w-72 h-72">
                        {/* Spinning ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30 animate-spin-slow" />
                        {/* Static ring */}
                        <div className="absolute inset-4 rounded-full border border-accent/20" />
                        
                        {/* Avatar circle */}
                        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center overflow-hidden border-2 border-accent/20">
                            <img 
                                src="/profil.jpeg" 
                                alt={profile.name}
                                className="w-full h-full object-cover rounded-full" 
                            />
                        </div>

                        {/* Floating badges */}
                        {[
                            { label: '⚛️ React', cls: '-top-6 -right-4', delay: '0s' },
                            { label: '🌐 Laravel', cls: 'top-20 -left-16', delay: '1s' },
                            { label: '🎓 SMK Wikrama Bogor RPL', cls: '-bottom-10 left-1/2 -translate-x-1/2 w-max', delay: '2s' },
                            { label: '🎨 CSS', cls: 'top-0 -left-10', delay: '1.5s' },
                            { label: '📄 HTML', cls: '-top-12 left-10', delay: '0.5s' },
                            { label: '⚡ JS', cls: 'bottom-20 -right-14', delay: '2.5s' },
                            { label: '🐘 PHP', cls: 'bottom-4 -left-14', delay: '1.2s' },
                            { label: '🅱️ Bootstrap', cls: 'bottom-0 -right-12', delay: '0.8s' },
                        ].map(({ label, cls, delay }) => (
                            <span
                                key={label}
                                style={{ animationDelay: delay }}
                                className={`absolute glass text-accent-light text-[10px] md:text-xs px-3 py-1.5 rounded-lg animate-float z-10 whitespace-nowrap ${cls}`}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator - "Hai" sudah dihapus, kembali ke roda mouse standar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
                >
                    {/* Roda mouse (dot kecil) */}
                    <motion.div 
                        animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-2 bg-accent-light rounded-full" 
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
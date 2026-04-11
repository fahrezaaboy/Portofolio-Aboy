import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'
import { profile } from '../data/projects'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-7 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-dim text-sm flex items-center gap-1.5">
          Dibuat oleh{' '}
          <span className="grad-text font-medium">{profile.name}</span>
          {' '}· Siswa SMK Wikrama Bogor RPL ©{new Date().getFullYear()}
        </p>

        <div className="flex gap-3">
          {[
            { Icon: FiGithub,   href: profile.github },
            { Icon: FiLinkedin, href: profile.linkedin },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-accent-light transition-colors"
            >
              <Icon className="text-lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
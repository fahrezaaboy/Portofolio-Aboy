import { FiArrowUp, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer({ profile, t }) {
  return (
    <footer className="border-t border-white/10 bg-surface/60">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-foreground">
            {t.footer.builtBy}{' '}
            <span className="text-primary font-semibold">{profile.name}</span> ·{' '}
            {t.footer.schoolNote} © {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground hover:text-primary transition-colors"
          >
            <FiGithub className="text-lg" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground hover:text-primary transition-colors"
          >
            <FiLinkedin className="text-lg" />
          </a>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors pl-2 border-l border-white/15"
          >
            {t.footer.backToTop}
            <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  )
}

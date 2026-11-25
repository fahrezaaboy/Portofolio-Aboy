import { useEffect, useState, useCallback } from 'react'
import CosmicBackground from './components/CosmicBackground'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { fetchPortfolio } from './services/api'
import { translations } from './i18n/translations'

function getInitialLang() {
  try {
    const saved = localStorage.getItem('aboy_lang')
    return saved === 'en' ? 'en' : 'id'
  } catch {
    return 'id'
  }
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [revealed, setRevealed] = useState(false)

  const t = translations[lang]

  const loadPortfolio = useCallback(async (targetLang) => {
    setLoading(true)
    setError('')
    try {
      const payload = await fetchPortfolio(targetLang)
      setData(payload)
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('aboy_lang', lang)
    } catch {
      // ignore storage errors
    }
    loadPortfolio(lang)
  }, [lang, loadPortfolio])

  const handleToggleLang = (nextLang) => {
    if (nextLang !== lang) {
      setLang(nextLang)
    }
  }

  const handleReveal = useCallback(() => {
    setRevealed(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CosmicBackground />
      <ScrollProgress />
      <Preloader onReveal={handleReveal} />
      <Navbar lang={lang} onToggleLang={handleToggleLang} t={t} />

      {loading && !data ? (
        <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.states.loading}
            </p>
          </div>
        </main>
      ) : error && !data ? (
        <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="editorial-card p-8 max-w-md w-full text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              // API_OFFLINE
            </span>
            <h1 className="font-display text-4xl font-black uppercase text-white">
              {t.states.errorTitle}
            </h1>
            <p className="text-sm text-foreground">{t.states.errorDesc}</p>
            <button
              type="button"
              onClick={() => loadPortfolio(lang)}
              className="btn-coral"
            >
              {t.states.retry}
            </button>
          </div>
        </main>
      ) : (
        <div className="relative z-10">
          <main className={loading ? 'opacity-70 transition-opacity' : 'transition-opacity'}>
            <Hero profile={data.profile} t={t} revealed={revealed} />
            <Marquee items={t.marquee} />
            <About
              profile={data.profile}
              experiences={data.experiences}
              t={t}
            />
            <Projects projects={data.projects} t={t} />
            <Skills skills={data.skills} t={t} />
            <Certificates certificates={data.certificates} t={t} />
            <Contact profile={data.profile} lang={lang} t={t} />
          </main>
          <Footer profile={data.profile} t={t} />
        </div>
      )}
    </div>
  )
}

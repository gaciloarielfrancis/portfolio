import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { profile as profileImg } from '../assets'
import { useTheme } from '../hooks/useTheme.jsx'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function ThemeSlider({ theme, toggle, size = 'md' }) {
  const isDark = theme === 'dark'
  const dim = size === 'sm' ? 'h-[28px] w-[52px] p-[3px]' : 'h-7 w-[54px] p-1'
  const knob = size === 'sm' ? 'h-[22px] w-[22px]' : 'h-5 w-5'
  const translate = isDark ? (size === 'sm' ? 'translate-x-[24px]' : 'translate-x-[26px]') : 'translate-x-0'
  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggle}
      className={`relative inline-flex items-center rounded-full border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${dim} ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}
    >
      {/* knob with single active icon — no duplicate track icons */}
      <span className={`inline-block rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${knob} ${translate} ${isDark ? 'bg-white' : 'bg-slate-900'}`}>
        {isDark ? <FiMoon size={12} className="text-slate-800" /> : <FiSun size={12} className="text-amber-500" />}
      </span>
    </button>
  )
}

export default function Nav() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const sections = links.map(l => document.getElementById(l.id)).filter(Boolean)
      let cur = 'home'
      for (const s of sections) {
        if (window.scrollY + 120 >= s.offsetTop) cur = s.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto mt-3 sm:mt-4 flex items-center justify-between rounded-full border px-3 sm:px-4 py-2 sm:py-2.5 transition-all duration-300 ${
            scrolled
              ? 'bg-white/85 dark:bg-[#0f111a]/70 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-card dark:shadow-card shadow-cardLight'
              : 'bg-transparent border-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2.5 sm:gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full pr-2">
            <span className="relative shrink-0">
              <img src={profileImg} alt="Ariel Francis Gacilo" loading="eager" decoding="async" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-slate-200 dark:border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.15)] bg-white/10" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0f111a] shadow-sm" aria-hidden="true" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display font-semibold leading-none text-sm text-slate-900 dark:text-white">Ariel Francis</span>
              <span className="block text-[11px] tracking-widest uppercase text-slate-500 dark:text-white/60 -mt-0.5">Game • Frontend</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-full p-1 border border-slate-200 dark:border-white/5">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                aria-current={active === l.id ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${active === l.id ? 'bg-slate-900 text-white dark:bg-white dark:text-ink shadow-sm' : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white px-2">LinkedIn</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); go('contact')}} className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-ink px-4 py-2 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-zinc-100 transition">Let's talk</a>
            <ThemeSlider theme={theme} toggle={toggle} size="md" />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeSlider theme={theme} toggle={toggle} size="sm" />
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v=>!v)}
              className="grid place-items-center w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-ink border border-slate-900 dark:border-white shadow-sm"
            >
              <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto md:hidden mx-4 mt-2 rounded-2xl bg-white/95 dark:bg-[#0f111a]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-2 shadow-cardLight dark:shadow-card"
          >
            <div className="grid">
              {links.map(l=>(
                <button key={l.id} onClick={()=>go(l.id)} className={`text-left px-4 py-3 rounded-xl text-sm font-medium ${active===l.id?'bg-slate-900 text-white dark:bg-white dark:text-ink':'text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10'}`}>{l.label}</button>
              ))}
              <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className="px-4 py-3 text-sm text-slate-600 dark:text-white/70">LinkedIn — View profile →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      // active section
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
              ? 'bg-[#0f111a]/70 backdrop-blur-xl border-white/10 shadow-card'
              : 'bg-transparent border-transparent'
          }`}
        >
          <button onClick={() => go('home')} className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full pr-2">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-ink font-bold text-sm tracking-tight">AF</span>
            <span className="hidden sm:block">
              <span className="block font-display font-semibold leading-none text-sm">Ariel Francis</span>
              <span className="block text-[11px] tracking-widest uppercase text-muted -mt-0.5">Game • Frontend</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                aria-current={active === l.id ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${active === l.id ? 'bg-white text-ink' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className="text-sm text-white/70 hover:text-white px-2">LinkedIn</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); go('contact')}} className="rounded-full bg-white text-ink px-4 py-2 text-sm font-semibold hover:bg-zinc-100 transition">Let's talk</a>
          </div>

          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v=>!v)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-full bg-white text-ink"
          >
            <span className="text-lg leading-none">{open ? '×' : '≡'}</span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="pointer-events-auto md:hidden mx-4 mt-2 rounded-2xl bg-[#0f111a]/90 backdrop-blur-xl border border-white/10 p-2 shadow-card"
          >
            <div className="grid">
              {links.map(l=>(
                <button key={l.id} onClick={()=>go(l.id)} className={`text-left px-4 py-3 rounded-xl text-sm font-medium ${active===l.id?'bg-white text-ink':'text-white/80 hover:bg-white/10'}`}>{l.label}</button>
              ))}
              <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className="px-4 py-3 text-sm text-white/70">LinkedIn — View profile →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

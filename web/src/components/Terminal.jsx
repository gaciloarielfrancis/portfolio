import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme.jsx'

const lines = [
  { cmd: 'whoami', out: 'Senior Frontend & Game Developer — Ariel Francis Gacilo' },
  { cmd: 'skills --top', out: 'React • TypeScript • JavaScript • PixiJS • WebGL • GSAP • Node • PHP/Symfony • PostgreSQL' },
  { cmd: 'projects --featured', out: 'Dragon Tiger • Punto Banco • Crypto Crash • Artivora — 15 shipped, 9 games' },
  { cmd: 'experience', out: 'Blueline Active Asia (2021-2024) • SGITR (2016-2021) • Immersive Media (2014-2016)' },
  { cmd: 'contact', out: 'gaciloarielfrancis@gmail.com — LinkedIn / GitHub — Bongabong, PH • Remote' },
]

export default function Terminal() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [showOut, setShowOut] = useState(false)

  useEffect(() => {
    if (idx >= lines.length) return
    const cmd = lines[idx].cmd
    if (typed.length < cmd.length) {
      const t = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), 45)
      return () => clearTimeout(t)
    }
    if (!showOut) {
      const t = setTimeout(() => setShowOut(true), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => { setIdx(i => i + 1); setTyped(''); setShowOut(false) }, 1800)
    return () => clearTimeout(t)
  }, [typed, showOut, idx])

  return (
    <section className={`relative border-t backdrop-blur-sm transition-colors duration-300 ${isLight ? 'bg-white/70 border-slate-200' : 'bg-[#0b0c14]/80 border-white/5'}`}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <div className={`rounded-[20px] overflow-hidden border shadow-card ${isLight ? 'bg-[#0f111a] border-slate-200 shadow-cardLight' : 'bg-[#0f111a] border-white/10'}`}>
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/5 bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-xs text-white/50">ariel@portfolio — zsh — 80×24</span>
            <span className="ml-auto hidden sm:inline font-mono text-xs text-white/40">interactive • try clicking ↓</span>
          </div>
          <div className="p-5 sm:p-8 font-mono text-sm leading-relaxed">
            <div className="space-y-3 min-h-[220px]">
              {lines.slice(0, idx).map(l => <div key={l.cmd}><div className="text-white/90"><span className="text-accent2">$</span> {l.cmd}</div><div className="text-white/60 pl-4">{l.out}</div></div>)}
              {idx < lines.length && <div><div className="text-white/90"><span className="text-accent2">$</span> {typed}<span className="inline-block w-2 h-4 bg-white/80 ml-0.5 translate-y-0.5 animate-pulse" /></div>{showOut && <div className="text-white/60 pl-4">{lines[idx].out}</div>}</div>}
              {idx >= lines.length && <div className="text-emerald-300">$ — Let's build something great together. <span className="text-white/60">Type <a href="#contact" className="underline decoration-white/30 hover:text-white">contact</a> to jump ↓</span></div>}
            </div>
            <div className="mt-6 flex flex-wrap gap-2 font-sans">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-white text-ink px-4 py-2 text-sm font-semibold">$ projects →</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full border border-white/15 text-white px-4 py-2 text-sm">$ contact</button>
              <a href="https://github.com/gaciloarielfrancis" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 text-white/70 px-4 py-2 text-sm">$ github</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

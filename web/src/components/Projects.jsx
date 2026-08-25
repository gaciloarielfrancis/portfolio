import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { projects } from '../data'
import { projectImages } from '../assets'
import { useTheme } from '../hooks/useTheme.jsx'

function TiltCard({ p, onOpen, isLight }) {
  const [style, setStyle] = useState({})
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({ transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)` })
  }
  const onLeave = () => setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0)' })
  const imgSrc = projectImages[p.image] || ''
  return (
    <motion.div layout onMouseMove={onMove} onMouseLeave={onLeave} style={style} className={`group relative rounded-[20px] border overflow-hidden backdrop-blur transition will-change-transform ${isLight ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm' : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/15'}`}>
      <button onClick={() => onOpen(p)} className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[20px]">
        <div className={`aspect-[16/10] relative overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-[#0f111a]'}`}>
          {p.image.endsWith('.svg') ? (
            <div className={`w-full h-full grid place-items-center p-8 ${isLight ? 'bg-gradient-to-br from-slate-50 to-slate-100' : 'bg-gradient-to-br from-[#1a1433] to-[#0f1a2a]'}`}>
              <img src={imgSrc} alt="" loading="lazy" className="w-20 h-20 opacity-80" />
              <span className={`absolute bottom-3 left-3 text-xs font-mono px-2 py-1 rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>{p.category}</span>
            </div>
          ) : (
            <>
              <img src={imgSrc} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
              <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent' : 'bg-gradient-to-t from-black/60 via-black/10 to-transparent'}`} />
              <span className="absolute top-3 left-3 text-xs font-semibold bg-white text-ink px-2.5 py-1 rounded-full shadow-sm">{p.category}</span>
              {p.featured && <span className="absolute top-3 right-3 text-xs font-mono bg-accent text-white px-2.5 py-1 rounded-full">Featured</span>}
            </>
          )}
        </div>
        <div className="p-5">
          <h3 className={`font-display font-semibold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{p.name}</h3>
          <p className={`mt-1.5 text-sm leading-relaxed line-clamp-2 ${isLight ? 'text-slate-600' : 'text-white/65'}`}>{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 5).map(t => <span key={t} className={`text-[11px] font-mono px-2 py-1 rounded-full border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-white/70'}`}>{t}</span>)}
            {p.tech.length > 5 && <span className={`text-[11px] font-mono px-2 py-1 ${isLight ? 'text-slate-400' : 'text-white/50'}`}>+{p.tech.length - 5}</span>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-white/50'}`}>{p.role}</span>
            <span className={`inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>View case <span>→</span></span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

function CaseModal({ project, onClose }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  if (!project) return null
  const imgSrc = projectImages[project.image] || ''
  const features = project.features || (project.category === 'Corporate Platform' ? ["React + Tailwind / MUI design system", "Headless Symfony PHP API", "MySQL content & RBAC", "SEO & Open Graph pipeline"] : project.category === 'Dev Tool' ? ["Vite + React + Tailwind shell", "Canvas / drag-drop engine", "Sprite atlas packing", "One-click export & WebP"] : ["PixiJS rendering & scene graph", "GSAP choreography & RAF batching", "React state shell & deterministic flow", "Webpack atlas & code-split assets"])
  const displayFeatures = features.slice(0, 4)
  const deliveryFocus = project.deliveryFocus || (project.category === 'Corporate Platform' ? 'SEO • responsive • headless Symfony API • MySQL • RBAC • performance' : project.category === 'Dev Tool' ? 'Vite • Canvas API • drag-drop • sprite export • WebP' : '60fps • atlas batching • object pooling • WebP • code-split • certified flow')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-4 md:p-6" aria-modal="true" role="dialog">
      <button aria-label="Close case study" onClick={onClose} className="absolute inset-0 bg-[#05070d]/75 backdrop-blur-[6px]" />
      <motion.div initial={{ y: 14, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 10, scale: 0.98, opacity: 0 }} transition={{ type: 'spring', damping: 26, stiffness: 300 }} className={`relative w-full max-w-[920px] max-h-[90dvh] sm:max-h-[84vh] overflow-hidden rounded-[20px] sm:rounded-[24px] border shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f111a] border-white/10'}`}>
        <button onClick={onClose} aria-label="Close" className={`absolute right-3 top-3 z-20 w-8 h-8 sm:w-9 sm:h-9 grid place-items-center rounded-full transition shadow-lg text-lg leading-none ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-ink hover:bg-zinc-100'}`}>×</button>
        <div className="relative h-[148px] sm:h-[200px] md:h-[220px] shrink-0 overflow-hidden bg-black">
          {project.image.endsWith('.svg') ? <div className={`w-full h-full grid place-items-center ${isLight ? 'bg-gradient-to-br from-slate-50 to-slate-100' : 'bg-gradient-to-br from-[#1a1433] to-[#0f1a2a]'}`}><img src={imgSrc} alt="" className="w-16 h-16 sm:w-20 sm:h-20 opacity-80" /></div> : <img src={imgSrc} alt={project.name} className="w-full h-full object-cover object-center" />}
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-white via-white/60 to-transparent' : 'bg-gradient-to-t from-[#0f111a] via-[#0f111a]/55 to-transparent'}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent hidden sm:block" />
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-ink px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm">{project.category}</span>
              {project.featured && <span className="inline-flex rounded-full bg-accent text-white px-2.5 py-1 text-[11px] font-mono">Featured</span>}
              <span className={`hidden sm:inline-flex text-[11px] font-mono backdrop-blur px-2.5 py-1 rounded-full border ${isLight ? 'bg-white/80 border-slate-200 text-slate-600' : 'bg-white/10 border-white/15 text-white/60'}`}>{project.tech.slice(0, 3).join(' • ')}</span>
            </div>
            <h3 className={`mt-2.5 font-display text-[20px] sm:text-[26px] md:text-[28px] font-bold leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] ${isLight ? 'text-slate-900' : 'text-white'}`}>{project.name}</h3>
            <p className={`mt-1.5 text-[13px] sm:text-sm leading-snug max-w-[620px] line-clamp-2 ${isLight ? 'text-slate-700' : 'text-white/75'}`}>{project.description}</p>
            <p className={`mt-1 text-[11px] font-mono hidden sm:block ${isLight ? 'text-slate-500' : 'text-white/45'}`}>{project.role}</p>
          </div>
        </div>
        <div className={`flex-1 min-h-0 overflow-y-auto sm:overflow-hidden overscroll-contain touch-pan-y sm:touch-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full p-3 sm:p-4 md:p-5 ${isLight ? 'bg-white' : 'bg-[#0f111a]'} ${isLight ? '[&::-webkit-scrollbar-thumb]:bg-slate-200' : '[&::-webkit-scrollbar-thumb]:bg-white/10'}`}>
          <div className="flex flex-col gap-3 sm:gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 shrink-0">
              <div className={`relative rounded-2xl border p-3.5 sm:p-4 overflow-hidden ${isLight ? 'bg-gradient-to-br from-amber-50 to-white border-amber-200' : 'bg-gradient-to-br from-amber-500/[0.08] via-white/[0.03] to-transparent border-white/10'}`}>
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-transparent opacity-80" />
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 grid place-items-center rounded-xl border text-[13px] shrink-0 ${isLight ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-amber-500/15 border-amber-500/20 text-amber-300'}`}>◉</span>
                  <div><div className={`text-[11px] tracking-[0.14em] uppercase font-mono font-semibold ${isLight ? 'text-amber-700' : 'text-amber-300/90'}`}>Problem</div><div className={`text-[11px] font-mono hidden sm:block ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Constraint & context</div></div>
                </div>
                <p className={`mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.5] ${isLight ? 'text-slate-700' : 'text-white/80'}`}>{project.challenge || (project.category === 'Corporate Platform' ? "Needed a fast, SEO-visible business presence with editable content and a maintainable design system without heavy CMS overhead." : project.category === 'Dev Tool' ? "Needed a zero-backend browser tool that turns images/GIFs into optimized sprite sheets for game pipelines." : "Deliver a polished, certifiable game experience that feels native on low-end mobile while keeping load time and jank under tight budget.")}</p>
              </div>
              <div className={`relative rounded-2xl border p-3.5 sm:p-4 overflow-hidden ${isLight ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200' : 'bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.03] to-transparent border-white/10'}`}>
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent opacity-80" />
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 grid place-items-center rounded-xl border text-[13px] shrink-0 ${isLight ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-300'}`}>◆</span>
                  <div><div className={`text-[11px] tracking-[0.14em] uppercase font-mono font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-300/90'}`}>Solution</div><div className={`text-[11px] font-mono hidden sm:block ${isLight ? 'text-slate-500' : 'text-white/40'}`}>What I built</div></div>
                </div>
                <p className={`mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.5] ${isLight ? 'text-slate-700' : 'text-white/80'}`}>{project.solution || (project.category === 'Corporate Platform' ? `${project.description} — delivered as React/Tailwind (MUI) frontend on headless Symfony with MySQL, OG/SEO and Lighthouse-tuned performance.` : project.category === 'Dev Tool' ? `${project.description} — client-side Canvas processing, drag-drop and instant CSS/Atlas export with no server.` : `${project.description} — deterministic state machine, pooled sprites and RAF-batched animation for 60fps on mid-tier Android.`)}</p>
              </div>
            </div>
            <div className={`relative rounded-2xl border overflow-hidden flex flex-col ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.04] border-white/10'}`}>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 via-accent to-cyan-400 opacity-80" />
              <div className="p-3.5 sm:p-4 pb-2 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 grid place-items-center rounded-xl border text-[13px] shrink-0 ${isLight ? 'bg-violet-100 border-violet-200 text-violet-700' : 'bg-violet-500/15 border-violet-500/20 text-violet-300'}`}>⬡</span>
                  <div><div className={`text-[11px] tracking-[0.14em] uppercase font-mono font-semibold ${isLight ? 'text-violet-700' : 'text-violet-300/90'}`}>Technical Implementation</div><div className={`text-[11px] font-mono hidden sm:block ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Architecture • decisions • stack</div></div>
                  <span className={`ml-auto hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full font-semibold ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>{project.tech.length} stack</span>
                </div>
              </div>
              <div className="px-3.5 sm:px-4 pb-3 sm:pb-4 grid grid-cols-1 sm:grid-cols-[1.15fr_0.85fr] gap-3 sm:gap-4">
                <ul className="grid grid-cols-1 gap-2 content-start">
                  {displayFeatures.map((f, i) => <li key={f} className={`flex gap-2.5 items-start rounded-xl border px-3 py-2.5 ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/5'}`}><span className="mt-0.5 w-5 h-5 grid place-items-center rounded-full bg-accent/15 border border-accent/20 text-accent text-[10px] font-bold shrink-0">{i + 1}</span><span className={`text-[13px] leading-snug ${isLight ? 'text-slate-700' : 'text-white/80'}`}>{f}</span></li>)}
                </ul>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5 content-start">
                    {project.tech.map(t => <span key={t} className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium leading-none border shadow-sm ${isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white border-white/0 text-ink'}`}>{t}</span>)}
                  </div>
                  <div className={`rounded-xl border p-3 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0a0a0f]/60 border-white/5'}`}>
                    <div className={`text-[11px] font-mono tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-white/35'}`}>Delivery focus</div>
                    <div className={`mt-1 text-[12px] leading-snug ${isLight ? 'text-slate-600' : 'text-white/65'}`}>{deliveryFocus}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`shrink-0 p-3 sm:p-4 md:p-5 pt-3 sm:pt-3 border-t flex flex-wrap gap-2 sm:gap-3 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0f111a] border-white/5'}`}>
          <a href={project.link} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold transition shadow-md ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-ink hover:bg-zinc-100'}`}>Open live demo <span aria-hidden className="ml-1.5">↗</span></a>
          <button onClick={onClose} className={`inline-flex items-center justify-center rounded-full border px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium transition ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-white/15 bg-white/5 backdrop-blur text-white hover:bg-white/10 hover:border-white/20'}`}>Close</button>
          <span className={`hidden sm:inline-flex items-center text-[11px] font-mono ml-auto ${isLight ? 'text-slate-400' : 'text-white/35'}`}>Esc to close • scroll on mobile</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const cats = ['All', 'Featured', 'Casino Game', 'Lottery', 'Corporate Platform', 'Dev Tool']
  const list = projects.filter(p => { if (filter === 'All') return true; if (filter === 'Featured') return p.featured; if (filter === 'Casino Game') return p.category.includes('Casino') || p.category === 'Real-time Game'; return p.category === filter })
  return (
    <section id="projects" className={`relative border-t transition-colors duration-300 ${isLight ? 'bg-[#f8fafc] border-slate-200' : 'bg-[#0b0c14] border-white/5'}`}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Featured Projects — 13 shipped</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className={`mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>Work that demonstrates<br className="hidden sm:block" /> engineering thinking.</h2>
            <p className={`max-w-[420px] ${isLight ? 'text-slate-600' : 'text-white/65'}`}>Hover for depth • click for case study. Staging links require vendor auth; screenshots preserved locally.</p>
          </div>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter===c ? (isLight ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-ink border-white') : (isLight ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white')}`}>{c}</button>)}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {list.map(p => <TiltCard key={p.slug} p={p} onOpen={setSelected} isLight={isLight} />)}
        </div>
      </div>
      <AnimatePresence>{selected && <CaseModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}

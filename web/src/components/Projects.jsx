import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { projects } from '../data'
import { projectImages } from '../assets'

function TiltCard({ p, onOpen }) {
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`,
    })
  }
  const onLeave = () => setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0)' })

  const imgSrc = projectImages[p.image] || ''

  return (
    <motion.div
      layout
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className="group relative rounded-[20px] bg-white/[0.04] border border-white/10 overflow-hidden backdrop-blur hover:bg-white/[0.06] hover:border-white/15 transition will-change-transform"
    >
      <button onClick={() => onOpen(p)} className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[20px]">
        <div className="aspect-[16/10] relative overflow-hidden bg-[#0f111a]">
          {p.image.endsWith('.svg') ? (
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#1a1433] to-[#0f1a2a] p-8">
              <img src={imgSrc} alt="" loading="lazy" className="w-20 h-20 opacity-80" />
              <span className="absolute bottom-3 left-3 text-xs font-mono bg-white text-ink px-2 py-1 rounded-full">{p.category}</span>
            </div>
          ) : (
            <>
              <img src={imgSrc} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 text-xs font-semibold bg-white text-ink px-2.5 py-1 rounded-full">{p.category}</span>
              {p.featured && <span className="absolute top-3 right-3 text-xs font-mono bg-accent text-white px-2.5 py-1 rounded-full">Featured</span>}
            </>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display font-semibold text-white leading-tight">{p.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/65 line-clamp-2">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 5).map(t => (
              <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</span>
            ))}
            {p.tech.length > 5 && <span className="text-[11px] font-mono px-2 py-1 text-white/50">+{p.tech.length - 5}</span>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-white/50">{p.role}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">View case <span>→</span></span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

function CaseModal({ project, onClose }) {
  if (!project) return null
  const imgSrc = projectImages[project.image] || ''
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-6">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ y: 16, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ type: 'spring', damping: 24, stiffness: 260 }} className="relative w-full max-w-[900px] max-h-[90vh] overflow-auto rounded-[20px] bg-[#0f111a] border border-white/10 shadow-card">
        <button onClick={onClose} className="absolute right-3 top-3 z-10 w-9 h-9 grid place-items-center rounded-full bg-white text-ink hover:bg-zinc-100">×</button>
        <div className="aspect-[16/8] relative overflow-hidden bg-black">
          {project.image.endsWith('.svg') ? (
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#1a1433] to-[#0f1a2a]"><img src={imgSrc} alt="" className="w-24 h-24 opacity-80" /></div>
          ) : (
            <img src={imgSrc} alt={project.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-3 py-1 text-xs font-semibold">{project.category}</div>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white">{project.name}</h3>
            <p className="mt-2 text-white/70 max-w-[640px]">{project.description}</p>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="text-xs tracking-widest uppercase font-mono text-accent2">Problem</div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{project.challenge || "Deliver a polished, performant experience that feels native on low-end mobile while meeting certified game flow requirements."}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="text-xs tracking-widest uppercase font-mono text-accent2">Solution</div>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{project.solution || project.description + " — built with a deterministic state machine, pooled sprites and RAF-batched animation."}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="text-xs tracking-widest uppercase font-mono text-accent2">Technical Implementation</div>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-white/75 list-disc list-inside">
              {(project.features || ["PixiJS rendering", "GSAP choreography", "React state shell", "Webpack code-split & asset atlas"]).map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-white text-ink text-xs font-medium">{t}</span>)}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={project.link} target="_blank" rel="noreferrer" className="rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-zinc-100">Open live demo →</a>
            <button onClick={onClose} className="rounded-full border border-white/15 text-white px-6 py-3 text-sm">Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const cats = ['All', 'Featured', 'Casino Game', 'Lottery', 'Corporate Platform', 'Dev Tool']
  const list = projects.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Featured') return p.featured
    if (filter === 'Casino Game') return p.category.includes('Casino') || p.category === 'Real-time Game'
    return p.category === filter
  })

  return (
    <section id="projects" className="relative bg-[#0b0c14] border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Featured Projects — 13 shipped</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none text-white">Work that demonstrates<br className="hidden sm:block" /> engineering thinking.</h2>
            <p className="max-w-[420px] text-white/65">Hover for depth • click for case study. Staging links require vendor auth; screenshots preserved locally.</p>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter===c ? 'bg-white text-ink border-white' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {list.map(p => (
            <TiltCard key={p.slug} p={p} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>{selected && <CaseModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}

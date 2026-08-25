import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { profile, stats } from '../data'
import { profile as profileImg } from '../assets'

const WorkstationScene = lazy(() => import('./scene/WorkstationScene'))

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(m.matches)
    const onChange = () => setReduced(m.matches)
    m.addEventListener?.('change', onChange)

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) setReduced(true) // simplify on mobile per spec

    let raf = 0
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        setMouse({ x, y })
      })
    }
    if (!reduced && !isMobile) window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      m.removeEventListener?.('change', onChange)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="home" className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-ink">
        <div className="absolute inset-0 bg-gradient-to-b from-[#120f2a] via-ink to-ink" />
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full blur-[120px] opacity-20" style={{ background: 'radial-gradient(circle, #7c5cff 0%, transparent 70%)' }} />
        <div className="absolute top-40 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15" style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 pt-28 sm:pt-32 pb-10 sm:pb-16">
        {/* top badge */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          <span className="text-xs font-mono tracking-widest uppercase text-white/80">Available for senior & lead roles</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="hidden sm:inline text-xs text-white/60">Remote • APAC / EU overlap</span>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
          {/* copy */}
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="font-mono text-sm tracking-widest uppercase text-accent2">Senior Frontend & Game Developer</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-3 font-display font-bold leading-[0.9] tracking-tight text-[40px] sm:text-[56px] lg:text-[64px]">
              <span className="block text-white">Ariel Francis</span>
              <span className="block bg-gradient-to-r from-[#7c5cff] via-[#22d3ee] to-[#a78bfa] bg-clip-text text-transparent">Gacilo</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 max-w-[560px] text-[17px] sm:text-lg leading-relaxed text-white/70">
              {profile.tagline} I architect fast, reliable interfaces and real-time game systems that stay smooth at 60fps — from React design systems to PixiJS/WebGL pipelines.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-zinc-100 transition shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                View My Work <span aria-hidden>→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 text-white px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/15 transition">
                Contact Me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-transparent border border-white/10 text-white/80 px-5 py-3 text-sm font-medium hover:text-white hover:border-white/20 transition">LinkedIn</a>
              <a href={`https://${profile.github.replace('https://','')}`} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-transparent border border-white/10 text-white/80 px-5 py-3 text-sm font-medium hover:text-white hover:border-white/20 transition">GitHub</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">React • TypeScript</span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">PixiJS • WebGL</span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">GSAP • 60fps</span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70">PHP • Symfony • Node</span>
            </motion.div>

            {/* stats strip */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(s => (
                <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-bold leading-none text-white">{s.value}</div>
                  <div className="mt-1 text-xs font-semibold tracking-wide uppercase text-white">{s.label}</div>
                  <div className="text-xs text-white/60">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22,1,0.36,1] }}
            className="relative lg:h-[560px] h-[380px] sm:h-[460px]"
            style={{ transform: reduced ? undefined : `perspective(1200px) rotateY(${mouse.x * -2}deg) rotateX(${mouse.y * 1.5}deg)` }}
          >
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#7c5cff]/20 via-transparent to-[#22d3ee]/20 blur-xl" />
            <div className="relative h-full">
              <Suspense fallback={
                <div className="w-full h-full rounded-[24px] bg-white/5 border border-white/10 animate-pulse grid place-items-center text-white/60 font-mono text-sm">Loading 3D workspace…</div>
              }>
                <WorkstationScene mouse={mouse} reduced={reduced} />
              </Suspense>
            </div>

            {/* floating badges */}
            <div className="pointer-events-none absolute -left-2 sm:left-0 top-6 hidden sm:flex items-center gap-2 rounded-full bg-white text-ink px-3 py-2 shadow-card text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Production games shipped
            </div>
            <div className="pointer-events-none absolute -right-2 sm:right-2 bottom-20 hidden sm:flex items-center gap-2 rounded-full bg-[#0f111a] border border-white/10 text-white px-3 py-2 shadow-card text-xs font-mono">
              <span className="text-white/60">Stack</span> React • PixiJS • GSAP
            </div>
          </motion.div>
        </div>

        {/* recruiter 10s strip */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between backdrop-blur">
          <div className="flex items-center gap-3">
            <img src={profileImg} alt="Ariel Francis Gacilo" loading="lazy" className="w-10 h-10 rounded-full object-cover border border-white/15 bg-white/10 grayscale" />
            <div>
              <div className="text-sm font-semibold text-white">10s recruiter scan</div>
              <div className="text-xs text-white/60">Senior Frontend & Game Dev • React/TypeScript • PixiJS/WebGL • 9 production games • Available now</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="#projects" className="rounded-full bg-white text-ink px-4 py-2 text-sm font-semibold">See projects</a>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-white/15 text-white px-4 py-2 text-sm">Email →</a>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiVuedotjs, SiRedux, SiNextdotjs, SiVite, SiWebpack,
  SiMui, SiBootstrap, SiJquery, SiIonic,
  SiGsap, SiBabylondotjs, SiWebgl,
  SiNodedotjs, SiPhp, SiSymfony, SiPython, SiPostgresql, SiMysql, SiMongodb, SiFirebase,
  SiAxios, SiGit, SiGoogle, SiLighthouse, SiAppstore
} from 'react-icons/si'
import pixiIcon from '../assets/tech/pixijs.png'
import { Reveal } from './Reveal'
import { skillGroups } from '../data'
import { useTheme } from '../hooks/useTheme.jsx'

const iconMap = {
  'React': { Icon: SiReact, color: '#61DAFB' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
  'HTML5': { Icon: SiHtml5, color: '#E34F26' },
  'CSS3': { Icon: SiCss, color: '#1572B6' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Vue.js': { Icon: SiVuedotjs, color: '#4FC08D' },
  'Redux': { Icon: SiRedux, color: '#764ABC' },
  'Next.js': { Icon: SiNextdotjs, color: '#FFFFFF' },
  'Vite': { Icon: SiVite, color: '#646CFF' },
  'Webpack': { Icon: SiWebpack, color: '#8DD6F9' },
  'Material UI': { Icon: SiMui, color: '#007FFF' },
  'Bootstrap': { Icon: SiBootstrap, color: '#7952B3' },
  'jQuery': { Icon: SiJquery, color: '#0769AD' },
  'Ionic': { Icon: SiIonic, color: '#3880FF' },
  'PixiJs': { img: pixiIcon },
  'Phaser': { Icon: SiWebgl, color: '#76B900' },
  'GSAP': { Icon: SiGsap, color: '#88CE02' },
  'React Spring': { Icon: SiReact, color: '#FF4154' },
  'Babylon.js': { Icon: SiBabylondotjs, color: '#BB464B' },
  'WebGL / Canvas': { Icon: SiWebgl, color: '#990000' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933' },
  'PHP': { Icon: SiPhp, color: '#777BB4' },
  'Symfony': { Icon: SiSymfony, color: '#FFFFFF' },
  'Python': { Icon: SiPython, color: '#3776AB' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1' },
  'MySQL/MySQLi': { Icon: SiMysql, color: '#4479A1' },
  'MySQL / MySQLi': { Icon: SiMysql, color: '#4479A1' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'Firebase': { Icon: SiFirebase, color: '#FFCA28' },
  'Axios': { Icon: SiAxios, color: '#5A29E4' },
  'Git & GitHub': { Icon: SiGit, color: '#F05032' },
  'SEO / Open Graph': { Icon: SiGoogle, color: '#4285F4' },
  'Performance Opt.': { Icon: SiLighthouse, color: '#F44B21' },
  'App Store Deploy': { Icon: SiAppstore, color: '#0A84FF' },
}

function TechIcon({ name }) {
  const entry = iconMap[name] || {}
  if (entry.img) return <img src={entry.img} alt="" aria-hidden="true" loading="lazy" className="w-7 h-7 object-contain" />
  if (entry.Icon) {
    const Icon = entry.Icon
    return <Icon aria-hidden="true" className="w-[22px] h-[22px] shrink-0" style={{ color: entry.color }} />
  }
  return <span className="text-[11px] font-bold tracking-tight text-white dark:text-white text-slate-700">{name.slice(0, 2).toUpperCase()}</span>
}

const groupMeta = {
  Frontend: { desc: 'Design systems, UI architecture and performant interfaces.', hint: 'React • TypeScript • Tailwind' },
  'Game Development': { desc: 'Real-time rendering, animation and game UI at 60fps.', hint: 'PixiJS • GSAP • WebGL' },
  'Backend & Data': { desc: 'APIs, data modeling and production infra.', hint: 'Node • PHP/Symfony • Postgres' },
  'Tooling & Infra': { desc: 'Delivery, optimization and store pipelines.', hint: 'Vite • Git • SEO' },
}

function SkillCard({ item, accent, index, isLight }) {
  const pct = item.level * 10
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.016, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-2xl border p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${isLight ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm' : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className={`w-[42px] h-[42px] grid place-items-center rounded-xl border transition ${isLight ? 'bg-slate-50 border-slate-200 group-hover:bg-white' : 'bg-white/[0.06] border-white/10 group-hover:bg-white/[0.08] group-hover:border-white/15'}`}>
          <TechIcon name={item.n} />
        </div>
        <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full border transition ${isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-white/5 border-white/10 text-white/55 group-hover:text-white/75'}`}>{item.years}y</span>
      </div>
      <div className="mt-3">
        <div className={`text-[13.5px] font-semibold leading-tight truncate pr-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.n}</div>
        <div className={`mt-1 text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-white/45'}`}>{pct}% · {item.level}/10</div>
      </div>
      <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, ${accent}cc)`, boxShadow: `0 0 10px ${accent}55` }} />
      </div>
      <div className={`pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent transition ${isLight ? 'group-hover:via-slate-200' : 'group-hover:via-white/10'}`} />
    </motion.div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [active, setActive] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const group = skillGroups[active]
  const meta = groupMeta[group.title] || {}
  const VISIBLE = 8
  const items = showAll ? group.items : group.items.slice(0, VISIBLE)
  const hasMore = group.items.length > VISIBLE

  return (
    <section id="skills" className={`relative border-t overflow-hidden backdrop-blur-sm transition-colors duration-300 ${isLight ? 'bg-[#f8fafc]/70 border-slate-200' : 'bg-ink/80 border-white/5'}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full blur-[120px] opacity-[0.08]" style={{ background: `radial-gradient(circle, ${group.accent} 0%, transparent 70%)` }} />
        <div className={`absolute top-40 -right-32 w-[560px] h-[560px] rounded-full blur-[120px] ${isLight ? 'opacity-[0.04]' : 'opacity-[0.06]'}`} style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }} />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Skills • Technology Ecosystem</p>
          <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className={`font-display text-[30px] sm:text-[40px] font-bold leading-none tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>A focused,<br className="hidden sm:block" /> production-proven stack.</h2>
            <p className={`max-w-[520px] text-sm sm:text-[15px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/60'}`}>Only tech from shipped work — no buzzword filler. Explore by domain. Each card now shows the official brand icon.</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div role="tablist" aria-label="Skill categories" className={`flex gap-2 p-1 rounded-full border backdrop-blur overflow-x-auto scrollbar-none max-w-full ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.04] border-white/10'}`}>
              {skillGroups.map((g, i) => {
                const isActive = i === active
                return (
                  <button key={g.title} role="tab" aria-selected={isActive} onClick={() => { setActive(i); setShowAll(false) }}
                    className={`relative whitespace-nowrap inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${isActive ? (isLight ? 'bg-slate-900 text-white shadow-sm' : 'text-ink bg-white shadow-sm') : (isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-white/65 hover:text-white hover:bg-white/10')}`}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: g.accent, boxShadow: isActive ? `0 0 10px ${g.accent}66` : `0 0 10px ${g.accent}40`, opacity: isActive ? 1 : 0.9 }} />
                    {g.title}
                    <span className={`text-xs font-mono px-1.5 py-0.5 rounded-full ${isActive ? (isLight ? 'bg-white/15 text-white/70' : 'bg-ink/10 text-ink/60') : (isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-white/45')}`}>{g.items.length}</span>
                  </button>
                )
              })}
            </div>
            <div className={`hidden sm:flex items-center gap-2 ml-auto text-xs font-mono ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
              <span className={`w-px h-4 ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />27 technologies · official icons
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={group.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className={`mt-8 rounded-[20px] border backdrop-blur p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.04] border-white/10'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-10 h-10 grid place-items-center rounded-2xl font-bold text-sm ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`} style={{ boxShadow: `0 8px 24px ${group.accent}22` }}>{group.title.slice(0, 2).toUpperCase()}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-display font-semibold leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>{group.title}</h3>
                  <span className={`hidden sm:inline-flex w-1 h-1 rounded-full ${isLight ? 'bg-slate-300' : 'bg-white/30'}`} />
                  <span className={`hidden sm:inline text-xs font-mono ${isLight ? 'text-slate-500' : 'text-white/50'}`}>{meta.hint}</span>
                </div>
                <p className={`text-sm leading-tight mt-0.5 truncate sm:text-clip ${isLight ? 'text-slate-600' : 'text-white/60'}`}>{meta.desc}</p>
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-2 sm:gap-3 text-xs font-mono shrink-0">
              <span className={`px-3 py-1.5 rounded-full font-semibold ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>{group.items.length} techs</span>
              <span className={`hidden sm:inline-flex px-3 py-1.5 rounded-full border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-white/60'}`}>{group.title === 'Frontend' ? 'UI Architecture' : group.title === 'Game Development' ? '60fps · Canvas/WebGL' : group.title === 'Backend & Data' ? 'APIs · Infra' : 'Shipping'}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={`${group.title}-${showAll ? 'all' : 'compact'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {items.map((item, idx) => <SkillCard key={item.n} item={item} accent={group.accent} index={idx} isLight={isLight} />)}
          </motion.div>
        </AnimatePresence>

        {hasMore && (
          <div className="mt-5 flex justify-center">
            <button onClick={() => setShowAll(v => !v)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition backdrop-blur ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/15'}`}>
              {showAll ? <>Show less <span aria-hidden>↑</span></> : <>Show all {group.items.length} · +{group.items.length - VISIBLE} more <span aria-hidden>↓</span></>}
            </button>
          </div>
        )}

        <Reveal delay={0.08}>
          <div className="mt-8 grid lg:grid-cols-[1.35fr_0.65fr] gap-3">
            <div className={`rounded-2xl border p-4 sm:p-5 flex items-center gap-4 backdrop-blur ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
              <div className={`hidden sm:grid place-items-center w-10 h-10 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-400' : 'bg-white/5 border-white/10 text-white/60'}`}>◈</div>
              <div className="min-w-0">
                <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>How I assess proficiency</div>
                <div className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/55'}`}>10 = daily driver / production owner · 8–9 = strong · 7 = working knowledge. Years = shipped experience, not tutorials.</div>
              </div>
            </div>
            <div className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-center ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>
              <div className="text-sm font-semibold leading-none">Daily toolchain</div>
              <div className={`mt-1.5 text-sm leading-snug ${isLight ? 'text-white/70' : 'text-ink/70'}`}>Vite · Webpack · Axios · Git/GitHub · TinyPNG/WebP · SEO/OG · Store deploys</div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-start">
          {skillGroups.map((g, i) => (
            <button key={`jump-${g.title}`} onClick={() => { setActive(i); setShowAll(false); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition ${i === active ? (isLight ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-ink border-white') : (isLight ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50' : 'bg-white/5 text-white/55 border-white/10 hover:bg-white/10 hover:text-white/80')}`}>{g.title} →</button>
          ))}
        </div>
      </div>
    </section>
  )
}

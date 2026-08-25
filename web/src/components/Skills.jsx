import { Reveal } from './Reveal'
import { skillGroups } from '../data'

function Level({ level }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className={`h-1.5 flex-1 rounded-full ${i < level ? 'bg-white' : 'bg-white/15'}`} />
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-ink border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(800px 400px at 20% 20%, rgba(124,92,255,0.15), transparent 60%)' }} />
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Skills • Technology Ecosystem</p>
          <h2 className="mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none text-white">A focused, production-proven stack.</h2>
          <p className="mt-3 max-w-[720px] text-white/65">Only technologies present in my portfolio & shipped work. Grouped by domain, sized by depth. No buzzword stuffing.</p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          {skillGroups.map((g, idx) => (
            <Reveal key={g.title} delay={idx * 0.05}>
              <div className="rounded-[20px] bg-white/[0.04] border border-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.accent, boxShadow: `0 0 14px ${g.accent}55` }} />
                  <h3 className="font-display font-semibold text-white">{g.title}</h3>
                  <span className="ml-auto text-xs font-mono text-white/50">{g.items.length} techs</span>
                </div>
                <div className="mt-5 grid gap-3">
                  {g.items.map(item => (
                    <div key={item.n} className="group flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5 hover:bg-white/[0.06] transition">
                      <div className="w-8 h-8 grid place-items-center rounded-lg bg-white text-ink text-[11px] font-bold">{item.n.slice(0,2).toUpperCase()}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <div className="text-sm font-medium text-white truncate">{item.n}</div>
                          <div className="text-[11px] font-mono text-white/50">{item.years}y • {item.level}/10</div>
                        </div>
                        <div className="mt-1.5"><Level level={item.level} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-6 rounded-2xl bg-white text-ink p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <div className="font-semibold">Toolchain I ship with daily</div>
            <div className="text-sm text-ink/70">Vite • Webpack • Axios • Git/GitHub • Performance budgets • TinyPNG/WebP • SEO/OG • Store deploys</div>
          </div>
          <div className="text-xs font-mono bg-ink text-white px-3 py-1.5 rounded-full">27 technologies • audited for relevance</div>
        </Reveal>
      </div>
    </section>
  )
}

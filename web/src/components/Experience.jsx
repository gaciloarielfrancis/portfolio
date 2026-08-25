import { Reveal } from './Reveal'
import { experience, devRoles } from '../data'
import { useTheme } from '../hooks/useTheme.jsx'

export default function Experience() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <section id="experience" className={`relative border-t backdrop-blur-sm transition-colors duration-300 ${isLight ? 'bg-[#f8fafc]/70 border-slate-200' : 'bg-ink/80 border-white/5'}`}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Experience • Timeline</p>
          <h2 className={`mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>A decade of shipping.</h2>
        </Reveal>

        <div className="mt-10 relative">
          <div className={`absolute left-4 sm:left-1/2 top-0 bottom-0 w-px hidden sm:block ${isLight ? 'bg-gradient-to-b from-accent/40 via-slate-200 to-transparent' : 'bg-gradient-to-b from-accent/40 via-white/10 to-transparent'}`} />
          <div className={`absolute left-4 top-0 bottom-0 w-px sm:hidden ${isLight ? 'bg-slate-200' : 'bg-white/10'}`} />

          <div className="space-y-6">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.06}>
                <div className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-4 shadow-glow hidden sm:grid place-items-center ${isLight ? 'bg-slate-900 border-[#f8fafc]' : 'bg-white border-ink'}`} style={{ top: 24 }} />
                  <div className={`absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full border-2 sm:hidden ${isLight ? 'bg-slate-900 border-[#f8fafc]' : 'bg-white border-ink'}`} style={{ top: 20 }} />

                  <div className={`flex-1 ${i % 2 === 1 ? 'sm:text-right' : ''} pl-10 sm:pl-0`}>
                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono border ${e.current ? 'bg-emerald-500 text-white border-emerald-400' : (isLight ? 'bg-white text-slate-600 border-slate-200' : 'bg-white/5 text-white/70 border-white/10')}`}>
                      <span className={`w-2 h-2 rounded-full ${e.current ? 'bg-white' : 'bg-accent2'}`} /> {e.period}
                    </div>
                    <h3 className={`mt-3 font-display font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{e.company}</h3>
                    <p className="text-sm text-accent2 font-medium">{e.role}</p>
                  </div>

                  <div className="flex-1 pl-10 sm:pl-0">
                    <div className={`rounded-[16px] border p-5 backdrop-blur ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/[0.04] border-white/10'}`}>
                      <ul className={`space-y-2 text-sm leading-relaxed list-disc list-inside ${isLight ? 'text-slate-600' : 'text-white/75'}`}>
                        {e.highlights.map(h => <li key={h}>{h}</li>)}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {e.stack.map(s => <span key={s} className={`text-xs px-2 py-1 rounded-full border font-mono ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-white/60'}`}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className={`mt-10 rounded-[20px] border p-6 sm:p-8 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/[0.04] border-white/10'}`}>
          <h3 className={`font-display font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>What I do on every project</h3>
          <ul className={`mt-4 grid sm:grid-cols-2 gap-2 text-sm ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
            {devRoles.map(r => <li key={r} className="flex gap-2"><span className="text-accent2">•</span><span>{r}</span></li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

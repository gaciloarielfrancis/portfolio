import { Reveal } from './Reveal'
import { aboutCards } from '../data'
import { useTheme } from '../hooks/useTheme.jsx'

export default function About() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <section id="about" className={`relative border-t backdrop-blur-sm transition-colors duration-300 ${isLight ? 'bg-white/70 border-slate-200' : 'bg-[#0b0c14]/80 border-white/5'}`}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">About Me</p>
          <h2 className={`mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Engineering interactive<br className="hidden sm:block" /> experiences that ship.</h2>
          <p className={`mt-4 max-w-[720px] text-[17px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/65'}`}>
            I’m a senior frontend & game developer based in the Philippines, working remotely with product and game teams across APAC. I focus on performance, architecture and UX — building interfaces that are fast, maintainable and delightful at 60fps.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {aboutCards.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.06}>
              <div className={`group relative rounded-[20px] border p-6 sm:p-7 backdrop-blur transition ${isLight ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm' : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.06] hover:border-white/15'}`}>
                <div className={`absolute right-6 top-6 w-8 h-8 grid place-items-center rounded-full border text-[13px] transition ${isLight ? 'bg-slate-50 border-slate-200 text-slate-500 group-hover:text-slate-700' : 'bg-white/5 border-white/10 text-white/70 group-hover:text-white'}`}>{c.icon}</div>
                <h3 className={`font-display font-semibold pr-10 ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.k}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/65'}`}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className={`mt-8 rounded-[20px] border p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between ${isLight ? 'bg-gradient-to-br from-[#eef2ff] to-white border-slate-200' : 'bg-gradient-to-br from-[#1a1433] to-[#0f1a2a] border-white/10'}`}>
          <div>
            <div className={`font-mono text-xs tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Philosophy</div>
            <p className={`mt-2 max-w-[640px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-white'}`}>Ship small, measure, iterate. Optimize for clarity, performance and team velocity. Prefer simple, well-tested abstractions over clever abstractions.</p>
          </div>
          <div className={`flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>Lead frontend • Mentor • Owner</div>
        </Reveal>
      </div>
    </section>
  )
}

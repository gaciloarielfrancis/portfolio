import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { aboutCards } from '../data'

export default function About() {
  return (
    <section id="about" className="relative bg-[#0b0c14] border-t border-white/5">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">About Me</p>
          <h2 className="mt-3 font-display text-[30px] sm:text-[40px] font-bold leading-none tracking-tight text-white">Engineering interactive<br className="hidden sm:block" /> experiences that ship.</h2>
          <p className="mt-4 max-w-[720px] text-[17px] leading-relaxed text-white/65">
            I’m a senior frontend & game developer based in the Philippines, working remotely with product and game teams across APAC. I focus on performance, architecture and UX — building interfaces that are fast, maintainable and delightful at 60fps.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {aboutCards.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.06}>
              <div className="group relative rounded-[20px] bg-white/[0.04] border border-white/10 p-6 sm:p-7 backdrop-blur hover:bg-white/[0.06] hover:border-white/15 transition">
                <div className="absolute right-6 top-6 w-8 h-8 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-white transition">{c.icon}</div>
                <h3 className="font-display font-semibold text-white pr-10">{c.k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 rounded-[20px] bg-gradient-to-br from-[#1a1433] to-[#0f1a2a] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-white/60">Philosophy</div>
            <p className="mt-2 max-w-[640px] text-white leading-relaxed">Ship small, measure, iterate. Optimize for clarity, performance and team velocity. Prefer simple, well-tested abstractions over clever abstractions.</p>
          </div>
          <div className="flex-shrink-0 rounded-full bg-white text-ink px-5 py-2.5 text-sm font-semibold">Lead frontend • Mentor • Owner</div>
        </Reveal>
      </div>
    </section>
  )
}

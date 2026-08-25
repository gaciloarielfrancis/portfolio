import { profile } from '../data'
import { Reveal } from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c14] via-ink to-[#0b0c14]" />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(700px 400px at 50% 0%, rgba(124,92,255,0.25), transparent 60%)' }} />
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Contact</p>
          <h2 className="mt-3 font-display text-[34px] sm:text-[48px] font-bold leading-none tracking-tight text-white">Have a project in mind?<br /><span className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">Let's build something great.</span></h2>
          <p className="mt-4 max-w-[640px] text-white/65">I’m open to senior/lead frontend and game roles, freelance platforms and product collaborations. Fast response on email & LinkedIn.</p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <Reveal>
            <div className="rounded-[20px] bg-white text-ink p-6 sm:p-8 shadow-card">
              <h3 className="font-display font-semibold text-lg">Get in touch</h3>
              <div className="mt-6 space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 grid place-items-center rounded-full bg-ink text-white">✉</span>
                  <span><span className="block text-xs tracking-widest uppercase font-mono text-ink/60">Email</span><span className="block font-medium group-hover:underline">{profile.email}</span></span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <span className="w-11 h-11 grid place-items-center rounded-full bg-ink text-white">in</span>
                  <span><span className="block text-xs tracking-widest uppercase font-mono text-ink/60">LinkedIn</span><span className="block font-medium group-hover:underline">linkedin.com/in/ariel-francis-gacilo</span></span>
                </a>
                <a href={`https://github.com/gaciloarielfrancis`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <span className="w-11 h-11 grid place-items-center rounded-full bg-ink text-white">GH</span>
                  <span><span className="block text-xs tracking-widest uppercase font-mono text-ink/60">GitHub</span><span className="block font-medium group-hover:underline">github.com/gaciloarielfrancis</span></span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 grid place-items-center rounded-full bg-ink text-white">◉</span>
                  <span><span className="block text-xs tracking-widest uppercase font-mono text-ink/60">Location</span><span className="block font-medium">{profile.location}</span></span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a href={`mailto:${profile.email}`} className="rounded-full bg-ink text-white text-center px-5 py-3 text-sm font-semibold hover:bg-black transition">Email me</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-ink/10 text-center px-5 py-3 text-sm font-semibold hover:bg-zinc-50 transition">View LinkedIn</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={(e) => { e.preventDefault(); const d=new FormData(e.currentTarget); window.location.href=`mailto:${profile.email}?subject=Portfolio inquiry — ${d.get('name')}&body=${encodeURIComponent(d.get('message')+'\n\nFrom: '+d.get('name')+' <'+d.get('email')+'>')}` }} className="rounded-[20px] bg-white/[0.04] border border-white/10 p-6 sm:p-8 backdrop-blur">
              <h3 className="font-semibold text-white">Send a message</h3>
              <p className="text-sm text-white/60">No backend — opens your email client. Best for quick reach-outs.</p>
              <div className="mt-6 grid gap-4">
                <label className="grid gap-1.5">
                  <span className="text-xs font-mono tracking-widest uppercase text-white/60">Name</span>
                  <input name="name" required placeholder="Jane Doe" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-mono tracking-widest uppercase text-white/60">Email</span>
                  <input name="email" type="email" required placeholder="jane@company.com" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20" />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-xs font-mono tracking-widest uppercase text-white/60">Message</span>
                  <textarea name="message" required rows={4} placeholder="Tell me about your project, stack and timeline…" className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 resize-none" />
                </label>
                <button type="submit" className="rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold hover:bg-zinc-100 transition">Send via email →</button>
                <p className="text-xs text-white/40 text-center">Or copy: <span className="text-white/70 font-mono select-all">{profile.email}</span></p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

import { profile } from '../data'
import { Reveal } from './Reveal'
import { useTheme } from '../hooks/useTheme.jsx'
import profilePhoto from '../assets/projects/profile.png'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'

const ROXAS = { lat: 12.5857, lng: 121.5144 }
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCok2WHd10-T1FV3KFbKYoxH_joD5bmjL8'

function ProfileMarker() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[56px] h-[56px] rounded-full border-[3px] border-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] overflow-hidden bg-white">
        <img src={profilePhoto} alt="Ariel Francis Gacilo" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
      </div>
      <div className="w-3.5 h-3.5 rotate-45 -mt-2 bg-white border-r border-b border-slate-200 shadow-md" />
      <div className="w-2 h-2 rounded-full bg-white border-2 border-slate-900 -mt-[7px] shadow" />
    </div>
  )
}

export default function Contact() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <section id="contact" className={`relative overflow-hidden border-t backdrop-blur-sm transition-colors duration-300 ${isLight ? 'bg-white/70 border-slate-200' : 'border-white/5 bg-ink/80'}`}>
      <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-b from-white/60 via-[#f8fafc]/60 to-white/80' : 'bg-gradient-to-b from-[#0b0c14]/60 via-ink/60 to-[#0b0c14]/80'}`} />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(700px 400px at 50% 0%, rgba(124,92,255,0.25), transparent 60%)' }} />
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent2">Contact</p>
          <h2 className={`mt-3 font-display text-[34px] sm:text-[48px] font-bold leading-none tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Have a project in mind?<br /><span className="bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] bg-clip-text text-transparent">Let's build something great.</span></h2>
          <p className={`mt-4 max-w-[640px] ${isLight ? 'text-slate-600' : 'text-white/65'}`}>I’m open to senior/lead frontend and game roles, freelance platforms and product collaborations. Fast response on email & LinkedIn.</p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <Reveal>
            <div className={`rounded-[20px] p-6 sm:p-8 shadow-card ${isLight ? 'bg-white border border-slate-200 shadow-cardLight' : 'bg-white text-ink shadow-card'}`}>
              <h3 className={`font-display font-semibold text-lg ${isLight ? 'text-slate-900' : 'text-ink'}`}>Get in touch</h3>
              <div className="mt-6 space-y-4">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                  <span className={`w-11 h-11 grid place-items-center rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-ink text-white'}`}>✉</span>
                  <span><span className={`block text-xs tracking-widest uppercase font-mono ${isLight ? 'text-slate-500' : 'text-ink/60'}`}>Email</span><span className={`block font-medium group-hover:underline ${isLight ? 'text-slate-900' : 'text-ink'}`}>{profile.email}</span></span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <span className={`w-11 h-11 grid place-items-center rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-ink text-white'}`}>in</span>
                  <span><span className={`block text-xs tracking-widest uppercase font-mono ${isLight ? 'text-slate-500' : 'text-ink/60'}`}>LinkedIn</span><span className={`block font-medium group-hover:underline ${isLight ? 'text-slate-900' : 'text-ink'}`}>linkedin.com/in/ariel-francis-gacilo</span></span>
                </a>
                <a href={`https://github.com/gaciloarielfrancis`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <span className={`w-11 h-11 grid place-items-center rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-ink text-white'}`}>GH</span>
                  <span><span className={`block text-xs tracking-widest uppercase font-mono ${isLight ? 'text-slate-500' : 'text-ink/60'}`}>GitHub</span><span className={`block font-medium group-hover:underline ${isLight ? 'text-slate-900' : 'text-ink'}`}>github.com/gaciloarielfrancis</span></span>
                </a>
                <div className="flex items-center gap-4">
                  <span className={`w-11 h-11 grid place-items-center rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-ink text-white'}`}>◉</span>
                  <span><span className={`block text-xs tracking-widest uppercase font-mono ${isLight ? 'text-slate-500' : 'text-ink/60'}`}>Location</span><span className={`block font-medium ${isLight ? 'text-slate-900' : 'text-ink'}`}>Roxas, Oriental Mindoro, Philippines 5212</span></span>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <a href={`mailto:${profile.email}`} className={`rounded-full text-center px-5 py-3 text-sm font-semibold transition ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-ink text-white hover:bg-black'}`}>Email me</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`rounded-full border text-center px-5 py-3 text-sm font-semibold transition ${isLight ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50' : 'border-ink/10 text-ink hover:bg-zinc-50'}`}>View LinkedIn</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={(e) => { e.preventDefault(); const d=new FormData(e.currentTarget); window.location.href=`mailto:${profile.email}?subject=Portfolio inquiry — ${d.get('name')}&body=${encodeURIComponent(d.get('message')+'\n\nFrom: '+d.get('name')+' <'+d.get('email')+'>')}` }} className={`rounded-[20px] border p-6 sm:p-8 backdrop-blur ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/[0.04] border-white/10'}`}>
              <h3 className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Send a message</h3>
              <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-white/60'}`}>No backend — opens your email client. Best for quick reach-outs.</p>
              <div className="mt-6 grid gap-4">
                <label className="grid gap-1.5">
                  <span className={`text-xs font-mono tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Name</span>
                  <input name="name" required placeholder="Jane Doe" className={`rounded-xl border px-4 py-3 text-sm focus:outline-none ${isLight ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-300' : 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20'}`} />
                </label>
                <label className="grid gap-1.5">
                  <span className={`text-xs font-mono tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Email</span>
                  <input name="email" type="email" required placeholder="jane@company.com" className={`rounded-xl border px-4 py-3 text-sm focus:outline-none ${isLight ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-300' : 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20'}`} />
                </label>
                <label className="grid gap-1.5">
                  <span className={`text-xs font-mono tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Message</span>
                  <textarea name="message" required rows={4} placeholder="Tell me about your project, stack and timeline…" className={`rounded-xl border px-4 py-3 text-sm focus:outline-none resize-none ${isLight ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-300' : 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20'}`} />
                </label>
                <button type="submit" className={`rounded-full px-6 py-3 text-sm font-semibold transition ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-ink hover:bg-zinc-100'}`}>Send via email →</button>
                <p className={`text-xs text-center ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Or copy: <span className={`font-mono select-all ${isLight ? 'text-slate-700' : 'text-white/70'}`}>{profile.email}</span></p>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Google Map — Roxas 5212 with profile marker that moves with map */}
        <Reveal delay={0.1}>
          <div className={`mt-8 rounded-[20px] overflow-hidden border shadow-card ${isLight ? 'bg-white border-slate-200 shadow-cardLight' : 'bg-[#0f111a] border-white/10'}`}>
            <div className="relative h-[300px] sm:h-[360px] w-full">
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultCenter={ROXAS}
                  defaultZoom={13}
                  mapId="ROXAS_5212_DEMO"
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={ROXAS} title="Ariel Francis Gacilo — Roxas 5212">
                    <ProfileMarker />
                  </AdvancedMarker>
                </Map>
              </APIProvider>

              {/* bottom info card — stays fixed over map, not a marker */}
              <div className={`absolute left-3 right-3 bottom-3 sm:left-4 sm:right-auto flex items-center gap-3 rounded-2xl border backdrop-blur px-4 py-3 shadow-lg ${isLight ? 'bg-white/90 border-slate-200' : 'bg-[#0f111a]/85 border-white/10'}`}>
                <span className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 bg-white">
                  <img src={profilePhoto} alt="Ariel Francis Gacilo" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                </span>
                <div>
                  <div className={`text-sm font-semibold leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>Roxas, Oriental Mindoro, Philippines 5212</div>
                  <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Pinned — Eastern Mindoro • UTC+8 • Available for remote</div>
                </div>
                <a href="https://www.google.com/maps/search/Roxas,+Oriental+Mindoro,+Philippines+5212" target="_blank" rel="noreferrer" className={`hidden sm:inline-flex ml-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${isLight ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800' : 'bg-white text-ink border-white hover:bg-zinc-100'}`}>Open Maps ↗</a>
              </div>
            </div>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-5 py-3 text-xs ${isLight ? 'bg-slate-50 border-t border-slate-200 text-slate-600' : 'bg-[#0a0a0f]/60 border-t border-white/5 text-white/50'}`}>
              <span className="font-mono">12.5857° N, 121.5144° E • Roxas 5212 • marker follows map</span>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Roxas,Oriental+Mindoro,Philippines+5212" target="_blank" rel="noreferrer" className={`hover:underline ${isLight ? 'text-slate-700' : 'text-white/70'}`}>Get directions →</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

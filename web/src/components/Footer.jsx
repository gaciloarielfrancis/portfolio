import { useTheme } from '../hooks/useTheme.jsx'

export default function Footer(){
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <footer className={`border-t backdrop-blur-sm transition-colors duration-300 ${isLight ? 'border-slate-200 bg-white/70' : 'border-white/5 bg-ink/80'}`}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 grid place-items-center rounded-full font-bold text-xs ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-ink'}`}>AF</span>
          <span className={isLight ? 'text-slate-600' : 'text-white/70'}>© {new Date().getFullYear()} Ariel Francis Gacilo • Built with React • Vite • Three.js • Tailwind</span>
        </div>
        <div className={`flex items-center gap-4 ${isLight ? 'text-slate-500' : 'text-white/60'}`}>
          <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className={isLight ? 'hover:text-slate-900' : 'hover:text-white'}>LinkedIn</a>
          <a href="https://github.com/gaciloarielfrancis" target="_blank" rel="noreferrer" className={isLight ? 'hover:text-slate-900' : 'hover:text-white'}>GitHub</a>
          <a href="mailto:gaciloarielfrancis@gmail.com" className={isLight ? 'hover:text-slate-900' : 'hover:text-white'}>Email</a>
        </div>
      </div>
    </footer>
  )
}

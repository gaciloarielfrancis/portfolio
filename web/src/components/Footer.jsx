export default function Footer(){
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 grid place-items-center rounded-full bg-white text-ink font-bold text-xs">AF</span>
          <span className="text-white/70">© {new Date().getFullYear()} Ariel Francis Gacilo • Built with React • Vite • Three.js • Tailwind</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <a href="https://www.linkedin.com/in/ariel-francis-gacilo-01a694b0/" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href="https://github.com/gaciloarielfrancis" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="mailto:gaciloarielfrancis@gmail.com" className="hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  )
}

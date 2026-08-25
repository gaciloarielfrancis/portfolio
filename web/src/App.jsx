import { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Terminal from './components/Terminal'
import Contact from './components/Contact'
import Footer from './components/Footer'

const Background3D = lazy(() => import('./components/Background3D'))

export default function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-white selection:bg-accent selection:text-white transition-colors duration-300 relative">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:text-ink focus:px-4 focus:py-2">Skip to content</a>
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../hooks/useTheme.jsx'

function Panel({ position, rotation, color, scale = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.3 + position[0]) * 0.08
    ref.current.rotation.x = rotation[0] + Math.cos(t * 0.25) * 0.05
  })
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1.6, 1.0, 0.04]} />
        <meshStandardMaterial color={color} transparent opacity={0.9} roughness={0.4} metalness={0.2} />
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.45, 0.85]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} />
        </mesh>
        <group position={[0, 0, 0.035]}>
          {[0.28, 0.12, -0.04, -0.20].map((y, i) => (
            <mesh key={i} position={[-0.15, y, 0]}>
              <planeGeometry args={[0.9 - i*0.08, 0.06]} />
              <meshBasicMaterial color="white" transparent opacity={0.85 - i*0.12} />
            </mesh>
          ))}
        </group>
      </mesh>
    </Float>
  )
}

function FloatingChip({ position }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.12
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#7c5cff" emissiveIntensity={0.3} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Rig({ mouse }) {
  const camRef = useRef()
  useFrame(() => {
    if (camRef.current) {
      camRef.current.position.x = THREE.MathUtils.lerp(camRef.current.position.x, mouse.x * 0.6, 0.04)
      camRef.current.position.y = THREE.MathUtils.lerp(camRef.current.position.y, 2.2 + mouse.y * 0.4, 0.04)
      camRef.current.lookAt(0, 0.2, 0)
    }
  })
  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 2.2, 6]} fov={38} />
}

export default function WorkstationScene({ mouse = { x: 0, y: 0 }, reduced = false }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const dpr = useMemo(() => (reduced ? [1, 1] : [1, 1.6]), [reduced])

  if (reduced) {
    return (
      <div className={`w-full h-full rounded-[24px] border relative overflow-hidden ${isLight ? 'bg-gradient-to-br from-[#eef2ff] via-white to-[#f8fafc] border-slate-200' : 'bg-gradient-to-br from-[#1a1033] via-[#0f1a2a] to-[#0a0a0f] border-white/10'}`}>
        <div className="absolute inset-0 opacity-40" style={{ background: isLight ? 'radial-gradient(600px 300px at 60% 30%, rgba(124,92,255,0.12), transparent 60%), radial-gradient(500px 300px at 20% 80%, rgba(34,211,238,0.10), transparent 60%)' : 'radial-gradient(600px 300px at 60% 30%, rgba(124,92,255,0.25), transparent 60%), radial-gradient(500px 300px at 20% 80%, rgba(34,211,238,0.18), transparent 60%)' }} />
        <div className="absolute inset-0 grid place-items-center p-6">
          <div className={`w-full max-w-[420px] rounded-2xl backdrop-blur border p-4 shadow-card ${isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-400" /><span className="w-3 h-3 rounded-full bg-yellow-400" /><span className="w-3 h-3 rounded-full bg-green-400" />
              <span className={`ml-auto text-[11px] tracking-widest uppercase font-mono ${isLight ? 'text-slate-500' : 'text-white/60'}`}>game.view — PixiJS</span>
            </div>
            <div className={`aspect-[16/10] rounded-xl border grid place-items-center ${isLight ? 'bg-gradient-to-br from-[#7c5cff]/15 to-[#22d3ee]/10 border-slate-200' : 'bg-gradient-to-br from-[#7c5cff]/30 to-[#22d3ee]/20 border-white/10'}`}>
              <span className={`font-mono text-sm ${isLight ? 'text-slate-700' : 'text-white/80'}`}>◈ 60fps • WebGL • GSAP</span>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-ink text-xs font-semibold">PixiJS</span>
              <span className={`px-2.5 py-1 rounded-full text-xs border ${isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/10 text-white border-white/10'}`}>TypeScript</span>
              <span className={`px-2.5 py-1 rounded-full text-xs border ${isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/10 text-white border-white/10'}`}>GSAP</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const bg = isLight ? '#f8fafc' : '#080a14'
  const gridSection = isLight ? '#94a3b8' : '#2a2f45'
  const gridCell = isLight ? '#cbd5e1' : '#1a1e2e'
  const fogColor = bg

  return (
    <div className={`w-full h-full rounded-[24px] overflow-hidden border relative ${isLight ? 'bg-[#f8fafc] border-slate-200' : 'bg-[#080a14] border-white/10'}`}>
      <Canvas dpr={dpr} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} shadows={false}>
        <color attach="background" args={[bg]} />
        <ambientLight intensity={isLight ? 1.0 : 0.7} />
        <directionalLight position={[4, 6, 3]} intensity={isLight ? 0.9 : 1.1} />
        <pointLight position={[-3, 3, 2]} intensity={isLight ? 8 : 12} color="#7c5cff" distance={8} />
        <pointLight position={[3, 1, -2]} intensity={isLight ? 6 : 10} color="#22d3ee" distance={8} />

        <Rig mouse={mouse} />

        <Grid position={[0, -1.2, 0]} args={[10, 10]} cellSize={0.5} cellThickness={0.6} sectionSize={2} sectionThickness={1} fadeDistance={7} infiniteGrid sectionColor={gridSection} cellColor={gridCell} />

        <Panel position={[-1.4, 0.4, 0.2]} rotation={[0.05, 0.35, 0]} color="#7c5cff" scale={1} />
        <Panel position={[0, 0.7, -0.4]} rotation={[0.02, -0.1, 0]} color="#22d3ee" scale={1.05} />
        <Panel position={[1.35, 0.15, 0.1]} rotation={[0.08, -0.35, 0.02]} color="#f472b6" scale={0.95} />

        <FloatingChip position={[-0.9, 1.35, 0.6]} />
        <FloatingChip position={[0.9, 1.1, -0.2]} />
        <FloatingChip position={[0, -0.3, 0.9]} />

        <fog attach="fog" args={[fogColor, 6, 12]} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-3 top-3 flex items-center gap-2 rounded-full backdrop-blur border px-3 py-1.5 ${isLight ? 'bg-white/80 border-slate-200' : 'bg-white/10 border-white/10'}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className={`text-[11px] tracking-widest uppercase font-mono ${isLight ? 'text-slate-700' : 'text-white/80'}`}>Live — 60fps</span>
        </div>
        <div className={`absolute right-3 bottom-3 hidden sm:flex items-center gap-2 rounded-full backdrop-blur border px-3 py-1.5 ${isLight ? 'bg-white/90 border-slate-200' : 'bg-[#0f111a]/80 border-white/10'}`}>
          <span className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-white/70'}`}>PixiJS • GSAP • WebGL</span>
        </div>
        <div className="absolute inset-x-3 bottom-3 sm:hidden flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-ink text-xs font-semibold">PixiJS</span>
          <span className={`px-2.5 py-1 rounded-full text-xs border backdrop-blur ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-white/10 text-white border-white/10'}`}>React</span>
        </div>
      </div>
    </div>
  )
}

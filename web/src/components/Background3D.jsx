import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../hooks/useTheme.jsx'

function FloatingPoly({ position, color, scale = 1, speed = 1.2, rot = [0, 0, 0] }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.18 * speed
    if (ref.current) {
      ref.current.rotation.y = rot[1] + t * 0.35
      ref.current.rotation.x = rot[0] + t * 0.22
      ref.current.rotation.z = rot[2] + Math.sin(t * 0.5) * 0.08
    }
  })
  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.18} roughness={0.35} metalness={0.25} wireframe={false} />
        <mesh scale={1.06}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color={color} transparent opacity={0.06} wireframe roughness={0.5} />
        </mesh>
      </mesh>
    </Float>
  )
}

function GridFloor({ isLight }) {
  // subtle infinite grid via shader is heavy for global bg — use simple plane grid texture via lines
  // Instead just render a faint plane with grid helper via useFrame? Keep minimal for perf.
  return null
}

function Scene({ isLight }) {
  const groupRef = useRef()
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  const accentA = isLight ? '#6366f1' : '#7c5cff'
  const accentB = isLight ? '#0ea5e9' : '#22d3ee'
  const accentC = isLight ? '#94a3b8' : '#334155'

  return (
    <group ref={groupRef}>
      {/* professional floating polys — low count for perf */}
      <FloatingPoly position={[-3.2, 1.4, -3]} color={accentA} scale={1.15} speed={0.9} rot={[0.2, 0.5, 0]} />
      <FloatingPoly position={[3.0, -0.6, -4]} color={accentB} scale={0.95} speed={1.1} rot={[0.4, -0.3, 0.1]} />
      <FloatingPoly position={[0.2, 2.0, -5]} color={accentC} scale={0.8} speed={0.85} rot={[0.1, 0.2, 0.3]} />
      <FloatingPoly position={[-1.8, -1.6, -3.8]} color={accentA} scale={0.65} speed={1.0} rot={[0.3, 0.1, -0.2]} />
      <FloatingPoly position={[2.2, 1.8, -4.5]} color={accentB} scale={0.7} speed={0.95} rot={[-0.2, 0.4, 0.2]} />
      {/* central wire torus — subtle professional accent */}
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.3}>
        <mesh position={[0, 0.1, -6]} rotation={[0.6, 0.2, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 80]} />
          <meshStandardMaterial color={isLight ? '#cbd5e1' : '#1e293b'} transparent opacity={isLight ? 0.18 : 0.22} roughness={0.5} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Background3D() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const dpr = useMemo(() => (isMobile || reduced ? [1, 1] : [1, 1.5]), [isMobile, reduced])

  // reduced/motion: render static CSS fallback, no WebGL
  if (reduced) {
    return (
      <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${isLight ? 'bg-[#f8fafc]' : 'bg-[#0a0a0f]'}`}>
        <div className="absolute inset-0" style={{ background: isLight ? 'radial-gradient(800px 500px at 20% 15%, rgba(99,102,241,0.07), transparent 60%), radial-gradient(700px 400px at 85% 35%, rgba(14,165,233,0.06), transparent 60%)' : 'radial-gradient(800px 500px at 20% 15%, rgba(124,92,255,0.09), transparent 60%), radial-gradient(700px 400px at 85% 35%, rgba(34,211,238,0.07), transparent 60%)' }} />
        <div className={`absolute inset-0 ${isLight ? 'opacity-[0.04]' : 'opacity-[0.05]'}`} style={{ backgroundImage: `linear-gradient(${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)'} 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
      </div>
    )
  }

  const bg = isLight ? '#f8fafc' : '#0a0a0f'
  const fogNear = isLight ? 8 : 7
  const fogFar = isLight ? 16 : 14

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: bg }}
      >
        <color attach="background" args={[bg]} />
        <ambientLight intensity={isLight ? 0.9 : 0.65} />
        <directionalLight position={[5, 6, 4]} intensity={isLight ? 0.7 : 1.0} color={isLight ? '#ffffff' : '#ffffff'} />
        <pointLight position={[-4, 3, 2]} intensity={isLight ? 6 : 10} color={isLight ? '#6366f1' : '#7c5cff'} distance={12} />
        <pointLight position={[4, -2, 1]} intensity={isLight ? 4 : 8} color={isLight ? '#0ea5e9' : '#22d3ee'} distance={10} />

        <Scene isLight={isLight} />

        <fog attach="fog" args={[bg, fogNear, fogFar]} />
      </Canvas>

      {/* soft vignette + grid overlay for professional depth */}
      <div className="absolute inset-0" style={{ background: isLight ? 'radial-gradient(1200px 600px at 50% 0%, rgba(99,102,241,0.06), transparent 60%), radial-gradient(900px 500px at 85% 80%, rgba(14,165,233,0.04), transparent 60%)' : 'radial-gradient(1200px 600px at 50% 0%, rgba(124,92,255,0.07), transparent 60%), radial-gradient(900px 500px at 85% 80%, rgba(34,211,238,0.05), transparent 60%)' }} />
      <div className={`absolute inset-0 ${isLight ? 'opacity-[0.035]' : 'opacity-[0.045]'}`} style={{ backgroundImage: `linear-gradient(${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)'} 1px, transparent 1px)`, backgroundSize: '56px 56px' }} />
      <div className={`absolute inset-x-0 top-0 h-[1px] ${isLight ? 'bg-gradient-to-r from-transparent via-slate-200 to-transparent' : 'bg-gradient-to-r from-transparent via-white/5 to-transparent'}`} />
    </div>
  )
}

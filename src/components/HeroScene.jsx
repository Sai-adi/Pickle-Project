import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'

function PickleJar() {
  const jarRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (jarRef.current) {
      jarRef.current.rotation.y = t * 0.4
      jarRef.current.position.y = Math.sin(t * 0.7) * 0.15
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.2 + Math.sin(t * 1.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={jarRef}>
        {/* Jar body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.7, 0.75, 1.8, 32]} />
          <meshPhysicalMaterial
            color="#4a7c59"
            transparent
            opacity={0.75}
            roughness={0.05}
            metalness={0}
            transmission={0.85}
            thickness={0.5}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Jar lid */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.18, 32]} />
          <meshStandardMaterial color="#8B6914" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.12, 0]}>
          <cylinderGeometry args={[0.6, 0.72, 0.08, 32]} />
          <meshStandardMaterial color="#a07820" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Pickle contents inside */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          return (
            <mesh key={i} position={[Math.cos(rad) * 0.3, -0.2 + i * 0.1, Math.sin(rad) * 0.3]}>
              <capsuleGeometry args={[0.06, 0.35, 4, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#5c8a2a' : '#e8b84b'} roughness={0.6} />
            </mesh>
          )
        })}

        {/* Glow sphere */}
        <mesh ref={glowRef} scale={1.15}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial color="#ffc107" transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingSpice({ position, color, size = 0.06 }) {
  const meshRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.5
      meshRef.current.rotation.z = t * 0.3
      meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.2
    }
  })
  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  )
}

function DistortedOrb({ position, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.3
  })
  return (
    <Sphere ref={ref} args={[0.4, 64, 64]} position={position}>
      <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0} metalness={0.3} transparent opacity={0.6} />
    </Sphere>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffd54f" castShadow />
          <pointLight position={[-3, 2, 2]} intensity={1.2} color="#ff9800" />
          <pointLight position={[3, -2, -2]} intensity={0.8} color="#8bc34a" />

          {/* Stars background */}
          <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.5} />

          {/* Main pickle jar */}
          <PickleJar />

          {/* Floating spice elements */}
          <FloatingSpice position={[-2.2, 1.2, -1]} color="#ffc107" size={0.07} />
          <FloatingSpice position={[2.0, 0.8, -1]} color="#ef4444" size={0.05} />
          <FloatingSpice position={[-1.8, -1.0, -0.5]} color="#8bc34a" size={0.06} />
          <FloatingSpice position={[1.5, -1.3, -0.5]} color="#ff9800" size={0.08} />
          <FloatingSpice position={[0.5, 2.0, -1]} color="#e91e63" size={0.04} />

          {/* Distorted orbs */}
          <DistortedOrb position={[-2.5, 0.5, -2]} color="#ffc107" />
          <DistortedOrb position={[2.5, -0.5, -2]} color="#4caf50" />

          <Environment preset="night" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

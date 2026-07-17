import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { YarnCone } from './Models'

export default function ThreeCanvas() {
  const mousePos = useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-[400px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.3, 3.2], fov: 45 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Warm, soft daylight feel */}
        <ambientLight intensity={0.8} color="#FFF8F0" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#FFFFFF"
          castShadow
        />
        <directionalLight
          position={[-3, 4, -2]}
          intensity={0.4}
          color="#E8DFFF"
        />
        {/* Subtle warm fill from below */}
        <pointLight
          position={[0, -3, 2]}
          intensity={0.3}
          color="#FFE8D6"
        />

        <YarnCone mousePos={mousePos} position={[0, -0.1, 0]} />
      </Canvas>
    </div>
  )
}

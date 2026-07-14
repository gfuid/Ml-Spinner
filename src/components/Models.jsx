import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// Helper to create a procedural thread texture for realism
function createThreadTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  // Base off-white color
  ctx.fillStyle = '#FAF7F2'
  ctx.fillRect(0, 0, 512, 512)

  // Draw fine horizontal thread lines for bump/normal appearance
  for (let y = 0; y < 512; y += 4) {
    // Alternating subtle tone variations for thread bundle look
    const val = 240 + Math.floor(Math.random() * 15)
    ctx.strokeStyle = `rgb(${val}, ${val - 8}, ${val - 12})`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 24) // Repeat vertically to look like wound thread layers
  return texture
}

export function YarnCone({ mousePos, ...props }) {
  const groupRef = useRef()
  const threadGroupRef = useRef()
  const particlesRef = useRef([])

  // Create the thread texture memoized to prevent re-creation on render
  const threadTexture = useMemo(() => createThreadTexture(), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      // Dynamic cursor tilt/follow with smooth interpolation (lerp)
      if (mousePos?.current) {
        // Map X position directly to a full 360-degree rotation range (multiplied by PI for natural spin feel)
        const targetRotY = mousePos.current.x * Math.PI * 1.5 + (t * 0.05)
        const targetRotX = mousePos.current.y * 0.8 + 0.15
        const targetRotZ = -mousePos.current.x * 0.4

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08)

        // Parallax position offset
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mousePos.current.x * 0.35, 0.08)
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mousePos.current.y * 0.35, 0.08)
      } else {
        // Fallback gentle spin if mouse details are missing
        groupRef.current.rotation.y = t * 0.12
      }
    }

    // Gentle overall float
    if (threadGroupRef.current) {
      threadGroupRef.current.position.y = Math.sin(t * 0.5) * 0.08
    }

    // Animate orbital particles
    particlesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const speed = 0.25 + i * 0.04
        const radius = 1.3 + i * 0.07
        mesh.position.x = Math.cos(t * speed + i * 1.5) * radius
        mesh.position.z = Math.sin(t * speed + i * 1.5) * radius
        mesh.position.y = Math.sin(t * 0.4 + i * 0.7) * 0.6
        mesh.scale.setScalar(0.7 + Math.sin(t * 2.5 + i) * 0.25)
      }
    })
  })

  // Spiral thread lines overlay
  const spiralA = useMemo(() => {
    const pts = []
    const loops = 24, total = loops * 40
    for (let i = 0; i <= total; i++) {
      const t = i / total
      const a = t * Math.PI * 2 * loops
      const h = -1.0 + t * 1.95
      const r = 0.69 - t * 0.33
      pts.push(new THREE.Vector3(Math.cos(a) * r, h, Math.sin(a) * r))
    }
    return pts
  }, [])

  return (
    <group ref={threadGroupRef} {...props}>
      <group ref={groupRef}>
        {/* Realistic main thread body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.69, 1.7, 64]} />
          <meshStandardMaterial
            map={threadTexture}
            bumpMap={threadTexture}
            bumpScale={0.015}
            roughness={0.92}
            metalness={0.02}
            color="#FCFAF5"
          />
        </mesh>

        {/* Paper core tube top (luxury Kraft paper cardboard tube inside) */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.2, 32]} />
          <meshStandardMaterial 
            color="#DCCFB8" 
            roughness={0.7} 
            metalness={0.05} 
          />
        </mesh>

        {/* Outer thread wire frame spiral overlay */}
        <Line points={spiralA} color="#C4B9AA" lineWidth={1.3} opacity={0.4} transparent />

        {/* Secondary overlapping offset thread overlay */}
        <group rotation={[0, Math.PI / 6, 0]}>
          <Line points={spiralA} color="#E8E2D9" lineWidth={0.8} opacity={0.35} transparent />
        </group>

        {/* Base disc */}
        <mesh position={[0, -0.89, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.08, 48]} />
          <meshStandardMaterial 
            color="#D6CFC4" 
            roughness={0.5} 
            metalness={0.25} 
          />
        </mesh>
      </group>

      {/* Orbiting cotton particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
        >
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#FF6B5A' : i % 3 === 1 ? '#4A8FE7' : '#DCCFB8'}
            roughness={0.6}
            metalness={0.05}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Elegant thin orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.003, 8, 80]} />
        <meshBasicMaterial color="#E8E9EC" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[2.0, 0.002, 8, 80]} />
        <meshBasicMaterial color="#FF6B5A" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

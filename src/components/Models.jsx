import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export function YarnCone({ mousePos, ...props }) {
  const groupRef = useRef()
  const swayGroupRef = useRef()
  const particlesRef = useRef([])

  // Generate helical spline points for the threads
  const helixPoints = useMemo(() => {
    const generateHelix = (radius, loops, height, fiberOffset = 0) => {
      const pts = []
      const totalPoints = 120
      for (let i = 0; i <= totalPoints; i++) {
        const fraction = i / totalPoints
        const y = -height / 2 + fraction * height
        const angle = fraction * Math.PI * 2 * loops + fiberOffset
        const r = radius * (1 - 0.25 * Math.sin(fraction * Math.PI)) // slightly tapered at ends like spun yarn
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        pts.push(new THREE.Vector3(x, y, z))
      }
      return pts
    }

    return {
      // Thread 1 (Coral) - bundle of 3 fine fibers
      coralFibers: [
        generateHelix(0.5, 3.5, 2.2, 0),
        generateHelix(0.5, 3.5, 2.2, 0.1),
        generateHelix(0.49, 3.5, 2.2, -0.1),
      ],
      // Thread 2 (Blue) - bundle of 3 fine fibers, counter-wound
      blueFibers: [
        generateHelix(0.65, 2.8, 2.2, Math.PI),
        generateHelix(0.65, 2.8, 2.2, Math.PI + 0.12),
        generateHelix(0.64, 2.8, 2.2, Math.PI - 0.12),
      ],
      // Thread 3 (Cream/White) - central tight twist
      creamFibers: [
        generateHelix(0.28, 5.0, 2.2, Math.PI / 2),
        generateHelix(0.28, 5.0, 2.2, Math.PI / 2 + 0.15),
      ]
    }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // 1. Mouse Follow & Tilt
    if (groupRef.current) {
      if (mousePos?.current) {
        const targetRotY = mousePos.current.x * Math.PI * 1.0 + (t * 0.12)
        const targetRotX = mousePos.current.y * 0.6 + 0.2
        const targetRotZ = -mousePos.current.x * 0.3

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08)

        // Mouse Parallax position offsets
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mousePos.current.x * 0.25, 0.08)
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mousePos.current.y * 0.25, 0.08)
      } else {
        groupRef.current.rotation.y = t * 0.15
      }
    }

    // 2. Gentle organic sways of the whole assembly (looks like floating threads)
    if (swayGroupRef.current) {
      swayGroupRef.current.position.y = Math.sin(t * 0.6) * 0.1
      swayGroupRef.current.position.x = Math.cos(t * 0.4) * 0.05
      
      // Dynamic warp scale to look "flexible"
      swayGroupRef.current.scale.y = 1.0 + Math.sin(t * 0.8) * 0.03
    }

    // 3. Orbiting fiber dust/particles
    particlesRef.current.forEach((mesh, i) => {
      if (mesh) {
        const speed = 0.3 + i * 0.05
        const radius = 0.8 + i * 0.09
        const angle = t * speed + i * 1.5
        mesh.position.x = Math.cos(angle) * radius
        mesh.position.z = Math.sin(angle) * radius
        mesh.position.y = Math.sin(t * 0.4 + i * 0.5) * 1.0
        // Pulsing size
        mesh.scale.setScalar(0.6 + Math.sin(t * 2.0 + i) * 0.3)
      }
    })
  })

  return (
    <group ref={swayGroupRef} {...props}>
      <group ref={groupRef}>
        
        {/* Coral Thread Bundle */}
        <group>
          {helixPoints.coralFibers.map((points, idx) => (
            <Line
              key={`coral-${idx}`}
              points={points}
              color="#FF6B5A"
              lineWidth={1.5}
              opacity={0.7 - idx * 0.15}
              transparent
            />
          ))}
        </group>

        {/* Counter-rotating Blue Thread Bundle */}
        <group rotation={[0, 0, Math.PI / 8]}>
          {helixPoints.blueFibers.map((points, idx) => (
            <Line
              key={`blue-${idx}`}
              points={points}
              color="#4A8FE7"
              lineWidth={1.5}
              opacity={0.65 - idx * 0.15}
              transparent
            />
          ))}
        </group>

        {/* Cream Central Twist Core */}
        <group rotation={[0, 0, -Math.PI / 12]}>
          {helixPoints.creamFibers.map((points, idx) => (
            <Line
              key={`cream-${idx}`}
              points={points}
              color="#DCCFB8"
              lineWidth={2.0}
              opacity={0.8 - idx * 0.2}
              transparent
            />
          ))}
        </group>

        {/* Outer Ring Orbits representing the spinning framework */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.003, 8, 80]} />
          <meshBasicMaterial color="#E8E9EC" transparent opacity={0.3} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.2, 0.15, 0]} position={[0, 0.5, 0]}>
          <torusGeometry args={[0.7, 0.0025, 8, 60]} />
          <meshBasicMaterial color="#FF6B5A" transparent opacity={0.2} />
        </mesh>

        <mesh rotation={[Math.PI / 1.8, -0.15, 0]} position={[0, -0.5, 0]}>
          <torusGeometry args={[0.7, 0.0025, 8, 60]} />
          <meshBasicMaterial color="#4A8FE7" transparent opacity={0.2} />
        </mesh>

        {/* Central glowing light source to make it look magic/premium */}
        <pointLight color="#FF6B5A" intensity={0.8} distance={3} />
        <pointLight color="#4A8FE7" intensity={0.6} distance={3} />
      </group>

      {/* Orbiting glowing fiber particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`particle-${i}`}
          ref={(el) => (particlesRef.current[i] = el)}
        >
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#FF6B5A' : i % 3 === 1 ? '#4A8FE7' : '#DCCFB8'}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

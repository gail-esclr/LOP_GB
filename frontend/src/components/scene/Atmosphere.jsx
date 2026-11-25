import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

const skyVertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const skyFragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 uTopColor;
  uniform vec3 uMiddleColor;
  uniform vec3 uHorizonColor;

  void main() {
    float h = normalize(vWorldPosition).y;

    vec3 color;
    if (h > 0.15) {
      color = mix(uMiddleColor, uTopColor, (h - 0.15) / 0.85);
    } else {
      color = mix(uHorizonColor, uMiddleColor, max(h, 0.0) / 0.15);
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

function SkyDome() {
  const uniforms = useMemo(() => ({
    uTopColor: { value: new THREE.Color('#020814') },
    uMiddleColor: { value: new THREE.Color('#0a1e3d') },
    uHorizonColor: { value: new THREE.Color('#1a3a5c') },
  }), [])

  return (
    <mesh>
      <sphereGeometry args={[80, 32, 32]} />
      <shaderMaterial
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Moon() {
  return (
    <group position={[30, 25, -20]}>
      {/* Moon glow */}
      <mesh>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#fffde0" transparent opacity={0.1} />
      </mesh>
      {/* Moon body */}
      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#fef9c3" />
      </mesh>
      {/* Moonlight (point light) */}
      <pointLight color="#c4b5fd" intensity={8} distance={80} />
    </group>
  )
}

function WaterParticles() {
  const particlesRef = useRef()
  const count = 150

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = Math.random() * 3 - 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!particlesRef.current) return
    const posArray = particlesRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]

      // Reset particles that go too high
      if (posArray[i * 3 + 1] > 3) {
        posArray[i * 3] = (Math.random() - 0.5) * 10
        posArray[i * 3 + 1] = -0.5
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 6
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5f3fc"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

export default function Atmosphere() {
  return (
    <>
      <SkyDome />
      <Moon />

      <Stars
        radius={60}
        depth={40}
        count={3000}
        factor={3}
        saturation={0.3}
        fade
        speed={0.5}
      />

      <WaterParticles />

      {/* === LIGHTING === */}
      {/* Warm sunset directional light */}
      <directionalLight
        position={[10, 8, -5]}
        color="#ffd4a0"
        intensity={1.8}
        castShadow
      />

      {/* Cool ambient fill */}
      <ambientLight color="#1a3a5c" intensity={0.4} />

      {/* Warm accent from horizon */}
      <pointLight position={[-15, 2, 10]} color="#f97316" intensity={3} distance={40} />

      {/* Slight rim light on the boat area */}
      <pointLight position={[5, 4, 3]} color="#7dd3fc" intensity={2} distance={15} />

      {/* Fog */}
      <fog attach="fog" args={['#071428', 15, 70]} />
    </>
  )
}

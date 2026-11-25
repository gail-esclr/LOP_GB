import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HULL_COLOR = '#8B4513'
const HULL_INNER = '#a0522d'
const BENCH_COLOR = '#6d3a1f'
const TARP_COLOR = '#d2691e'
const RIM_COLOR = '#cd853f'
const ROPE_COLOR = '#c4a35a'

function HullGeometry() {
  const geometry = useMemo(() => {
    // Create a boat hull by modifying a box geometry
    const geo = new THREE.BoxGeometry(3.5, 0.5, 1.4, 4, 1, 1)
    const positions = geo.attributes.position

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      let z = positions.getZ(i)

      // Taper the front (bow)
      if (x > 1.2) {
        const taper = 1 - ((x - 1.2) / 0.55) * 0.65
        z *= Math.max(taper, 0.2)
      }

      // Slight taper at the back (stern)
      if (x < -1.4) {
        const taper = 1 - ((-1.4 - x) / 0.35) * 0.2
        z *= Math.max(taper, 0.7)
      }

      // Round the bottom
      if (y < 0) {
        const roundFactor = 1 - Math.abs(z) / 0.7 * 0.15
        positions.setY(i, y * roundFactor)
      }

      positions.setZ(i, z)
    }

    positions.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  return <bufferGeometry attach="geometry" {...geometry} />
}

export default function Boat({ position = [0, 0, 0] }) {
  const boatGroupRef = useRef()

  useFrame(({ clock }) => {
    if (boatGroupRef.current) {
      const t = clock.getElapsedTime()
      // Gentle rocking motion
      boatGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.03
      boatGroupRef.current.rotation.x = Math.sin(t * 0.4 + 0.5) * 0.02
      boatGroupRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08
    }
  })

  return (
    <group ref={boatGroupRef} position={position}>
      {/* === HULL (outer) === */}
      <mesh>
        <HullGeometry />
        <meshStandardMaterial color={HULL_COLOR} roughness={0.8} />
      </mesh>

      {/* === HULL INNER === */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[3.0, 0.35, 1.1]} />
        <meshStandardMaterial color={HULL_INNER} roughness={0.9} side={THREE.BackSide} />
      </mesh>

      {/* === FLOOR === */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[3.0, 0.06, 1.05]} />
        <meshStandardMaterial color={BENCH_COLOR} roughness={0.9} />
      </mesh>

      {/* === RIM / GUNWALE === */}
      {/* Left rim */}
      <mesh position={[0, 0.27, 0.65]}>
        <boxGeometry args={[3.2, 0.08, 0.1]} />
        <meshStandardMaterial color={RIM_COLOR} roughness={0.6} />
      </mesh>
      {/* Right rim */}
      <mesh position={[0, 0.27, -0.65]}>
        <boxGeometry args={[3.2, 0.08, 0.1]} />
        <meshStandardMaterial color={RIM_COLOR} roughness={0.6} />
      </mesh>
      {/* Stern rim */}
      <mesh position={[-1.55, 0.27, 0]}>
        <boxGeometry args={[0.1, 0.08, 1.2]} />
        <meshStandardMaterial color={RIM_COLOR} roughness={0.6} />
      </mesh>

      {/* === BENCHES === */}
      <mesh position={[-0.6, 0.0, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.95]} />
        <meshStandardMaterial color={BENCH_COLOR} roughness={0.85} />
      </mesh>
      <mesh position={[0.5, 0.0, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.95]} />
        <meshStandardMaterial color={BENCH_COLOR} roughness={0.85} />
      </mesh>

      {/* === TARP / COVER (back section) === */}
      <group position={[-1.1, 0.35, 0]}>
        {/* Tarp top */}
        <mesh rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.8, 0.04, 1.1]} />
          <meshStandardMaterial color={TARP_COLOR} roughness={0.7} transparent opacity={0.9} />
        </mesh>
        {/* Tarp support pole */}
        <mesh position={[0.35, -0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color={BENCH_COLOR} roughness={0.8} />
        </mesh>
      </group>

      {/* === ROPE COIL (detail) === */}
      <mesh position={[1.0, 0.05, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.02, 6, 12]} />
        <meshStandardMaterial color={ROPE_COLOR} roughness={0.9} />
      </mesh>

      {/* === BOW POINT === */}
      <mesh position={[1.7, 0.15, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color={HULL_COLOR} roughness={0.8} />
      </mesh>

      {/* === HULL STRIPE (waterline) === */}
      <mesh position={[0, -0.05, 0.71]}>
        <boxGeometry args={[2.8, 0.06, 0.02]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.05, -0.71]}>
        <boxGeometry args={[2.8, 0.06, 0.02]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.7} />
      </mesh>
    </group>
  )
}

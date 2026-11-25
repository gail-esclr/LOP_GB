import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORANGE = '#d4710a'
const DARK_ORANGE = '#b85c08'
const CREAM = '#f5deb3'
const STRIPE = '#1a0800'
const NOSE_COLOR = '#2c1810'
const EYE_COLOR = '#7CFC00'
const WHISKER = '#f0e6d2'

function Stripe({ position, scale, rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={STRIPE} />
    </mesh>
  )
}

export default function Tiger({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const earLRef = useRef()
  const earRRef = useRef()
  const breathRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Breathing animation
    if (breathRef.current) {
      breathRef.current.scale.y = 1 + Math.sin(t * 1.5) * 0.02
      breathRef.current.scale.x = 1 + Math.sin(t * 1.5) * 0.01
    }

    // Tail sway
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 0.8) * 0.15
      tailRef.current.rotation.x = Math.sin(t * 0.6) * 0.1
    }

    // Subtle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.4) * 0.06
      headRef.current.rotation.z = Math.sin(t * 0.3) * 0.02
    }

    // Ear twitching
    if (earLRef.current) {
      earLRef.current.rotation.z = 0.2 + Math.sin(t * 2 + 1) * 0.08
    }
    if (earRRef.current) {
      earRRef.current.rotation.z = -0.2 + Math.sin(t * 2.2) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>

      {/* === BODY (torso) === */}
      <group ref={breathRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.6, 0.7]} />
          <meshStandardMaterial color={ORANGE} roughness={0.7} />
        </mesh>

        {/* Body stripes */}
        <Stripe position={[0.15, 0.31, 0]} scale={[0.08, 0.02, 0.6]} />
        <Stripe position={[-0.1, 0.31, 0]} scale={[0.06, 0.02, 0.55]} />
        <Stripe position={[-0.35, 0.3, 0]} scale={[0.07, 0.02, 0.5]} />
        <Stripe position={[0.35, 0.3, 0]} scale={[0.05, 0.02, 0.5]} />
        {/* Side stripes */}
        <Stripe position={[0.1, 0.1, 0.36]} scale={[0.08, 0.35, 0.02]} />
        <Stripe position={[-0.15, 0.08, 0.36]} scale={[0.07, 0.3, 0.02]} />
        <Stripe position={[0.35, 0.05, 0.36]} scale={[0.06, 0.25, 0.02]} />
        <Stripe position={[0.1, 0.1, -0.36]} scale={[0.08, 0.35, 0.02]} />
        <Stripe position={[-0.15, 0.08, -0.36]} scale={[0.07, 0.3, 0.02]} />
        <Stripe position={[0.35, 0.05, -0.36]} scale={[0.06, 0.25, 0.02]} />

        {/* Belly (lighter underside) */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.9, 0.15, 0.5]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>
      </group>

      {/* === CHEST === */}
      <mesh position={[0.55, 0.12, 0]}>
        <boxGeometry args={[0.35, 0.55, 0.62]} />
        <meshStandardMaterial color={DARK_ORANGE} roughness={0.7} />
      </mesh>
      {/* Chest front (white/cream) */}
      <mesh position={[0.7, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.45]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>

      {/* === HEAD === */}
      <group ref={headRef} position={[0.75, 0.5, 0]}>
        {/* Main head */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.48, 0.44, 0.52]} />
          <meshStandardMaterial color={ORANGE} roughness={0.6} />
        </mesh>

        {/* Head stripes */}
        <Stripe position={[0, 0.225, 0.08]} scale={[0.35, 0.02, 0.06]} />
        <Stripe position={[0, 0.225, -0.08]} scale={[0.35, 0.02, 0.06]} />
        <Stripe position={[0.05, 0.225, 0]} scale={[0.06, 0.02, 0.4]} />

        {/* Cheeks (lighter) */}
        <mesh position={[0.15, -0.05, 0.22]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>
        <mesh position={[0.15, -0.05, -0.22]}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshStandardMaterial color={CREAM} roughness={0.8} />
        </mesh>

        {/* Snout / muzzle */}
        <mesh position={[0.25, -0.08, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.3]} />
          <meshStandardMaterial color={CREAM} roughness={0.7} />
        </mesh>

        {/* Nose */}
        <mesh position={[0.35, -0.02, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.1]} />
          <meshStandardMaterial color={NOSE_COLOR} roughness={0.5} />
        </mesh>

        {/* Mouth line */}
        <mesh position={[0.34, -0.1, 0]}>
          <boxGeometry args={[0.02, 0.02, 0.12]} />
          <meshStandardMaterial color={NOSE_COLOR} roughness={0.5} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.2, 0.08, 0.17]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={EYE_COLOR}
            emissive={EYE_COLOR}
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.2, 0.08, -0.17]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={EYE_COLOR}
            emissive={EYE_COLOR}
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
        {/* Pupils */}
        <mesh position={[0.24, 0.08, 0.17]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>
        <mesh position={[0.24, 0.08, -0.17]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#000000" roughness={0.1} />
        </mesh>

        {/* Ears */}
        <group ref={earLRef} position={[-0.05, 0.3, 0.18]}>
          <mesh>
            <boxGeometry args={[0.12, 0.16, 0.1]} />
            <meshStandardMaterial color={ORANGE} roughness={0.7} />
          </mesh>
          <mesh position={[0.01, 0, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.06]} />
            <meshStandardMaterial color={DARK_ORANGE} roughness={0.7} />
          </mesh>
        </group>
        <group ref={earRRef} position={[-0.05, 0.3, -0.18]}>
          <mesh>
            <boxGeometry args={[0.12, 0.16, 0.1]} />
            <meshStandardMaterial color={ORANGE} roughness={0.7} />
          </mesh>
          <mesh position={[0.01, 0, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.06]} />
            <meshStandardMaterial color={DARK_ORANGE} roughness={0.7} />
          </mesh>
        </group>

        {/* Whiskers (thin lines) */}
        <mesh position={[0.3, -0.05, 0.2]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.2, 0.008, 0.008]} />
          <meshStandardMaterial color={WHISKER} />
        </mesh>
        <mesh position={[0.3, -0.07, 0.19]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.18, 0.008, 0.008]} />
          <meshStandardMaterial color={WHISKER} />
        </mesh>
        <mesh position={[0.3, -0.05, -0.2]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.2, 0.008, 0.008]} />
          <meshStandardMaterial color={WHISKER} />
        </mesh>
        <mesh position={[0.3, -0.07, -0.19]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.18, 0.008, 0.008]} />
          <meshStandardMaterial color={WHISKER} />
        </mesh>
      </group>

      {/* === FRONT LEGS (extended forward, sitting) === */}
      {/* Left front leg */}
      <mesh position={[0.45, -0.3, 0.25]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.55, 0.2, 0.2]} />
        <meshStandardMaterial color={ORANGE} roughness={0.7} />
      </mesh>
      <mesh position={[0.7, -0.38, 0.25]}>
        <boxGeometry args={[0.2, 0.14, 0.22]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>
      {/* Right front leg */}
      <mesh position={[0.45, -0.3, -0.25]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.55, 0.2, 0.2]} />
        <meshStandardMaterial color={ORANGE} roughness={0.7} />
      </mesh>
      <mesh position={[0.7, -0.38, -0.25]}>
        <boxGeometry args={[0.2, 0.14, 0.22]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>

      {/* === BACK LEGS (folded, sitting) === */}
      {/* Left haunch */}
      <mesh position={[-0.4, -0.15, 0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color={ORANGE} roughness={0.7} />
      </mesh>
      <Stripe position={[-0.35, -0.05, 0.46]} scale={[0.07, 0.25, 0.02]} />
      {/* Left back paw */}
      <mesh position={[-0.15, -0.38, 0.32]}>
        <boxGeometry args={[0.22, 0.12, 0.2]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>
      {/* Right haunch */}
      <mesh position={[-0.4, -0.15, -0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color={ORANGE} roughness={0.7} />
      </mesh>
      <Stripe position={[-0.35, -0.05, -0.46]} scale={[0.07, 0.25, 0.02]} />
      {/* Right back paw */}
      <mesh position={[-0.15, -0.38, -0.32]}>
        <boxGeometry args={[0.22, 0.12, 0.2]} />
        <meshStandardMaterial color={CREAM} roughness={0.8} />
      </mesh>

      {/* === TAIL === */}
      <group ref={tailRef} position={[-0.6, 0.1, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.35, 0.1, 0.1]} />
          <meshStandardMaterial color={ORANGE} roughness={0.7} />
        </mesh>
        <mesh position={[-0.3, -0.15, 0]} rotation={[0, 0, -0.8]}>
          <boxGeometry args={[0.3, 0.09, 0.09]} />
          <meshStandardMaterial color={ORANGE} roughness={0.7} />
        </mesh>
        <mesh position={[-0.5, -0.4, 0]} rotation={[0, 0, -1.2]}>
          <boxGeometry args={[0.25, 0.08, 0.08]} />
          <meshStandardMaterial color={DARK_ORANGE} roughness={0.7} />
        </mesh>
        {/* Tail tip (darker) */}
        <mesh position={[-0.6, -0.6, 0]} rotation={[0, 0, -1.0]}>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color={STRIPE} roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}

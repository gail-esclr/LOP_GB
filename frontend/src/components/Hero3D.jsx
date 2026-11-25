import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import Ocean from './scene/Ocean'
import Tiger from './scene/Tiger'
import Boat from './scene/Boat'
import Atmosphere from './scene/Atmosphere'
import './Hero3D.css'

function CameraRig() {
  const ref = useRef()

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    // Slow gentle orbit around the scene
    camera.position.x = Math.sin(t * 0.08) * 6
    camera.position.z = Math.cos(t * 0.08) * 6
    camera.position.y = 2.5 + Math.sin(t * 0.15) * 0.3
    camera.lookAt(0, 0.3, 0)
  })

  return null
}

function Scene() {
  return (
    <>
      <Atmosphere />
      <Ocean />

      {/* Boat with tiger */}
      <Float
        speed={1.2}
        rotationIntensity={0.1}
        floatIntensity={0.3}
        floatingRange={[-0.05, 0.05]}
      >
        <Boat position={[0, 0.1, 0]} />
        <Tiger
          position={[-0.15, 0.35, 0]}
          rotation={[0, 0.3, 0]}
          scale={0.65}
        />
      </Float>
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0891b2" wireframe />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <section id="home" className="hero3d">
      <div className="hero3d-canvas-wrapper">
        <Canvas
          camera={{ position: [5, 3, 5], fov: 45, near: 0.1, far: 150 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Scene />
          </Suspense>
          <CameraRig />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Text overlay on top of the 3D scene */}
      <div className="hero3d-overlay">
        <p className="hero3d-label">An Informative Journey Into</p>
        <h1 className="hero3d-title">
          Life of <span className="highlight">Pi</span>
        </h1>
        <p className="hero3d-quote">
          "I must say a word about fear. It is life's only true opponent."
        </p>
        <p className="hero3d-author">— Yann Martel</p>

        <div className="hero3d-actions">
          <a href="#about" className="btn btn-primary">Explore the Story</a>
          <a href="#characters" className="btn btn-outline">Meet the Characters</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll to Explore</span>
        <div className="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uWaveHeight;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Multiple wave layers for realism
    float wave1 = sin(pos.x * 0.4 + uTime * 0.6) * cos(pos.z * 0.3 + uTime * 0.4) * uWaveHeight;
    float wave2 = sin(pos.x * 0.8 + pos.z * 0.5 + uTime * 0.8) * uWaveHeight * 0.5;
    float wave3 = sin(pos.x * 1.5 + uTime * 1.2) * cos(pos.z * 1.2 + uTime * 0.9) * uWaveHeight * 0.25;
    float wave4 = sin(pos.x * 2.5 + pos.z * 2.0 + uTime * 1.5) * uWaveHeight * 0.1;
    float wave5 = cos(pos.x * 0.15 + uTime * 0.3) * sin(pos.z * 0.2 + uTime * 0.25) * uWaveHeight * 1.5;

    float elevation = wave1 + wave2 + wave3 + wave4 + wave5;
    pos.y += elevation;

    vElevation = elevation;
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uFoamColor;
  uniform float uWaveHeight;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;

  void main() {
    // Normalize elevation to 0-1 range
    float normalizedElev = (vElevation + uWaveHeight * 2.0) / (uWaveHeight * 4.0);
    normalizedElev = clamp(normalizedElev, 0.0, 1.0);

    // Base color blending
    vec3 color = mix(uDeepColor, uShallowColor, normalizedElev);

    // Foam at wave crests
    float foam = smoothstep(0.65, 0.85, normalizedElev);
    color = mix(color, uFoamColor, foam * 0.4);

    // Specular-like shimmer
    float shimmer = sin(vWorldPos.x * 8.0 + uTime * 2.0) * cos(vWorldPos.z * 6.0 + uTime * 1.5);
    shimmer = smoothstep(0.6, 1.0, shimmer) * 0.15;
    color += shimmer;

    // Depth fade at edges
    float dist = length(vWorldPos.xz) / 50.0;
    float alpha = 1.0 - smoothstep(0.6, 1.0, dist);

    gl_FragColor = vec4(color, 0.92 * alpha);
  }
`

export default function Ocean() {
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWaveHeight: { value: 0.35 },
    uDeepColor: { value: new THREE.Color('#041830') },
    uShallowColor: { value: new THREE.Color('#0e7490') },
    uFoamColor: { value: new THREE.Color('#a5f3fc') },
  }), [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[120, 120, 200, 200]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

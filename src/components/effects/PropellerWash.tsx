import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom shader material for GPU particles
const PropellerParticlesMaterial = shaderMaterial(
  {
    time: 0,
    propellerPosition: new THREE.Vector3(0, 0, 0),
    propellerIntensity: 1.0,
    color: new THREE.Color(0x00ff88),
  },
  // Vertex shader
  `
    uniform float time;
    uniform vec3 propellerPosition;
    uniform float propellerIntensity;
    
    attribute float size;
    attribute vec3 velocity;
    attribute float life;
    
    varying float vLife;
    varying float vDistance;
    
    void main() {
      vLife = life;
      
      // Particle motion based on propeller wash
      vec3 pos = position;
      float t = mod(time + life * 10.0, 10.0);
      
      // Spiral motion away from propeller
      float angle = t * 2.0 + life * 6.28;
      float radius = t * 0.5 * propellerIntensity;
      
      pos.x += cos(angle) * radius + velocity.x * t;
      pos.y -= t * 0.3 * propellerIntensity; // Downward wash
      pos.z += sin(angle) * radius + velocity.z * t;
      
      // Add turbulence
      pos.x += sin(t * 3.0 + life * 10.0) * 0.1;
      pos.z += cos(t * 3.0 + life * 10.0) * 0.1;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size based on distance and life
      vDistance = length(pos - propellerPosition);
      gl_PointSize = size * (1.0 - t / 10.0) * 300.0 / -mvPosition.z;
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float time;
    
    varying float vLife;
    varying float vDistance;
    
    void main() {
      // Circular particle shape
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;
      
      // Fade based on life and distance
      float opacity = (1.0 - dist * 2.0) * (1.0 - vLife) * 0.3;
      opacity *= smoothstep(0.0, 2.0, vDistance);
      
      // Add glow effect
      vec3 particleColor = color + vec3(0.2, 0.4, 0.3) * (1.0 - dist);
      
      gl_FragColor = vec4(particleColor, opacity);
    }
  `
);

extend({ PropellerParticlesMaterial });

interface PropellerWashProps {
  propellerPosition: THREE.Vector3;
  intensity?: number;
}

export default function PropellerWash({ propellerPosition, intensity = 1.0 }: PropellerWashProps) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);

  // Generate particle attributes
  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const lives = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Start particles near propeller
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
      
      sizes[i] = Math.random() * 0.5 + 0.5;
      
      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.2;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;
      
      // Random life offset
      lives[i] = Math.random();
    }

    return { positions, sizes, velocities, lives };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.propellerPosition = propellerPosition;
      materialRef.current.propellerIntensity = intensity;
    }
  });

  return (
    <points ref={ref} position={propellerPosition}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={particles.velocities.length / 3}
          array={particles.velocities}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-life"
          count={particles.lives.length}
          array={particles.lives}
          itemSize={1}
        />
      </bufferGeometry>
      <propellerParticlesMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

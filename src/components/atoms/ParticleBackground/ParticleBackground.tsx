// src/components/atoms/ParticleBackground/ParticleBackground.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ParticleBackground.module.css';

interface ParticleBackgroundProps {
  count?: number;
  mouseReactive?: boolean;
}

const ParticleField: React.FC<{ count: number; mouseReactive: boolean }> = ({ 
  count, 
  mouseReactive 
}) => {
  const ref = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Generate particle positions
  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }
    
    return [pos, origPos];
  }, [count]);

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseReactive) return;
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  // Set up mouse listener
  useMemo(() => {
    if (mouseReactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseReactive]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Base floating animation
      positions[i3] = originalPositions[i3] + Math.sin(time + i * 0.1) * 0.1;
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time + i * 0.1) * 0.1;
      
      // Mouse interaction
      if (mouseReactive) {
        const dx = positions[i3] - mouseRef.current.x * 5;
        const dy = positions[i3 + 1] - mouseRef.current.y * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 2) {
          const force = (2 - dist) / 2;
          positions[i3] += dx * force * 0.02;
          positions[i3 + 1] += dy * force * 0.02;
        }
      }
      
      // Rotate particles
      positions[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.5 + i) * 0.2;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 5000,
  mouseReactive = true,
}) => {
  return (
    <div className={styles.particleBackground}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={count} mouseReactive={mouseReactive} />
      </Canvas>
    </div>
  );
};

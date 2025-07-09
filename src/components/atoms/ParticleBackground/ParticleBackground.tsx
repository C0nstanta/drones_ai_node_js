// src/components/atoms/ParticleBackground/ParticleBackground.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './ParticleBackground.module.css';

interface ParticleBackgroundProps {
  count?: number;
  mouseReactive?: boolean;
}

const ParticleField: React.FC<{ count: number; mouseReactive: boolean }> = ({ count, mouseReactive }) => {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generate random positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  // Create geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  // Mouse move handler
  React.useEffect(() => {
    if (!mouseReactive) return;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseReactive]);

  // Animation
  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    
    if (mouseReactive) {
      points.current.rotation.x = mouse.current.y * 0.2;
      points.current.rotation.z = mouse.current.x * 0.2;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 1000,
  mouseReactive = true,
}) => {
  return (
    <div className={styles.particleBackground}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
      >
        <ParticleField count={count} mouseReactive={mouseReactive} />
      </Canvas>
    </div>
  );
};

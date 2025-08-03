import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Holographic shader material
const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0x00ff88),
    scanlineSpeed: 2.0,
    glitchIntensity: 0.02,
    hologramOpacity: 0.8,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float glitchIntensity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Add glitch displacement
      float glitch = sin(time * 20.0 + position.y * 10.0) * glitchIntensity;
      pos.x += glitch * (step(0.8, sin(time * 50.0)) * 2.0 - 1.0);
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float scanlineSpeed;
    uniform float hologramOpacity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      // Holographic base color
      vec3 hologramColor = color;
      
      // Scanning lines
      float scanline = sin(vUv.y * 100.0 + time * scanlineSpeed) * 0.04;
      hologramColor += vec3(scanline);
      
      // Edge glow based on view angle
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = 1.0 - dot(viewDirection, vNormal);
      fresnel = pow(fresnel, 2.0);
      
      // Chromatic aberration on edges
      vec3 aberration = vec3(
        sin(time * 2.0 + vUv.x * 10.0) * 0.1,
        sin(time * 2.0 + vUv.x * 10.0 + 2.094) * 0.1,
        sin(time * 2.0 + vUv.x * 10.0 + 4.188) * 0.1
      );
      hologramColor += aberration * fresnel;
      
      // Digital noise
      float noise = fract(sin(dot(vUv * time, vec2(12.9898, 78.233))) * 43758.5453);
      hologramColor += vec3(noise * 0.02);
      
      // Transparency with edge glow
      float alpha = hologramOpacity + fresnel * 0.5;
      
      // Flicker effect
      alpha *= 0.9 + sin(time * 30.0) * 0.1;
      
      gl_FragColor = vec4(hologramColor, alpha);
    }
  `
);

extend({ HolographicMaterial });

interface HolographicMeshProps {
  children: React.ReactNode;
  color?: THREE.Color | string;
  scanlineSpeed?: number;
  glitchIntensity?: number;
  hologramOpacity?: number;
}

export default function HolographicMesh({
  children,
  color = '#00ff88',
  scanlineSpeed = 2.0,
  glitchIntensity = 0.02,
  hologramOpacity = 0.8,
}: HolographicMeshProps) {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      {children}
      <holographicMaterial
        ref={materialRef}
        color={color}
        scanlineSpeed={scanlineSpeed}
        glitchIntensity={glitchIntensity}
        hologramOpacity={hologramOpacity}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Distortion shader for transitions
export const DistortionMaterial = shaderMaterial(
  {
    time: 0,
    distortionAmount: 0.1,
    tDiffuse: null,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float distortionAmount;
    uniform sampler2D tDiffuse;
    
    varying vec2 vUv;
    
    void main() {
      vec2 distortedUv = vUv;
      
      // Wave distortion
      distortedUv.x += sin(vUv.y * 20.0 + time * 2.0) * distortionAmount * 0.01;
      distortedUv.y += sin(vUv.x * 20.0 + time * 2.0) * distortionAmount * 0.01;
      
      // Radial distortion from center
      vec2 center = vec2(0.5);
      vec2 toCenter = center - vUv;
      float dist = length(toCenter);
      float distortionStrength = sin(dist * 10.0 - time * 3.0) * distortionAmount * 0.02;
      distortedUv += normalize(toCenter) * distortionStrength;
      
      vec4 color = texture2D(tDiffuse, distortedUv);
      gl_FragColor = color;
    }
  `
);

// Chromatic aberration shader
export const ChromaticAberrationMaterial = shaderMaterial(
  {
    tDiffuse: null,
    aberrationAmount: 0.005,
    time: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D tDiffuse;
    uniform float aberrationAmount;
    uniform float time;
    
    varying vec2 vUv;
    
    void main() {
      vec2 center = vec2(0.5);
      vec2 toCenter = center - vUv;
      float dist = length(toCenter);
      
      // Increase aberration towards edges
      float aberration = aberrationAmount * dist * dist;
      
      // Sample RGB channels with offset
      vec2 direction = normalize(toCenter);
      float r = texture2D(tDiffuse, vUv + direction * aberration).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - direction * aberration).b;
      
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
);

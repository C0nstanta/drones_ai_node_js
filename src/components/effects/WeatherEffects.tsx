import React, { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Rain particle shader
const RainMaterial = shaderMaterial(
  {
    time: 0,
    windStrength: 0.3,
    opacity: 0.6,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float windStrength;
    
    attribute float velocity;
    attribute float offset;
    
    varying float vOpacity;
    varying float vStretch;
    
    void main() {
      vec3 pos = position;
      
      // Fall motion
      float fallTime = mod(time * velocity + offset, 20.0);
      pos.y -= fallTime;
      
      // Wind effect
      pos.x += sin(time * 2.0 + offset * 10.0) * windStrength;
      pos.z += cos(time * 1.5 + offset * 10.0) * windStrength * 0.5;
      
      // Stretch based on velocity
      vStretch = velocity * 0.5;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Fade at top and bottom
      vOpacity = smoothstep(0.0, 2.0, fallTime) * smoothstep(20.0, 18.0, fallTime);
      
      gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
    }
  `,
  // Fragment shader
  `
    uniform float opacity;
    
    varying float vOpacity;
    varying float vStretch;
    
    void main() {
      // Stretched raindrop shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      coord.y *= 3.0 + vStretch;
      float dist = length(coord);
      
      if (dist > 0.5) discard;
      
      float alpha = (1.0 - dist * 2.0) * vOpacity * opacity;
      gl_FragColor = vec4(0.7, 0.8, 0.9, alpha);
    }
  `
);

extend({ RainMaterial });

// Water splash shader
const SplashMaterial = shaderMaterial(
  {
    time: 0,
    splashTexture: null,
  },
  // Vertex shader
  `
    uniform float time;
    
    attribute float startTime;
    attribute vec2 velocity;
    attribute float size;
    
    varying float vAlpha;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      
      float age = time - startTime;
      if (age < 0.0 || age > 1.0) {
        gl_Position = vec4(0.0);
        return;
      }
      
      vec3 pos = position;
      
      // Splash motion
      pos.x += velocity.x * age;
      pos.z += velocity.y * age;
      pos.y = sin(age * 3.14159) * 0.3;
      
      vAlpha = 1.0 - age;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      gl_PointSize = size * (1.0 + age * 2.0) * (300.0 / -mvPosition.z);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D splashTexture;
    
    varying float vAlpha;
    varying vec2 vUv;
    
    void main() {
      vec2 coord = gl_PointCoord;
      float dist = length(coord - vec2(0.5));
      
      if (dist > 0.5) discard;
      
      vec4 splash = vec4(0.8, 0.85, 0.9, 1.0);
      splash.a *= (1.0 - dist * 2.0) * vAlpha * 0.6;
      
      gl_FragColor = splash;
    }
  `
);

extend({ SplashMaterial });

// Fog volume shader
const FogVolumeMaterial = shaderMaterial(
  {
    time: 0,
    fogColor: new THREE.Color(0.7, 0.7, 0.7),
    fogDensity: 0.05,
    fogSpeed: 0.1,
  },
  // Vertex shader
  `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 fogColor;
    uniform float fogDensity;
    uniform float fogSpeed;
    
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    
    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      // Animated fog using noise
      vec2 noiseCoord = vWorldPosition.xz * 0.1 + time * fogSpeed;
      float noise = snoise(noiseCoord);
      noise += snoise(noiseCoord * 2.0) * 0.5;
      noise += snoise(noiseCoord * 4.0) * 0.25;
      noise = noise * 0.5 + 0.5;
      
      // Height-based fog
      float heightFactor = smoothstep(0.0, 2.0, vWorldPosition.y);
      
      // Combine noise and height
      float fogAmount = noise * (1.0 - heightFactor) * fogDensity;
      
      gl_FragColor = vec4(fogColor, fogAmount);
    }
  `
);

extend({ FogVolumeMaterial });

interface WeatherEffectsProps {
  rainIntensity?: number;
  fogDensity?: number;
  windStrength?: number;
}

export function RainEffect({ intensity = 1.0, windStrength = 0.3 }: { intensity?: number; windStrength?: number }) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);

  const particles = useMemo(() => {
    const count = Math.floor(2000 * intensity);
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = Math.random() * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i] = 3 + Math.random() * 2;
      offsets[i] = Math.random() * 20;
    }

    return { positions, velocities, offsets };
  }, [intensity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={particles.velocities.length}
          array={particles.velocities}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-offset"
          count={particles.offsets.length}
          array={particles.offsets}
          itemSize={1}
        />
      </bufferGeometry>
      <rainMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        windStrength={windStrength}
      />
    </points>
  );
}

export function FogVolume({ density = 0.05 }: { density?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]} scale={[20, 4, 20]}>
      <boxGeometry args={[1, 1, 1]} />
      <fogVolumeMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        fogDensity={density}
      />
    </mesh>
  );
}

export function WaterSplashes({ splashRate = 10 }: { splashRate?: number }) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<any>(null);
  const lastSplashTime = useRef(0);

  const [particles, setParticles] = React.useState(() => {
    const maxSplashes = 100;
    const positions = new Float32Array(maxSplashes * 3);
    const velocities = new Float32Array(maxSplashes * 2);
    const startTimes = new Float32Array(maxSplashes);
    const sizes = new Float32Array(maxSplashes);
    
    // Initialize with no active splashes
    for (let i = 0; i < maxSplashes; i++) {
      startTimes[i] = -1;
    }
    
    return { positions, velocities, startTimes, sizes, nextIndex: 0 };
  });

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (materialRef.current) {
      materialRef.current.time = time;
    }
    
    // Create new splashes
    if (time - lastSplashTime.current > 1 / splashRate) {
      const { positions, velocities, startTimes, sizes, nextIndex } = particles;
      
      const i = nextIndex;
      const i3 = i * 3;
      const i2 = i * 2;
      
      // Random position on ground
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random velocity
      velocities[i2] = (Math.random() - 0.5) * 2;
      velocities[i2 + 1] = (Math.random() - 0.5) * 2;
      
      startTimes[i] = time;
      sizes[i] = 0.5 + Math.random() * 0.5;
      
      setParticles({
        ...particles,
        nextIndex: (nextIndex + 1) % 100,
      });
      
      lastSplashTime.current = time;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-velocity"
          count={particles.velocities.length / 2}
          array={particles.velocities}
          itemSize={2}
        />
        <bufferAttribute
          attach="attributes-startTime"
          count={particles.startTimes.length}
          array={particles.startTimes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <splashMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function WeatherEffects({ rainIntensity = 0.8, fogDensity = 0.05, windStrength = 0.3 }: WeatherEffectsProps) {
  return (
    <group>
      <RainEffect intensity={rainIntensity} windStrength={windStrength} />
      <FogVolume density={fogDensity} />
      <WaterSplashes splashRate={rainIntensity * 15} />
    </group>
  );
}

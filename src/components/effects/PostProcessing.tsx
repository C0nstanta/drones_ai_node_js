import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { EffectComposer, RenderPass, UnrealBloomPass, FilmPass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import * as THREE from 'three';

// Custom depth of field shader
const DepthOfFieldShader = {
  uniforms: {
    tDiffuse: { value: null },
    tDepth: { value: null },
    focus: { value: 1.0 },
    aperture: { value: 0.025 },
    maxblur: { value: 0.01 },
    nearClip: { value: 0.1 },
    farClip: { value: 1000 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform float focus;
    uniform float aperture;
    uniform float maxblur;
    uniform float nearClip;
    uniform float farClip;
    
    varying vec2 vUv;
    
    float getDepth(vec2 coord) {
      float depth = texture2D(tDepth, coord).r;
      return -nearClip / (depth * (farClip - nearClip) - farClip);
    }
    
    void main() {
      float depth = getDepth(vUv);
      float factor = abs(depth - focus) * aperture;
      
      vec2 dofblur = vec2(clamp(factor, -maxblur, maxblur));
      
      vec4 col = vec4(0.0);
      
      // Simple box blur
      col += texture2D(tDiffuse, vUv);
      col += texture2D(tDiffuse, vUv + vec2(0.0, 0.4) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(0.3, 0.3) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(0.4, 0.0) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(0.3, -0.3) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(0.0, -0.4) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(-0.3, -0.3) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(-0.4, 0.0) * dofblur);
      col += texture2D(tDiffuse, vUv + vec2(-0.3, 0.3) * dofblur);
      
      gl_FragColor = col / 9.0;
    }
  `,
};

// Custom film grain shader
const FilmGrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    intensity: { value: 0.05 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    
    varying vec2 vUv;
    
    float random(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // Film grain
      float grain = random(vUv + time) * intensity;
      
      // Apply grain
      color.rgb += vec3(grain);
      
      // Slight vignette
      float vignette = 1.0 - length(vUv - 0.5) * 0.3;
      color.rgb *= vignette;
      
      gl_FragColor = color;
    }
  `,
};

interface PostProcessingProps {
  bloomIntensity?: number;
  depthOfFieldFocus?: number;
  filmGrainIntensity?: number;
}

export default function PostProcessing({
  bloomIntensity = 1.5,
  depthOfFieldFocus = 10,
  filmGrainIntensity = 0.05,
}: PostProcessingProps) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();
  
  const [renderPass, bloomPass, dofPass, filmGrainPass, fxaaPass] = useMemo(() => {
    const composer = new EffectComposer(gl);
    
    // Render pass
    const renderPass = new RenderPass(scene, camera);
    
    // Bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      bloomIntensity,
      0.4,
      0.85
    );
    
    // Depth of field pass
    const dofPass = new ShaderPass(DepthOfFieldShader);
    dofPass.uniforms.focus.value = depthOfFieldFocus;
    
    // Film grain pass
    const filmGrainPass = new ShaderPass(FilmGrainShader);
    filmGrainPass.uniforms.intensity.value = filmGrainIntensity;
    
    // FXAA anti-aliasing pass
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms.resolution.value.set(1 / size.width, 1 / size.height);
    
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(dofPass);
    composer.addPass(filmGrainPass);
    composer.addPass(fxaaPass);
    
    return [renderPass, bloomPass, dofPass, filmGrainPass, fxaaPass];
  }, [gl, scene, camera, size, bloomIntensity, depthOfFieldFocus, filmGrainIntensity]);
  
  useFrame((state, delta) => {
    if (composer.current) {
      // Update time uniform for film grain
      filmGrainPass.uniforms.time.value = state.clock.elapsedTime;
      
      // Render with post-processing
      composer.current.render(delta);
    }
  }, 1);
  
  return null;
}

// Glow effect component for specific objects
export function GlowEffect({ children, color = '#00ff88', intensity = 2 }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (glowRef.current && meshRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation);
    }
  });
  
  return (
    <group>
      <mesh ref={meshRef}>{children}</mesh>
      <mesh ref={glowRef} scale={[1.1, 1.1, 1.1]}>
        {children}
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

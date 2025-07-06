import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Holographic shader material
const holographicShader = {
  vertexShader: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    void main() {
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform bool hover;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 color = vec3(0.0, 1.0, 0.5);
      float stripes = sin(vPosition.y * 50.0 + time * 2.0) * 0.5 + 0.5;
      float alpha = hover ? 0.8 : 0.6;
      
      vec3 finalColor = mix(color, vec3(0.0, 0.5, 1.0), stripes);
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      gl_FragColor = vec4(finalColor + fresnel * 0.3, alpha);
    }
  `
};

// Drone Component
function Drone({ onHotspotClick }: { onHotspotClick: (id: string) => void }) {
  const droneRef = useRef<THREE.Group>(null);
  const propeller1Ref = useRef<THREE.Mesh>(null);
  const propeller2Ref = useRef<THREE.Mesh>(null);
  const propeller3Ref = useRef<THREE.Mesh>(null);
  const propeller4Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    // Rotate propellers
    if (propeller1Ref.current) propeller1Ref.current.rotation.y += 0.3;
    if (propeller2Ref.current) propeller2Ref.current.rotation.y += 0.3;
    if (propeller3Ref.current) propeller3Ref.current.rotation.y -= 0.3;
    if (propeller4Ref.current) propeller4Ref.current.rotation.y -= 0.3;

    // Gentle floating animation
    if (droneRef.current) {
      droneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const holographicMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        hover: { value: false }
      },
      vertexShader: holographicShader.vertexShader,
      fragmentShader: holographicShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (holographicMaterial.uniforms) {
      holographicMaterial.uniforms.time.value = state.clock.elapsedTime;
      holographicMaterial.uniforms.hover.value = hovered;
    }
  });

  return (
    <group ref={droneRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Drone Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arms */}
      {[
        { position: [1, 0, 1], rotation: [0, Math.PI / 4, 0] },
        { position: [-1, 0, 1], rotation: [0, -Math.PI / 4, 0] },
        { position: [1, 0, -1], rotation: [0, -Math.PI / 4, 0] },
        { position: [-1, 0, -1], rotation: [0, Math.PI / 4, 0] }
      ].map((arm, i) => (
        <mesh key={i} position={arm.position as [number, number, number]} rotation={arm.rotation as [number, number, number]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.2]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Propellers */}
      <mesh ref={propeller1Ref} position={[1.5, 0.2, 1.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 6]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={propeller2Ref} position={[-1.5, 0.2, 1.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 6]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={propeller3Ref} position={[1.5, 0.2, -1.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 6]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.2} />
      </mesh>
      <mesh ref={propeller4Ref} position={[-1.5, 0.2, -1.5]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 6]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.2} />
      </mesh>

      {/* Camera Mount (Elphel) */}
      <mesh position={[0, -0.4, 0.5]} onClick={() => onHotspotClick('camera')}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.5} />
      </mesh>

      {/* RTOS Controller */}
      <mesh position={[0, 0, 0]} onClick={() => onHotspotClick('controller')}>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#0088ff" emissive="#0088ff" emissiveIntensity={0.3} />
      </mesh>

      {/* Drainage Equipment */}
      <mesh position={[0, -0.3, -0.5]} onClick={() => onHotspotClick('drainage')}>
        <cylinderGeometry args={[0.2, 0.3, 0.4, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.3} />
      </mesh>

      {/* Holographic overlay on hover */}
      {hovered && (
        <mesh>
          <boxGeometry args={[3, 1.5, 3]} />
          <primitive object={holographicMaterial} />
        </mesh>
      )}
    </group>
  );
}

// Hotspot Component
function Hotspot({ position, label, color, onClick }: { position: [number, number, number]; label: string; color: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {hovered && (
        <Html center>
          <div className="bg-black/90 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// Main DroneViewer Component
export default function DroneViewer() {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  const specifications = {
    camera: {
      title: "Elphel Camera System",
      specs: [
        "Resolution: 0.05 pixel disparity",
        "Thermal + Visible spectrum",
        "Military-grade certification",
        "360° rotation capability",
        "Real-time image processing"
      ]
    },
    controller: {
      title: "RTOS Flight Controller",
      specs: [
        "Update Rate: 500Hz - 1kHz",
        "FreeRTOS/NuttX compatible",
        "Multi-core processing",
        "Failsafe mechanisms",
        "Low latency: <2ms"
      ]
    },
    drainage: {
      title: "Drainage Inspection Kit",
      specs: [
        "Inspection Rate: 900m/day",
        "Carbon Reduction: 80%",
        "HD recording capability",
        "LED illumination system",
        "Water-resistant design"
      ]
    }
  };

  return (
    <section className="relative min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Interactive Drone Model
          </h2>
          <p className="text-xl text-gray-400">
            Explore our cutting-edge drone technology
          </p>
        </div>

        <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls 
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
            />
            
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00ff88" />
            <pointLight position={[5, 5, -5]} intensity={0.5} color="#0088ff" />
            
            {/* Environment for reflections */}
            <Environment preset="city" />
            
            {/* Drone Model */}
            <Drone onHotspotClick={setSelectedSpec} />
            
            {/* Interactive Hotspots */}
            <Hotspot 
              position={[0, 1, 0.5]} 
              label="Elphel Camera"
              color="#ff6600"
              onClick={() => setSelectedSpec('camera')}
            />
            <Hotspot 
              position={[0, 1, 0]} 
              label="RTOS Controller"
              color="#0088ff"
              onClick={() => setSelectedSpec('controller')}
            />
            <Hotspot 
              position={[0, 1, -0.5]} 
              label="Drainage Equipment"
              color="#00ff00"
              onClick={() => setSelectedSpec('drainage')}
            />
            
            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#0a0a0a" />
            </mesh>
          </Canvas>

          {/* UI Overlay - Specifications Panel */}
          {selectedSpec && specifications[selectedSpec as keyof typeof specifications] && (
            <div className="absolute top-4 right-4 w-80 bg-black/80 backdrop-blur-md border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  {specifications[selectedSpec as keyof typeof specifications].title}
                </h3>
                <button 
                  onClick={() => setSelectedSpec(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <ul className="space-y-2">
                {specifications[selectedSpec as keyof typeof specifications].specs.map((spec, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start">
                    <span className="text-green-400 mr-2">▸</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Controls hint */}
          <div className="absolute bottom-4 left-4 text-gray-400 text-sm">
            <p>🖱️ Drag to rotate • Scroll to zoom • Click hotspots for details</p>
          </div>
        </div>
      </div>
    </section>
  );
}

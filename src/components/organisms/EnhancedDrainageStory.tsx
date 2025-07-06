'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WeatherEffects from './effects/WeatherEffects';
import HolographicMesh from './effects/HolographicShader';

gsap.registerPlugin(ScrollTrigger);

export default function EnhancedDrainageStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [weatherIntensity, setWeatherIntensity] = useState(0);
  const [showHologram, setShowHologram] = useState(false);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const stats = section.querySelectorAll('.stat-number');
    const layers = section.querySelectorAll('.parallax-layer');
    
    // Animate weather intensity based on scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        setWeatherIntensity(self.progress);
        
        // Add chromatic aberration effect on scroll
        const aberration = self.progress * 5;
        section.style.filter = `contrast(1.1) saturate(1.2)`;
        section.style.textShadow = `${aberration}px 0 0 rgba(255, 0, 0, 0.3), ${-aberration}px 0 0 rgba(0, 255, 255, 0.3)`;
      }
    });
    
    // Statistics animation with glow effect
    stats.forEach((stat) => {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          const suffix = stat.getAttribute('data-suffix') || '';
          
          gsap.to(stat, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              stat.innerHTML = Math.floor(this.targets()[0].innerHTML) + suffix;
              // Add glow pulse
              stat.style.textShadow = `0 0 ${20 + Math.sin(this.progress() * Math.PI) * 10}px #00ff88`;
            }
          });
        }
      });
    });
    
    // Enhanced parallax with distortion
    layers.forEach((layer, index) => {
      gsap.to(layer, {
        y: -100 * (index + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="relative min-h-[200vh] bg-gradient-to-b from-gray-900 via-blue-900 to-black overflow-hidden">
      {/* 3D Weather Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Canvas>
          <WeatherEffects 
            rainIntensity={weatherIntensity}
            fogDensity={weatherIntensity * 0.1}
            windStrength={weatherIntensity * 0.5}
          />
          <ambientLight intensity={0.1} />
        </Canvas>
      </div>
      
      {/* Parallax layers with holographic elements */}
      <div className="absolute inset-0">
        <div className="parallax-layer absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="parallax-layer absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <pattern id="pipe-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="20" fill="#00ff88" opacity="0.1" />
              <rect y="40" width="100" height="20" fill="#00ff88" opacity="0.1" />
              <rect y="80" width="100" height="20" fill="#00ff88" opacity="0.1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pipe-pattern)" />
          </svg>
        </div>
      </div>
      
      {/* Content sections */}
      <div className="relative z-10 container mx-auto px-4 pt-32">
        {/* Title with glitch effect */}
        <h2 className="text-6xl md:text-8xl font-bold text-center mb-20 relative">
          <span className="text-white relative z-10">Drainage Revolution</span>
          <span className="absolute inset-0 text-green-400 animate-glitch-1">Drainage Revolution</span>
          <span className="absolute inset-0 text-red-400 animate-glitch-2">Drainage Revolution</span>
        </h2>
        
        {/* Statistics grid with holographic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30 hover:border-green-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Traditional Method</h3>
            <p className="text-5xl font-bold text-white stat-number" data-target="100" data-suffix="m/day">0m/day</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-1/3 animate-pulse" />
            </div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30 hover:border-green-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent" />
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Our Solution</h3>
            <p className="text-5xl font-bold text-green-400 stat-number" data-target="900" data-suffix="m/day">0m/day</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full animate-pulse" />
            </div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30 hover:border-green-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Carbon Reduction</h3>
            <p className="text-5xl font-bold text-blue-400 stat-number" data-target="80" data-suffix="%">0%</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-4/5 animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Before/After comparison with distortion effect */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black rounded-lg p-8 border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4">Traditional Inspection</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    Manual process
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    High carbon footprint
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    Limited reach
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-black rounded-lg p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-4">AI Drone Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Fully automated
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    80% less emissions
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    9x faster coverage
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive timeline with holographic elements */}
        <div className="mb-32">
          <h3 className="text-4xl font-bold text-center text-white mb-12">Inspection Process</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-blue-500" />
            
            {[
              { time: '0:00', title: 'Deployment', desc: 'Drone launched from vehicle' },
              { time: '0:05', title: 'Navigation', desc: 'AI pathfinding through pipes' },
              { time: '0:30', title: 'Inspection', desc: 'Real-time defect detection' },
              { time: '1:00', title: 'Analysis', desc: 'ML-powered assessment' },
              { time: '1:15', title: 'Report', desc: 'Instant results delivered' }
            ].map((step, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 border border-green-500/30 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                    <p className="text-green-400 font-mono text-sm">{step.time}</p>
                    <h4 className="text-xl font-bold text-white mt-1">{step.title}</h4>
                    <p className="text-gray-400 text-sm mt-2">{step.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(50% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(80% 0 10% 0); transform: translate(1px, -1px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(80% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(60% 0 20% 0); transform: translate(1px, -1px); }
          80% { clip-path: inset(20% 0 50% 0); transform: translate(-1px, 1px); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite reverse;
        }
      `}</style>
    </section>
  );
}

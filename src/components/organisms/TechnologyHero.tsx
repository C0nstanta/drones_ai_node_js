// src/components/organisms/TechnologyHero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyHero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
        }
      );

      // Split text animation
      const chars = titleRef.current.innerText.split('');
      titleRef.current.innerHTML = chars.map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      gsap.fromTo(titleRef.current.children,
        {
          opacity: 0,
          y: 50,
          rotateZ: () => Math.random() * 20 - 10,
        },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'back.out(1.7)',
          delay: 0.5,
        }
      );
    }

    // Grid animation
    if (gridRef.current) {
      const gridItems = gridRef.current.querySelectorAll('.grid-item');
      gsap.fromTo(gridItems,
        {
          opacity: 0,
          scale: 0,
          rotateZ: 180,
        },
        {
          opacity: 0.1,
          scale: 1,
          rotateZ: 0,
          duration: 1,
          stagger: {
            from: 'center',
            amount: 1.5,
            grid: [10, 10],
          },
          ease: 'power2.out',
        }
      );
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-4"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="grid-item bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm"
            style={{
              animationDelay: `${i * 0.01}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-purple-900/20" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '1s' }} />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 text-cyan-300 text-sm font-semibold backdrop-blur-sm animate-pulse">
            CUTTING-EDGE INNOVATION
          </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Technology Stack
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Powered by <span className="text-cyan-400 font-semibold">Real-Time Operating Systems</span>, 
          <span className="text-blue-400 font-semibold"> Military-Grade Detection</span>, and 
          <span className="text-purple-400 font-semibold"> AI-Driven Analytics</span>
        </p>
        
        {/* Tech highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="group relative p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-2xl border border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-cyan-300 mb-2">RTOS Integration</h3>
              <p className="text-gray-400 text-sm">500Hz-1kHz update rates</p>
            </div>
          </div>
          
          <div className="group relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-2xl border border-blue-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">Defense Systems</h3>
              <p className="text-gray-400 text-sm">Combat-proven technology</p>
            </div>
          </div>
          
          <div className="group relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">Thermal Imaging</h3>
              <p className="text-gray-400 text-sm">20x sensitivity improvement</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

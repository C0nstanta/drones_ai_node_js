// src/components/organisms/ThermalImagingTech.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThermalImagingTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<'thermal' | 'visible' | 'fusion'>('thermal');
  const [temperature, setTemperature] = useState(22.5);

  useEffect(() => {
    // Thermal visualization effect
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const animateHeatmap = () => {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let x = 0; x < canvas.width; x++) {
          for (let y = 0; y < canvas.height; y++) {
            const i = (y * canvas.width + x) * 4;
            
            // Create thermal gradient effect
            const heat = Math.sin(x * 0.05 + Date.now() * 0.001) * 
                        Math.cos(y * 0.05 + Date.now() * 0.0015) * 127 + 128;
            
            if (activeMode === 'thermal') {
              // Thermal colormap (blue -> green -> yellow -> red)
              data[i] = heat > 128 ? 255 : heat * 2;
              data[i + 1] = heat > 64 && heat < 192 ? (heat - 64) * 2 : 0;
              data[i + 2] = heat < 128 ? 255 - heat * 2 : 0;
              data[i + 3] = 200;
            } else if (activeMode === 'visible') {
              // Grayscale for visible mode
              data[i] = data[i + 1] = data[i + 2] = heat;
              data[i + 3] = 200;
            } else {
              // Fusion mode
              data[i] = heat > 128 ? 255 : heat * 1.5;
              data[i + 1] = heat;
              data[i + 2] = heat < 128 ? 150 : heat * 0.5;
              data[i + 3] = 200;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(animateHeatmap);
      };

      animateHeatmap();
    }

    // Temperature simulation
    const tempInterval = setInterval(() => {
      setTemperature(prev => 20 + Math.random() * 10);
    }, 2000);

    // ScrollTrigger animations
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.tech-card');
      
      gsap.fromTo(elements,
        {
          opacity: 0,
          x: -50,
          rotateY: -45,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      clearInterval(tempInterval);
    };
  }, [activeMode]);

  const imagingModes = [
    { id: 'thermal', label: 'LWIR Thermal', color: 'from-orange-400 to-red-500' },
    { id: 'visible', label: 'Visible Spectrum', color: 'from-blue-400 to-cyan-500' },
    { id: 'fusion', label: 'AI Fusion', color: 'from-purple-400 to-pink-500' },
  ];

  const specifications = [
    { label: 'Resolution', value: '0.05px', unit: 'disparity' },
    { label: 'Sensitivity', value: '20x', unit: 'improved' },
    { label: 'Range', value: '2.5', unit: 'km' },
    { label: 'Processing', value: '87', unit: 'ms/frame' },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-orange-950/10 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/logos/elphel-badge.svg" alt="Elphel" className="h-12" />
            <span className="text-xl font-bold text-orange-400">Powered by Elphel Inc.</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Advanced Thermal Imaging
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Military-grade LWIR technology with AFWERX partnership, delivering 
            unprecedented detection capabilities through foliage and adverse conditions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Thermal Display */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden bg-black border border-orange-500/30">
              {/* Mode selector */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                {imagingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeMode === mode.id
                        ? 'bg-gradient-to-r ' + mode.color + ' text-white'
                        : 'bg-gray-900/80 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              
              {/* Temperature display */}
              <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-orange-400">
                  {temperature.toFixed(1)}°C
                </div>
                <div className="text-xs text-gray-400">Target Temp</div>
              </div>
              
              {/* Canvas for thermal visualization */}
              <canvas
                ref={canvasRef}
                className="w-full h-96"
                style={{ imageRendering: 'pixelated' }}
              />
              
              {/* Crosshair overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/30"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-500/30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 border-2 border-green-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-6">
            {/* Main features card */}
            <div className="tech-card bg-gradient-to-br from-orange-900/30 to-orange-900/10 rounded-xl p-6 border border-orange-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">Elphel Camera System</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-400">
                      {spec.value}<span className="text-sm text-orange-300">{spec.unit}</span>
                    </div>
                    <p className="text-sm text-gray-400">{spec.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Through-foliage detection capability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Open-source hardware architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">AI-enhanced image processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">360° gimbal rotation</span>
                </div>
              </div>
            </div>

            {/* AFWERX Partnership Badge */}
            <div className="tech-card bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-4 border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">AFWERX Partnership</h4>
                  <p className="text-sm text-gray-400">U.S. Air Force innovation program</p>
                </div>
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

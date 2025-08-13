// src/components/organisms/DroneDetectionSystem.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DetectionZone {
  id: number;
  distance: number;
  label: string;
  threats: number;
}

export default function DroneDetectionSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const [detectedDrones, setDetectedDrones] = useState<Array<{id: number, angle: number, distance: number}>>([]);
  const [activeZone, setActiveZone] = useState(0);
  const [scanAngle, setScanAngle] = useState(0);

  const detectionZones: DetectionZone[] = [
    { id: 1, distance: 5000, label: 'Long Range', threats: 3 },
    { id: 2, distance: 2500, label: 'Medium Range', threats: 5 },
    { id: 3, distance: 1000, label: 'Short Range', threats: 2 },
    { id: 4, distance: 500, label: 'Critical Zone', threats: 1 },
  ];

  useEffect(() => {
    // Radar scanning animation
    const scanInterval = setInterval(() => {
      setScanAngle(prev => (prev + 2) % 360);
    }, 50);

    // Simulate drone detection
    const detectionInterval = setInterval(() => {
      const newDrones = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, i) => ({
        id: Date.now() + i,
        angle: Math.random() * 360,
        distance: Math.random() * 250 + 50,
      }));
      setDetectedDrones(newDrones);
    }, 3000);

    // Zone rotation
    const zoneInterval = setInterval(() => {
      setActiveZone(prev => (prev + 1) % detectionZones.length);
    }, 2000);

    // ScrollTrigger animations
    if (sectionRef.current) {
      gsap.fromTo(radarRef.current,
        {
          scale: 0,
          opacity: 0,
          rotateZ: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotateZ: 0,
          duration: 1.5,
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
      clearInterval(scanInterval);
      clearInterval(detectionInterval);
      clearInterval(zoneInterval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <img src="/logos/interproinvest-badge.svg" alt="InterProInvest" className="h-12" />
            <span className="text-xl font-bold text-blue-400">Partnership with InterProInvest</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Military-Grade Drone Detection
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Combat-proven RF detection and jamming systems from Ukraine's battlefield, 
            protecting critical infrastructure worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Radar Visualization */}
          <div className="relative">
            <div ref={radarRef} className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Radar circles */}
              {[1, 2, 3, 4].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 border border-blue-500/20 rounded-full"
                  style={{
                    width: `${ring * 25}%`,
                    height: `${ring * 25}%`,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
              
              {/* Scanning beam */}
              <div
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from ${scanAngle}deg, transparent 0deg, rgba(59, 130, 246, 0.3) 30deg, transparent 60deg)`,
                  borderRadius: '50%',
                }}
              />
              
              {/* Detected drones */}
              {detectedDrones.map((drone) => (
                <div
                  key={drone.id}
                  className="absolute w-3 h-3 bg-red-500 rounded-full animate-pulse"
                  style={{
                    top: `${50 + Math.sin(drone.angle * Math.PI / 180) * drone.distance / 5}%`,
                    left: `${50 + Math.cos(drone.angle * Math.PI / 180) * drone.distance / 5}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                  }}
                >
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
                </div>
              ))}
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-green-500 rounded-full">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">
                  BASE STATION
                </span>
              </div>
              
              {/* Distance labels */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-400">5km</div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-blue-400">S</div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-400">W</div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-400">E</div>
            </div>
          </div>

          {/* Detection Capabilities */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">RIFF System Capabilities</h3>
              
              <div className="space-y-4">
                {detectionZones.map((zone, index) => (
                  <div
                    key={zone.id}
                    className={`relative p-4 rounded-lg border transition-all duration-500 ${
                      activeZone === index
                        ? 'bg-blue-500/20 border-blue-400 scale-105'
                        : 'bg-gray-900/50 border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">{zone.label}</span>
                      <span className="text-sm text-blue-400">{zone.distance}m</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            activeZone === index ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-gray-600'
                          }`}
                          style={{ width: `${(zone.threats / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{zone.threats} threats</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-3xl font-bold text-red-400 mb-1">1000W</div>
                <p className="text-sm text-gray-400">Jamming Power</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-3xl font-bold text-blue-400">360°</div>
                <p className="text-sm text-gray-400">Coverage</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-3xl font-bold text-green-400">2020+</div>
                <p className="text-sm text-gray-400">Combat Tested</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                <div className="text-3xl font-bold text-yellow-400">All UAVs</div>
                <p className="text-sm text-gray-400">DJI & Military</p>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Proven Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-full border border-red-500/30">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-red-300 font-semibold">Battlefield Proven in Ukraine Since 2020</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/organisms/RTOSShowcase.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RTOSFeature {
  title: string;
  value: string;
  unit: string;
  description: string;
  color: string;
}

export default function RTOSShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [codeProgress, setCodeProgress] = useState(0);

  const features: RTOSFeature[] = [
    {
      title: 'Update Frequency',
      value: '1000',
      unit: 'Hz',
      description: 'Real-time sensor data processing at maximum frequency',
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      title: 'Response Latency',
      value: '<2',
      unit: 'ms',
      description: 'Ultra-low latency for critical drone detection',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'CPU Cores',
      value: '8',
      unit: 'cores',
      description: 'Multi-core parallel processing for AI algorithms',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Memory Management',
      value: '99.9',
      unit: '%',
      description: 'Deterministic memory allocation efficiency',
      color: 'from-green-400 to-green-600',
    },
  ];

  const codeSnippet = `// RTOS Drone Detection Core Loop
void drone_detection_task(void *params) {
    DetectionParams *detection = (DetectionParams *)params;
    TickType_t xLastWakeTime = xTaskGetTickCount();
    
    while(1) {
        // Read sensor data from multiple sources
        SensorData sensors = {
            .radar = read_radar_data(),
            .thermal = read_thermal_camera(),
            .rf_scanner = scan_rf_spectrum(),
            .acoustic = read_acoustic_sensors()
        };
        
        // Run AI detection algorithms
        DetectionResult result = ai_detect_drone(&sensors);
        
        // Process detection with InterProInvest algorithms
        if (result.confidence > DETECTION_THRESHOLD) {
            trigger_countermeasures(&result);
            update_tracking_system(&result);
        }
        
        // Maintain precise timing - 1000Hz update rate
        vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(1));
    }
}`;

  useEffect(() => {
    // Animate code typing effect
    const chars = codeSnippet.split('');
    const interval = setInterval(() => {
      setCodeProgress(prev => {
        if (prev >= chars.length) {
          clearInterval(interval);
          return chars.length;
        }
        return prev + 3;
      });
    }, 10);

    // Feature rotation
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);

    // ScrollTrigger animations
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      clearInterval(interval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Real-Time Operating System
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Military-grade RTOS integration enabling deterministic response times 
            and parallel processing for advanced drone detection algorithms
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Code Display */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-sm opacity-30"></div>
            <div className="relative bg-black rounded-lg p-6 border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-xs text-gray-500">drone_detection.c</span>
              </div>
              <pre ref={codeRef} className="text-sm text-green-400 font-mono overflow-x-auto">
                <code>{codeSnippet.slice(0, codeProgress)}</code>
                <span className="animate-pulse">|</span>
              </pre>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card relative p-6 rounded-xl border transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 scale-105 shadow-2xl shadow-cyan-500/20' 
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.value}{feature.unit}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
                
                {activeFeature === index && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-20 blur-sm animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">FreeRTOS Core</h3>
            <p className="text-gray-400">Industry-standard real-time kernel with proven reliability in aerospace applications</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hardware Acceleration</h3>
            <p className="text-gray-400">GPU and FPGA integration for parallel processing of detection algorithms</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure Boot</h3>
            <p className="text-gray-400">Cryptographically verified boot process ensuring system integrity</p>
          </div>
        </div>
      </div>
    </section>
  );
}

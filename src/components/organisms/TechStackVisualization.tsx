// src/components/organisms/TechStackVisualization.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechLayer {
  name: string;
  technologies: string[];
  color: string;
  icon: string;
}

export default function TechStackVisualization() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const techLayers: TechLayer[] = [
    {
      name: 'Hardware Layer',
      technologies: ['FPGA', 'ARM Cortex', 'GPU Acceleration', 'Sensor Arrays'],
      color: 'from-red-500 to-orange-500',
      icon: '🔧',
    },
    {
      name: 'RTOS Layer',
      technologies: ['FreeRTOS', 'NuttX', 'Real-time Scheduling', 'HAL'],
      color: 'from-orange-500 to-yellow-500',
      icon: '⚡',
    },
    {
      name: 'Middleware',
      technologies: ['ROS2', 'MAVLink', 'DDS', 'Message Queues'],
      color: 'from-yellow-500 to-green-500',
      icon: '🔄',
    },
    {
      name: 'AI/ML Layer',
      technologies: ['TensorFlow Lite', 'YOLO', 'Computer Vision', 'Sensor Fusion'],
      color: 'from-green-500 to-cyan-500',
      icon: '🤖',
    },
    {
      name: 'Application Layer',
      technologies: ['React', 'WebRTC', 'REST APIs', 'WebSockets'],
      color: 'from-cyan-500 to-blue-500',
      icon: '📱',
    },
    {
      name: 'Cloud Services',
      technologies: ['AWS', 'Real-time Analytics', 'Data Storage', 'ML Pipeline'],
      color: 'from-blue-500 to-purple-500',
      icon: '☁️',
    },
  ];

  useEffect(() => {
    if (stackRef.current) {
      const layers = stackRef.current.querySelectorAll('.tech-layer');
      
      gsap.fromTo(layers,
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3D rotation effect on hover
      layers.forEach((layer) => {
        layer.addEventListener('mouseenter', () => {
          gsap.to(layer, {
            rotateY: 5,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        
        layer.addEventListener('mouseleave', () => {
          gsap.to(layer, {
            rotateY: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Full-stack drone technology architecture from hardware to cloud
          </p>
        </div>

        <div ref={stackRef} className="max-w-5xl mx-auto perspective-1000">
          {techLayers.map((layer, index) => (
            <div
              key={index}
              className="tech-layer relative mb-4 transform-gpu"
              style={{
                transformStyle: 'preserve-3d',
                zIndex: techLayers.length - index,
              }}
            >
              <div className={`relative bg-gradient-to-r ${layer.color} p-1 rounded-xl`}>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{layer.icon}</span>
                      <h3 className="text-2xl font-bold text-white">{layer.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                             style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {layer.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="bg-black/30 rounded-lg px-3 py-2 text-center border border-gray-700 hover:border-gray-500 transition-colors"
                      >
                        <span className="text-sm text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Connection lines */}
              {index < techLayers.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-8 -bottom-8 bg-gradient-to-b from-gray-500 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// src/components/organisms/InnovationMetrics.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export default function InnovationMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const metrics: Metric[] = [
    {
      label: 'Patents Filed',
      value: 12,
      suffix: '+',
      description: 'Innovative drone technologies',
    },
    {
      label: 'R&D Investment',
      value: 3.5,
      suffix: 'M',
      prefix: '$',
      description: 'Annual research budget',
    },
    {
      label: 'AI Models',
      value: 47,
      suffix: '',
      description: 'Trained detection models',
    },
    {
      label: 'Success Rate',
      value: 99.7,
      suffix: '%',
      description: 'Detection accuracy',
    },
    {
      label: 'Response Time',
      value: 1.2,
      suffix: 's',
      description: 'Average threat detection',
    },
    {
      label: 'Team Members',
      value: 85,
      suffix: '+',
      description: 'Engineers & researchers',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            
            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              
              setCounters(metrics.map((metric) => {
                return Math.floor(metric.value * progress * 10) / 10;
              }));
              
              if (currentStep >= steps) {
                clearInterval(interval);
                setCounters(metrics.map(m => m.value));
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
      // Animate metric cards
      const cards = sectionRef.current.querySelectorAll('.metric-card');
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
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-black to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Innovation by Numbers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Driving the future of drone technology through continuous innovation and investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300" />
              
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {metric.prefix}{counters[index].toFixed(metric.value % 1 !== 0 ? 1 : 0)}{metric.suffix}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{metric.label}</h3>
                <p className="text-sm text-gray-400">{metric.description}</p>
                
                {/* Progress bar */}
                <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-2000 ease-out"
                    style={{ width: `${(counters[index] / metric.value) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <span>Explore Our Technology</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

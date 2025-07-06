'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/molecules/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Drainage Inspection',
    description: 'AI-powered inspection system achieving 900m/day with 80% carbon reduction',
    icon: '🚁',
    gradient: 'from-green-500 to-emerald-500',
    metrics: [
      { label: 'Speed', value: '900m/day', percentage: 90 },
      { label: 'Carbon Reduction', value: '80%', percentage: 80 },
      { label: 'Accuracy', value: '99.5%', percentage: 99.5 },
    ],
  },
  {
    title: 'Elphel Military Cameras',
    description: 'Military-grade imaging with 0.05 pixel disparity resolution',
    icon: '📷',
    gradient: 'from-blue-500 to-cyan-500',
    metrics: [
      { label: 'Resolution', value: '0.05px', percentage: 95 },
      { label: 'Thermal Integration', value: '100%', percentage: 100 },
      { label: 'Open Source', value: '100%', percentage: 100 },
    ],
  },
  {
    title: 'RTOS Development',
    description: 'Real-time operating systems with 500Hz-1kHz update rates for InterProInvest',
    icon: '⚙️',
    gradient: 'from-purple-500 to-pink-500',
    metrics: [
      { label: 'Update Rate', value: '1kHz', percentage: 100 },
      { label: 'Latency', value: '<1ms', percentage: 95 },
      { label: 'Reliability', value: '99.99%', percentage: 99.99 },
    ],
  },
];

export default function ServiceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (section && title) {
      // Title animation
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Parallax effect
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        backgroundPosition: '50% 100%',
        ease: 'none',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 relative bg-gradient-to-b from-black via-gray-900 to-black"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.05) 0%, transparent 70%)',
        backgroundSize: '100% 200%',
        backgroundPosition: '50% 0%',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-center mb-4 text-gradient"
        >
          Our Services
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          Cutting-edge drone technology solutions tailored for modern industrial challenges
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

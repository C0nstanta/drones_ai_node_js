'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DrainageStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const stats = section.querySelectorAll('.stat-number');
    
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
            }
          });
        }
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gradient">
          Drainage Revolution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Traditional Method</h3>
            <p className="text-5xl font-bold text-white stat-number" data-target="100" data-suffix="m/day">0m/day</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Our Solution</h3>
            <p className="text-5xl font-bold text-green-400 stat-number" data-target="900" data-suffix="m/day">0m/day</p>
          </div>
          
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-8 border border-green-500/30">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Carbon Reduction</h3>
            <p className="text-5xl font-bold text-blue-400 stat-number" data-target="80" data-suffix="%">0%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

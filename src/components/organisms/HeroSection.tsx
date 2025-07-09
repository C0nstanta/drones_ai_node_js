'use client';

import React, { useEffect, useRef, useState } from 'react';
import GlowButton from '@/components/atoms/GlowButton/GlowButton';
import { ParticleBackground } from '@/components/atoms/ParticleBackground/ParticleBackground';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      
      // Set initial states
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word');
        gsap.set(words, { y: 100, opacity: 0 });
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      }
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current.children, { y: 50, opacity: 0 });
      }
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0, y: -20 });
      }

      setIsLoaded(true);

      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate title
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.hero-word');
        tl.to(words, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
        }, '-=0.5');
      }

      // Animate buttons
      if (buttonsRef.current) {
        tl.to(buttonsRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
        }, '-=0.5');
      }

      // Animate scroll indicator
      if (scrollRef.current) {
        tl.to(scrollRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
        });
      }

      return () => {
        tl.kill();
      };
    };

    loadGSAP();
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className={`hero-word inline-block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ${!isLoaded ? 'opacity-0' : ''}`}>
            AI-Powered
          </span>{' '}
          <span className={`hero-word inline-block ${!isLoaded ? 'opacity-0' : ''}`}>Drone</span>{' '}
          <span className={`hero-word inline-block ${!isLoaded ? 'opacity-0' : ''}`}>Solutions</span>
        </h1>
        
        <p ref={subtitleRef} className={`text-xl md:text-2xl text-gray-300 mb-8 ${!isLoaded ? 'opacity-0' : ''}`}>
          Revolutionary technology for the future of inspection
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton size="large" className={!isLoaded ? 'opacity-0' : ''}>
            Explore Our Technology
          </GlowButton>
          <GlowButton variant="secondary" size="large" className={!isLoaded ? 'opacity-0' : ''}>
            Schedule Demo
          </GlowButton>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        ref={scrollRef}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce cursor-pointer ${!isLoaded ? 'opacity-0' : ''}`}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
}

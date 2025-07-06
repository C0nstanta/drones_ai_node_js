'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import GlowButton from '@/components/atoms/GlowButton';
import ParticleBackground from '@/components/atoms/ParticleBackground';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Title animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.hero-word');
      tl.from(words, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }

    // Subtitle typewriter effect
    if (subtitleRef.current) {
      tl.to(subtitleRef.current, {
        text: 'Revolutionary technology for the future of inspection',
        duration: 2,
        ease: 'none',
      }, '-=0.5');
    }

    // Buttons fade in
    if (buttonsRef.current) {
      tl.from(buttonsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=1');
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.from(scrollRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power3.out',
      });
    }

    return () => {
      tl.kill();
    };
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
          <span className="hero-word inline-block text-gradient">AI-Powered</span>{' '}
          <span className="hero-word inline-block">Drone</span>{' '}
          <span className="hero-word inline-block">Solutions</span>
        </h1>
        
        <p 
          ref={subtitleRef} 
          className="text-xl md:text-2xl text-gray-300 mb-8 h-8"
        />
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton size="large">
            Explore Our Technology
          </GlowButton>
          <GlowButton variant="secondary" size="large">
            Schedule Demo
          </GlowButton>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce cursor-pointer"
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

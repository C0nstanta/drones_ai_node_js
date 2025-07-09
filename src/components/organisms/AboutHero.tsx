// src/components/organisms/AboutHero.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './AboutHero.module.css';

// Particle system for background
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00ff88';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff88';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
};

export default function AboutHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Set initial states
      if (titleRef.current) {
        gsap.set(titleRef.current.children, { y: 100, opacity: 0 });
      }
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
      }
      if (contentRef.current) {
        gsap.set(contentRef.current.children, { opacity: 0, y: 30 });
      }
      
      setIsLoaded(true);
      
      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Animate title words
      if (titleRef.current) {
        tl.to(titleRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
        });
      }
      
      // Animate subtitle
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
        }, '-=0.6');
      }
      
      // Animate content blocks
      if (contentRef.current) {
        tl.to(contentRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
        }, '-=0.4');
      }
      
      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    };
    
    loadAnimations();
  }, []);
  
  return (
    <section className={styles.hero}>
      <ParticleField />
      
      {/* Gradient overlays */}
      <div className={styles.gradientOverlay1} />
      <div className={styles.gradientOverlay2} />
      
      {/* Glassmorphic shapes */}
      <div className={styles.glassShape1} />
      <div className={styles.glassShape2} />
      
      {/* Content */}
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          <span className={`${styles.titleWord} ${!isLoaded ? styles.hidden : ''}`}>
            Pioneering
          </span>
          <span className={`${styles.titleWord} ${!isLoaded ? styles.hidden : ''}`}>
            the Future
          </span>
          <span className={`${styles.titleWord} ${!isLoaded ? styles.hidden : ''}`}>
            of Drone
          </span>
          <span className={`${styles.titleWord} ${!isLoaded ? styles.hidden : ''}`}>
            Technology
          </span>
        </h1>
        
        <p ref={subtitleRef} className={`${styles.subtitle} ${!isLoaded ? styles.hidden : ''}`}>
          From Houston to the World: Revolutionizing Industries with Autonomous Intelligence
        </p>
        
        <div ref={contentRef} className={styles.statsContainer}>
          <div className={`${styles.statBlock} ${!isLoaded ? styles.hidden : ''}`}>
            <div className={styles.statNumber}>80%</div>
            <div className={styles.statLabel}>Carbon Reduction</div>
          </div>
          <div className={`${styles.statBlock} ${!isLoaded ? styles.hidden : ''}`}>
            <div className={styles.statNumber}>900m</div>
            <div className={styles.statLabel}>Daily Inspection</div>
          </div>
          <div className={`${styles.statBlock} ${!isLoaded ? styles.hidden : ''}`}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Strategic Partners</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={`${styles.scrollIndicator} scroll-indicator`}>
        <ChevronDown size={32} />
        <span className={styles.scrollText}>Discover Our Story</span>
      </div>
    </section>
  );
}

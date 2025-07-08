'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${15 + Math.random() * 20}s`;
      particlesRef.current?.appendChild(particle);
    };

    // Generate multiple particles
    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    const tl = gsap.timeline();

    // Animate overlay
    tl.to(overlayRef.current, {
      opacity: 0.7,
      duration: 2,
      ease: 'power2.inOut'
    });

    // Animate title with split text effect
    if (titleRef.current) {
      const words = titleRef.current.innerText.split(' ');
      titleRef.current.innerHTML = words.map(word => 
        `<span class="${styles.word}">${word}</span>`
      ).join(' ');
      
      tl.from(`.${styles.word}`, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=1');
    }

    // Animate subtitle
    tl.from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background with Salt Lake City imagery */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundImage} />
        <div ref={overlayRef} className={styles.overlay} />
        <div className={styles.gridPattern} />
        <div ref={particlesRef} className={styles.particlesContainer} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Pioneering Drone Innovation from Salt Lake City
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Proudly headquartered in the heart of Silicon Slopes, 
          delivering cutting-edge AI drone solutions to the Mountain West and beyond
        </p>
        
        {/* Animated scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollIcon}>
            <div className={styles.scrollWheel} />
          </div>
          <svg className={styles.mountainIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,21L10,21L10,20L6.5,13.5L1,21L1,19L6.5,11L10,17.5L14,11L22,21L22,19L14,9L14,21Z"/>
          </svg>
        </div>
      </div>

      {/* Animated drone silhouette */}
      <div className={styles.droneAnimation}>
        <svg className={styles.drone} viewBox="0 0 100 100">
          <path d="M50 30 L30 40 L30 60 L50 70 L70 60 L70 40 Z" fill="currentColor" opacity="0.3"/>
          <circle cx="30" cy="40" r="8" fill="currentColor" opacity="0.5"/>
          <circle cx="70" cy="40" r="8" fill="currentColor" opacity="0.5"/>
          <circle cx="30" cy="60" r="8" fill="currentColor" opacity="0.5"/>
          <circle cx="70" cy="60" r="8" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
    </section>
  );
}

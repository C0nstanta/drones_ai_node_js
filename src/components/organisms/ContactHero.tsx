// File: /src/components/organisms/ContactHero.tsx
// Absolute path: /src/components/organisms/ContactHero.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactHero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactHero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        }
      );

      // Wave animation
      gsap.to(waveRef.current, {
        backgroundPosition: "200% 0%",
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div ref={waveRef} className={styles.waveBackground} />
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Let's Build the Future Together
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Partner with Adaptive Auto Hub for revolutionary drone solutions
        </p>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}

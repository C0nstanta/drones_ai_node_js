// /src/components/organisms/ContactHero.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import styles from './ContactHero.module.css';
import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from 'react-icons/fi';

gsap.registerPlugin(TextPlugin);

const ContactHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typewriter effect for title
      gsap.to(titleRef.current, {
        duration: 2,
        text: "Let's Connect",
        ease: "none",
        delay: 0.5,
      });

      // Fade in subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2.5 }
      );

      // Floating animation for icons
      const icons = iconsRef.current?.querySelectorAll(`.${styles.contactIcon}`);
      icons?.forEach((icon, index) => {
        gsap.fromTo(icon,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: 3 + index * 0.2,
            ease: "back.out(1.7)"
          }
        );

        // Continuous floating animation
        gsap.to(icon, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-15, 15)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 4 + index * 0.5
        });
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Circuit pattern animation
      const circuits = heroRef.current?.querySelectorAll(`.${styles.circuit}`);
      circuits?.forEach((circuit) => {
        gsap.to(circuit, {
          strokeDashoffset: 0,
          duration: 3,
          repeat: -1,
          ease: "none"
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.backgroundPattern}>
        <svg className={styles.circuitSvg} viewBox="0 0 1920 600">
          <path
            className={styles.circuit}
            d="M0,300 L200,300 L250,250 L400,250 L450,300 L600,300"
            stroke="#00ff88"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <path
            className={styles.circuit}
            d="M1920,200 L1720,200 L1670,150 L1520,150 L1470,200 L1320,200"
            stroke="#0088ff"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
          <circle cx="250" cy="250" r="5" fill="#00ff88" className={styles.circuitNode} />
          <circle cx="450" cy="300" r="5" fill="#00ff88" className={styles.circuitNode} />
          <circle cx="1670" cy="150" r="5" fill="#0088ff" className={styles.circuitNode} />
          <circle cx="1470" cy="200" r="5" fill="#0088ff" className={styles.circuitNode} />
        </svg>
      </div>

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}></h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          We're here to help you elevate your business with AI-powered drone solutions
        </p>

        <div ref={iconsRef} className={styles.iconContainer}>
          <div className={`${styles.contactIcon} ${styles.emailIcon}`}>
            <FiMail size={32} />
          </div>
          <div className={`${styles.contactIcon} ${styles.phoneIcon}`}>
            <FiPhone size={32} />
          </div>
          <div className={`${styles.contactIcon} ${styles.locationIcon}`}>
            <FiMapPin size={32} />
          </div>
          <div className={`${styles.contactIcon} ${styles.messageIcon}`}>
            <FiMessageCircle size={32} />
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.ctaPrimary}>
            Start a Conversation
          </button>
          <button className={styles.ctaSecondary}>
            Schedule a Demo
          </button>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
};

export default ContactHero;

// src/components/organisms/MissionValues.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { Leaf, Code, Shield, Zap, Globe, Users } from 'lucide-react';
import styles from './MissionValues.module.css';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric?: string;
  color: string;
}

const values: Value[] = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Environmental Impact',
    description: 'Committed to reducing carbon emissions through efficient drone technology',
    metric: '80% Carbon Reduction',
    color: 'green'
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: 'Open Source Innovation',
    description: 'Building transparent, collaborative solutions for the global community',
    metric: 'Community-Driven',
    color: 'blue'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Security First',
    description: 'Military-grade technology ensuring safety and reliability in all operations',
    metric: 'Zero Compromises',
    color: 'purple'
  }
];

const additionalValues = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Rapid Innovation',
    description: 'Agile development with cutting-edge technology'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Global Impact',
    description: 'Solutions that scale across industries worldwide'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Partnership Focus',
    description: 'Strategic alliances with industry leaders'
  }
];

export default function MissionValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate mission statement
      gsap.fromTo('.mission-statement',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.mission-statement',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate value cards with stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.value-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      
      // Animate additional values
      const additionalCards = document.querySelectorAll('.additional-value');
      gsap.fromTo(additionalCards,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.additional-values',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };
    
    loadAnimations();
  }, []);
  
  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background effects */}
      <div className={styles.backgroundPattern} />
      <div className={styles.glowEffect1} />
      <div className={styles.glowEffect2} />
      
      <div className={styles.container}>
        {/* Mission Statement */}
        <div className={`${styles.missionStatement} mission-statement`}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            To revolutionize industries through autonomous drone technology, 
            creating sustainable solutions that protect our planet while 
            advancing human capabilities.
          </p>
        </div>
        
        {/* Core Values */}
        <h3 className={styles.valuesTitle}>Core Values</h3>
        <div ref={cardsRef} className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div
              key={index}
              className={`${styles.valueCard} ${styles[value.color]} value-card`}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconContainer}>
                  {value.icon}
                  <div className={styles.iconGlow} />
                </div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
                {value.metric && (
                  <div className={styles.metric}>{value.metric}</div>
                )}
                <div className={styles.cardBackground} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Values */}
        <div className={`${styles.additionalValues} additional-values`}>
          <h3 className={styles.additionalTitle}>We Also Believe In</h3>
          <div className={styles.additionalGrid}>
            {additionalValues.map((value, index) => (
              <div
                key={index}
                className={`${styles.additionalValue} additional-value`}
              >
                <div className={styles.additionalIcon}>{value.icon}</div>
                <div>
                  <h5 className={styles.additionalValueTitle}>{value.title}</h5>
                  <p className={styles.additionalValueDesc}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

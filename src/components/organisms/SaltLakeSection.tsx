'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SaltLakeSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: '🏔️',
    title: 'High-Altitude Testing',
    description: 'Perfect environment for testing drone performance at various elevations from 4,200 to 11,000 feet',
    stats: '4,226 ft elevation'
  },
  {
    icon: '💡',
    title: 'Silicon Slopes Hub',
    description: 'Access to top tech talent and innovation ecosystem in the fastest-growing tech corridor',
    stats: '#1 in job growth'
  },
  {
    icon: '🌤️',
    title: 'Diverse Weather Conditions',
    description: 'Four distinct seasons provide comprehensive testing for weather-resistant drone technology',
    stats: '300+ sunny days'
  },
  {
    icon: '🤝',
    title: 'Strategic Location',
    description: 'Central position in the Mountain West for rapid deployment across western states',
    stats: '5-state reach'
  }
];

export default function SaltLakeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Animate advantage cards
    const cards = sectionRef.current?.querySelectorAll(`.${styles.advantageCard}`);
    
    cards?.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          }
        }
      );
    });

    // Animate map section with 3D effect
    gsap.fromTo(mapRef.current,
      {
        opacity: 0,
        scale: 0.8,
        rotateX: -15
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 70%'
        }
      }
    );

    // Animate map elements
    const markerPulse = mapRef.current?.querySelector(`.${styles.markerPulse}`);
    if (markerPulse) {
      gsap.to(markerPulse, {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out'
      });
    }

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = styles.mapParticle;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      mapRef.current?.appendChild(particle);
      
      setTimeout(() => particle.remove(), 5000);
    };

    const particleInterval = setInterval(createParticle, 500);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Salt Lake City?</h2>
          <p className={styles.subtitle}>
            Our strategic location in Utah's capital provides unique advantages 
            for drone technology development and deployment
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.advantages}>
            {advantages.map((advantage, index) => (
              <div 
                key={index} 
                className={styles.advantageCard}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{advantage.icon}</span>
                    <div className={styles.iconGlow} />
                  </div>
                  <h3 className={styles.advantageTitle}>{advantage.title}</h3>
                  <p className={styles.advantageDescription}>{advantage.description}</p>
                  <div className={styles.statBadge}>
                    <span className={styles.statValue}>{advantage.stats}</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className={`${styles.cardHover} ${hoveredCard === index ? styles.active : ''}`} />
                </div>
              </div>
            ))}
          </div>

          <div ref={mapRef} className={styles.mapContainer}>
            <div className={styles.map}>
              {/* 3D Map visualization */}
              <div className={styles.mapContent}>
                <div className={styles.mapGrid}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={styles.gridLine} style={{
                      transform: `translateZ(${i * 10}px)`
                    }} />
                  ))}
                </div>
                
                {/* HQ Marker */}
                <div className={styles.hqMarker}>
                  <div className={styles.markerPulse} />
                  <div className={styles.markerCore}>
                    <div className={styles.markerIcon}>📍</div>
                  </div>
                  <div className={styles.markerBeam} />
                </div>
                
                <div className={styles.mapOverlay}>
                  <h4 className={styles.locationTitle}>Headquarters</h4>
                  <p className={styles.locationAddress}>Downtown Salt Lake City</p>
                  <p className={styles.coordinates}>40.7608° N, 111.8910° W</p>
                </div>

                {/* Mountain silhouettes */}
                <svg className={styles.mountains} viewBox="0 0 1200 400">
                  <path d="M0,400 L200,200 L400,300 L600,100 L800,250 L1000,150 L1200,300 L1200,400 Z" 
                        fill="url(#mountainGradient)" opacity="0.3"/>
                  <defs>
                    <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#0088ff" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statCircle}>
                  <span className={styles.statNumber}>300+</span>
                </div>
                <span className={styles.statLabel}>Days of Sunshine</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statCircle}>
                  <span className={styles.statNumber}>4,226</span>
                </div>
                <span className={styles.statLabel}>Feet Elevation</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statCircle}>
                  <span className={styles.statNumber}>#1</span>
                </div>
                <span className={styles.statLabel}>Tech Job Growth</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <button className={styles.ctaButton}>
            <span>Visit Our Headquarters</span>
            <div className={styles.ctaGlow} />
          </button>
        </div>
      </div>
    </section>
  );
}

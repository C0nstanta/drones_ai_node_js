'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PartnershipsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  {
    name: 'InterProInvest',
    type: 'Strategic Partner',
    description: 'Defense technology and anti-drone systems',
    logo: '/logos/interproinvest.svg',
    color: '#ff6b6b'
  },
  {
    name: 'Elphel',
    type: 'Technology Partner',
    description: 'Advanced thermal imaging and camera systems',
    logo: '/logos/elphel.svg',
    color: '#4ecdc4'
  },
  {
    name: 'University of Utah',
    type: 'Research Partner',
    description: 'Collaborative R&D in AI and autonomous systems',
    logo: '/logos/university-utah.svg',
    color: '#cc5de8'
  },
  {
    name: 'Silicon Slopes',
    type: 'Community Partner',
    description: 'Utah\'s premier tech community',
    logo: '/logos/silicon-slopes.svg',
    color: '#20c997'
  }
];

const achievements = [
  { value: 15, suffix: '+', label: 'Local Partnerships' },
  { value: 50, suffix: '+', label: 'Utah Employees' },
  { value: 2, suffix: 'M+', prefix: '$', label: 'Local Economic Impact' },
  { value: 5, suffix: '', label: 'Innovation Awards' }
];

export default function PartnershipsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const connectionRefs = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Animate partner cards with 3D entrance
    const partnerCards = partnersRef.current?.querySelectorAll(`.${styles.partnerCard}`);
    
    partnerCards?.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          scale: 0.5,
          rotateY: -180,
          z: -200
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          z: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          }
        }
      );
    });

    // Animate achievement counters
    const achievementItems = achievementsRef.current?.querySelectorAll(`.${styles.achievement}`);
    
    achievementItems?.forEach((item, index) => {
      const valueEl = item.querySelector(`.${styles.achievementValue}`);
      const finalValue = achievements[index].value;
      
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
              // Animate number counting
              gsap.to({}, {
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                  const progress = this.progress();
                  const currentValue = Math.round(finalValue * progress);
                  if (valueEl) {
                    valueEl.textContent = 
                      `${achievements[index].prefix || ''}${currentValue}${achievements[index].suffix}`;
                  }
                }
              });
            }
          }
        }
      );
    });

    // Animate connection lines
    const paths = connectionRefs.current?.querySelectorAll('path');
    paths?.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: partnersRef.current,
          start: 'top 60%'
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Strategic Partnerships</h2>
          <p className={styles.subtitle}>
            Collaborating with industry leaders and local innovators to push boundaries
          </p>
        </div>

        {/* Connection lines SVG */}
        <svg ref={connectionRefs} className={styles.connections} viewBox="0 0 1200 400">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0"/>
              <stop offset="50%" stopColor="#00ff88" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M100,200 Q600,100 1100,200" stroke="url(#connectionGradient)" strokeWidth="2" fill="none"/>
          <path d="M200,200 Q600,300 1000,200" stroke="url(#connectionGradient)" strokeWidth="2" fill="none"/>
        </svg>

        <div ref={partnersRef} className={styles.partnersGrid}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.partnerCard}>
              <div className={styles.partnerInner}>
                <div className={styles.partnerLogo} style={{
                  '--partner-color': partner.color
                } as React.CSSProperties}>
                  <div className={styles.logoGlow} />
                  <div className={styles.logoPlaceholder}>
                    {partner.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                
                <h3 className={styles.partnerName}>{partner.name}</h3>
                <span className={styles.partnerType}>{partner.type}</span>
                <p className={styles.partnerDescription}>{partner.description}</p>
                
                <div className={styles.partnerStats}>
                  <div className={styles.statDot} />
                  <span>Active Collaboration</span>
                </div>

                {/* Hover effects */}
                <div className={styles.cardCorners}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.communitySection}>
          <h3 className={styles.communityTitle}>Community Impact</h3>
          <p className={styles.communityText}>
            As a proud member of the Utah business community, we're committed to 
            fostering innovation and creating opportunities in the Mountain West region.
          </p>

          <div ref={achievementsRef} className={styles.achievements}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievement}>
                <div className={styles.achievementCircle}>
                  <svg className={styles.achievementRing} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff88" strokeWidth="2"
                            strokeDasharray={`${283 * 0.75} 283`}
                            transform="rotate(-90 50 50)"/>
                  </svg>
                  <div className={styles.achievementContent}>
                    <div className={styles.achievementValue}>0</div>
                    <div className={styles.achievementLabel}>{achievement.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

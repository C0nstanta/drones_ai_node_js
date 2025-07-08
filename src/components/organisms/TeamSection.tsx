'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TeamSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former NASA engineer with 15 years in autonomous systems',
    specialties: ['AI Systems', 'Autonomous Navigation'],
    avatar: '/images/team/sarah-chen.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    bio: 'Led drone development at major defense contractors',
    specialties: ['RTOS Development', 'Hardware Integration'],
    avatar: '/images/team/michael-rodriguez.jpg'
  },
  {
    name: 'Emily Thompson',
    role: 'Head of AI',
    bio: 'PhD in Computer Vision from University of Utah',
    specialties: ['Computer Vision', 'Machine Learning'],
    avatar: '/images/team/emily-thompson.jpg'
  },
  {
    name: 'David Park',
    role: 'VP of Operations',
    bio: 'Scaled operations for multiple Utah tech unicorns',
    specialties: ['Operations', 'Strategic Planning'],
    avatar: '/images/team/david-park.jpg'
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(`.${styles.teamCard}`);
    
    // Stagger card animations
    cards?.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
          rotateY: -30,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%'
          }
        }
      );
    });

    // Animate section title
    const title = sectionRef.current?.querySelector(`.${styles.title}`);
    gsap.fromTo(title,
      {
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: 'top 80%'
        }
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    
    gsap.to(card, {
      rotateY: x,
      rotateX: y,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Meet Our Team</h2>
          <p className={styles.subtitle}>
            Utah's brightest minds driving the future of drone technology
          </p>
        </div>

        <div ref={cardsRef} className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={styles.teamCard}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                setHoveredIndex(null);
              }}
            >
              <div className={styles.cardInner}>
                {/* 3D effect layer */}
                <div className={`${styles.cardBg} ${hoveredIndex === index ? styles.active : ''}`} />
                
                <div className={styles.avatar}>
                  <div className={styles.avatarGlow} />
                  <div className={styles.avatarPlaceholder}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Tech circuit pattern overlay */}
                  <svg className={styles.avatarCircuit} viewBox="0 0 100 100">
                    <path d="M20,50 L80,50 M50,20 L50,80 M30,30 L70,70 M70,30 L30,70" 
                          stroke="currentColor" 
                          strokeWidth="0.5" 
                          fill="none" 
                          opacity="0.3"/>
                  </svg>
                </div>
                
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.memberBio}>{member.bio}</p>
                
                <div className={styles.specialties}>
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className={styles.specialty}>
                      <span className={styles.specialtyDot} />
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Hover effect elements */}
                <div className={styles.cardGlow} />
                <div className={styles.cardBorder} />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.joinTeam}>
          <div className={styles.joinContent}>
            <h3 className={styles.joinTitle}>Join Our Growing Team</h3>
            <p className={styles.joinText}>
              We're always looking for talented individuals who share our passion for innovation
            </p>
            <button className={styles.joinButton}>
              <span>View Open Positions</span>
              <svg className={styles.joinArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

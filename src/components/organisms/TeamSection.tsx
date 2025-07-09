// src/components/organisms/TeamSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, Shield, Code, Cpu, Globe } from 'lucide-react';
import styles from './TeamSection.module.css';

interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  icon: React.ReactNode;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    expertise: ['Aerospace Engineering', 'AI/ML', 'Strategic Partnerships'],
    bio: 'Former NASA engineer with 15+ years in autonomous systems. Led breakthrough projects in drone navigation.',
    icon: <Globe className="w-6 h-6" />,
    gradient: 'green'
  },
  {
    name: 'Col. Michael Rodriguez',
    role: 'CTO & Defense Liaison',
    expertise: ['Military Technology', 'RTOS Development', 'Security Systems'],
    bio: '20 years USAF, specialized in UAV operations. Architect of our anti-drone defense systems.',
    icon: <Shield className="w-6 h-6" />,
    gradient: 'blue'
  },
  {
    name: 'Anna Kovalenko',
    role: 'Head of AI Research',
    expertise: ['Computer Vision', 'Neural Networks', 'Real-time Processing'],
    bio: 'PhD in AI from MIT. Published 30+ papers on autonomous navigation and computer vision.',
    icon: <Cpu className="w-6 h-6" />,
    gradient: 'purple'
  },
  {
    name: 'James Thompson',
    role: 'VP of Engineering',
    expertise: ['Embedded Systems', 'Hardware Integration', 'Thermal Imaging'],
    bio: 'Led Elphel partnership integration. Expert in thermal camera systems and embedded computing.',
    icon: <Code className="w-6 h-6" />,
    gradient: 'orange'
  }
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  
  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate section title
      gsap.fromTo('.team-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.team-title',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate team cards
      const cards = document.querySelectorAll('.team-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };
    
    loadAnimations();
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };
  
  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background mesh gradient */}
      <div className={styles.meshGradient} />
      
      <div className={styles.container}>
        <h2 className={`${styles.title} team-title`}>Leadership Team</h2>
        <p className={`${styles.subtitle} team-title`}>
          Visionaries with decades of combined experience in aerospace, AI, and defense
        </p>
        
        <div className={`${styles.teamGrid} team-grid`}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`${styles.teamCard} ${styles[member.gradient]} team-card`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredMember(index)}
            >
              <div className={styles.cardInner}>
                {/* Glow effect */}
                <div className={`${styles.glowEffect} ${hoveredMember === index ? styles.active : ''}`} />
                
                {/* Icon */}
                <div className={styles.iconWrapper}>
                  {member.icon}
                </div>
                
                {/* Content */}
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
                
                <div className={styles.expertiseTags}>
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className={styles.tag}>
                      {skill}
                    </span>
                  ))}
                </div>
                
                <p className={styles.memberBio}>{member.bio}</p>
                
                {/* Contact buttons */}
                <div className={styles.contactButtons}>
                  <button className={styles.contactBtn} aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className={styles.contactBtn} aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
                
                {/* 3D effect overlay */}
                <div className={styles.overlay} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Join team CTA */}
        <div className={styles.joinTeam}>
          <h3 className={styles.joinTitle}>Join Our Team</h3>
          <p className={styles.joinText}>
            We're always looking for exceptional talent to help shape the future of drone technology
          </p>
          <button className={styles.joinButton}>
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  );
}

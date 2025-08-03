// src/components/organisms/CompanyStory.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { Calendar, Users, Rocket, Globe, Target, Award } from 'lucide-react';
import styles from './CompanyStory.module.css';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2025',
    title: 'Founded in Houston, Texas',
    description: 'Established headquarters in Space City, leveraging the aerospace ecosystem for drone innovation',
    icon: <Rocket className="w-6 h-6" />,
    highlight: true
  },
  {
    year: '2025',
    title: 'InterProInvest Partnership',
    description: 'Strategic alliance with Ukrainian military technology leader for anti-drone defense systems',
    icon: <Users className="w-6 h-6" />
  },
  {
    year: '2025',
    title: 'Elphel Collaboration',
    description: 'Partnership with Elphel for advanced thermal imaging solutions and AFWERX contracts',
    icon: <Target className="w-6 h-6" />
  },
  {
    year: '2026',
    title: 'AI Drainage System Launch',
    description: 'Revolutionary 900m/day inspection capability reducing carbon emissions by 80%',
    icon: <Globe className="w-6 h-6" />
  },
  {
    year: '2026',
    title: 'RTOS Development',
    description: 'Real-time operating system integration for military-grade drone applications',
    icon: <Award className="w-6 h-6" />
  },
  {
    year: 'Future',
    title: 'Texas Expansion',
    description: 'Planning second office for civil projects, oil & gas, and infrastructure monitoring',
    icon: <Calendar className="w-6 h-6" />
  }
];

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate section title
      gsap.fromTo('.story-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.story-title',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate timeline events
      const events = document.querySelectorAll('.timeline-event');
      events.forEach((event, index) => {
        gsap.fromTo(event,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: event,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
      
      // Animate timeline line
      if (timelineRef.current) {
        const line = timelineRef.current.querySelector('.timeline-line');
        if (line) {
          gsap.fromTo(line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 2,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
                end: 'bottom 30%',
                scrub: 1
              }
            }
          );
        }
      }
    };
    
    loadAnimations();
  }, []);
  
  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} story-title`}>Our Journey</h2>
        <p className={`${styles.subtitle} story-title`}>
          From Houston's aerospace hub to global innovation leader
        </p>
        
        <div ref={timelineRef} className={styles.timeline}>
          <div className={`${styles.timelineLine} timeline-line`} />
          
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`${styles.timelineEvent} ${index % 2 === 0 ? styles.left : styles.right} ${event.highlight ? styles.highlight : ''} timeline-event`}
            >
              <div className={styles.eventContent}>
                <div className={styles.eventIcon}>
                  {event.icon}
                </div>
                <div className={styles.eventYear}>{event.year}</div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
              <div className={styles.eventDot} />
            </div>
          ))}
        </div>
        
        {/* Partnership logos section */}
        <div className={styles.partnersSection}>
          <h3 className={styles.partnersTitle}>Strategic Partnerships</h3>
          <div className={styles.partnersGrid}>
            <div className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <span className={styles.partnerInitial}>I</span>
              </div>
              <h4>InterProInvest</h4>
              <p>Military Defense Technology</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <span className={styles.partnerInitial}>E</span>
              </div>
              <h4>Elphel</h4>
              <p>Thermal Imaging Systems</p>
            </div>
            <div className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <span className={styles.partnerInitial}>A</span>
              </div>
              <h4>AFWERX</h4>
              <p>Air Force Innovation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

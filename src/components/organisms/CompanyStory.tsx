'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CompanyStory.module.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2019',
    title: 'Founded in Salt Lake City',
    description: 'Started with a vision to revolutionize drone technology in the heart of Silicon Slopes',
    icon: '🚀'
  },
  {
    year: '2020',
    title: 'First AI Integration',
    description: 'Pioneered AI-powered drainage inspection technology, achieving 900m/day inspection rates',
    icon: '🤖'
  },
  {
    year: '2021',
    title: 'Partnership with Elphel',
    description: 'Joined forces with Elphel to develop advanced thermal imaging solutions',
    icon: '🤝'
  },
  {
    year: '2023',
    title: 'InterProInvest Alliance',
    description: 'Expanded into defense sector with anti-drone RIFF systems',
    icon: '🛡️'
  },
  {
    year: '2024',
    title: 'Mountain West Expansion',
    description: 'Became the leading drone solutions provider across Utah, Colorado, and Wyoming',
    icon: '🏔️'
  }
];

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const milestoneElements = timelineRef.current?.querySelectorAll(`.${styles.milestone}`);
    
    // Create timeline progress animation
    gsap.to(progressRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });
    
    // Animate each milestone
    milestoneElements?.forEach((milestone, index) => {
      const isLeft = index % 2 === 0;
      
      gsap.fromTo(milestone,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: milestone,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate milestone icon
      const icon = milestone.querySelector(`.${styles.milestoneIcon}`);
      gsap.fromTo(icon,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: milestone,
            start: 'top 80%'
          }
        }
      );
    });

    // Animate section header
    const header = sectionRef.current?.querySelector(`.${styles.header}`);
    gsap.fromTo(header,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Journey</h2>
          <p className={styles.subtitle}>
            From a startup in downtown Salt Lake City to a leader in AI-powered drone solutions
          </p>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.timelineLine}>
            <div ref={progressRef} className={styles.timelineProgress} />
          </div>
          
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.year} 
              className={`${styles.milestone} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.milestoneContent}>
                <div className={styles.milestoneHeader}>
                  <span className={styles.year}>{milestone.year}</span>
                  <span className={styles.milestoneIcon}>{milestone.icon}</span>
                </div>
                <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                <p className={styles.milestoneDescription}>{milestone.description}</p>
              </div>
              <div className={styles.milestoneNode}>
                <div className={styles.nodeCore} />
                <div className={styles.nodePulse} />
              </div>
            </div>
          ))}
        </div>

        {/* Background decoration */}
        <div className={styles.backgroundDecoration}>
          <div className={styles.decorationGrid} />
        </div>
      </div>
    </section>
  );
}

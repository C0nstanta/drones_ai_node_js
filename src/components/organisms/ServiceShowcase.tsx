// File: /src/components/organisms/ServiceShowcase.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Camera, Shield } from 'lucide-react';
import CountUp from 'react-countup';
import styles from './ServiceShowcase.module.css';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  gradient: string;
  features: string[];
  link: string;
}

const services: ServiceData[] = [
  {
    id: 'drainage',
    title: 'AI Drainage Inspection',
    description: 'Revolutionary autonomous drainage inspection reducing carbon footprint by 80% while achieving 9x efficiency gains',
    icon: <Droplets size={48} />,
    metrics: [
      { label: 'Inspection Rate', value: '900', suffix: 'm/day' },
      { label: 'Carbon Reduction', value: '80', suffix: '%' },
      { label: 'Efficiency Gain', value: '9', suffix: 'x' }
    ],
    gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
    features: ['AI-Powered Analysis', 'Real-time Reporting', 'Predictive Maintenance', 'Environmental Impact Tracking'],
    link: '/services/drainage'
  },
  {
    id: 'elphel',
    title: 'Elphel Thermal Detection',
    description: 'Open-source LWIR technology with 20x sensitivity improvement for drone and foliage detection, partnered with U.S. Air Force AFWERX',
    icon: <Camera size={48} />,
    metrics: [
      { label: 'Sensitivity', value: '20', suffix: 'x improved' },
      { label: 'Range', value: '2.5', suffix: 'km' },
      { label: 'Processing', value: '0.087', suffix: 's/frame' }
    ],
    gradient: 'linear-gradient(135deg, #ff6b00 0%, #ff8800 100%)',
    features: ['LWIR Thermal Imaging', 'Through-Foliage Detection', 'Open-Source Hardware', 'AFWERX Partnership'],
    link: '/services/elphel'
  },
  {
    id: 'interproinvest',
    title: 'Anti-Drone Defense Systems',
    description: 'Combat-proven RIFF family of RF jamming systems protecting critical infrastructure with up to 5km detection range',
    icon: <Shield size={48} />,
    metrics: [
      { label: 'Detection Range', value: '5', suffix: 'km' },
      { label: 'Jamming Power', value: '1000', suffix: 'W' },
      { label: 'Combat Proven', value: '2020', suffix: '+' }
    ],
    gradient: 'linear-gradient(135deg, #0088ff 0%, #0066cc 100%)',
    features: ['RF Jamming Technology', 'Portable & Mobile Units', 'Ukrainian Military Certified', 'DJI & Military UAV Coverage'],
    link: '/services/anti-drone'
  }
];

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Enhanced 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      
      gsap.to(card, {
        rotateX: y,
        rotateY: x,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Update glow position
      card.style.setProperty('--mouse-x', `${(e.clientX - rect.left) / rect.width * 100}%`);
      card.style.setProperty('--mouse-y', `${(e.clientY - rect.top) / rect.height * 100}%`);
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Scroll animation with stagger
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 100,
        rotateX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div 
      ref={cardRef} 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic overlay effect */}
      <div className={styles.holographicOverlay} />
      
      {/* Scanning line animation */}
      {isHovered && <div className={styles.scanLine} />}
      
      <div className={styles.cardInner}>
        <div 
          className={styles.iconWrapper}
          style={{ background: service.gradient }}
        >
          {service.icon}
          {/* Radar pulse effect for InterProInvest */}
          {service.id === 'interproinvest' && isHovered && (
            <div className={styles.radarPulse} />
          )}
        </div>
        
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
        
        {/* Enhanced metrics with counting animation */}
        <div className={styles.metrics}>
          {service.metrics.map((metric, idx) => (
            <div key={idx} className={styles.metric}>
              <CountUp
                end={parseFloat(metric.value)}
                duration={2}
                delay={index * 0.2 + idx * 0.1}
                enableScrollSpy
                scrollSpyOnce
              >
                {({ countUpRef }) => (
                  <div className={styles.metricValue}>
                    <span ref={countUpRef} />
                    {metric.suffix && (
                      <span className={styles.metricSuffix}>{metric.suffix}</span>
                    )}
                  </div>
                )}
              </CountUp>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          ))}
        </div>
        
        {/* Feature tags with glow */}
        <div className={styles.features}>
          {service.features.map((feature, idx) => (
            <span 
              key={idx} 
              className={styles.feature}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {feature}
            </span>
          ))}
        </div>
        
        {/* CTA with military-style arrow */}
        <Link href={service.link} className={styles.learnMore}>
          <span>Deploy Solution</span>
          <svg className={styles.arrow} viewBox="0 0 24 24" width="20" height="20">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </Link>
      </div>
      
      {/* Corner brackets for military aesthetic */}
      <div className={styles.cornerBrackets}>
        <span className={styles.bracket} data-position="tl" />
        <span className={styles.bracket} data-position="tr" />
        <span className={styles.bracket} data-position="bl" />
        <span className={styles.bracket} data-position="br" />
      </div>
    </div>
  );
}

// Main component
function ServiceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Animate title
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>Our Core Services</h2>
          <p className={styles.subtitle}>
            Cutting-edge drone technology solutions powered by strategic partnerships with InterProInvest and Elphel
          </p>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Export with dynamic loading for performance
export default ServiceShowcase;

// Export for dynamic import in pages
export const ServiceShowcaseDynamic = dynamic(
  () => import('./ServiceShowcase'),
  {
    loading: () => <div className={styles.skeleton}>Loading services...</div>,
    ssr: false
  }
);

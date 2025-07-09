// File: /src/components/organisms/ContactMethods.tsx
// Absolute path: /src/components/organisms/ContactMethods.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Clock, MessageCircle, Shield, Zap } from 'lucide-react';
import styles from './ContactMethods.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ContactMethod {
  id: string;
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  action: () => void;
  highlight?: boolean;
}

export default function ContactMethods() {
  const methodsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      icon: Mail,
      title: 'Email Us',
      value: 'info@adaptiveautohub.com',
      description: 'Get a response within 24 hours',
      action: () => window.location.href = 'mailto:info@adaptiveautohub.com'
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Call Us',
      value: '+1 (801) 555-0123',
      description: 'Mon-Fri 9AM-6PM MST',
      action: () => window.location.href = 'tel:+18015550123'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Start Chat',
      description: 'Available during business hours',
      action: () => console.log('Open chat widget')
    },
    {
      id: 'emergency',
      icon: Shield,
      title: 'Emergency Support',
      value: '24/7 Hotline',
      description: 'For urgent drone defense needs',
      action: () => window.location.href = 'tel:+18015559911',
      highlight: true
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with stagger
      methodsRef.current.forEach((method, index) => {
        gsap.fromTo(method,
          { 
            y: 100,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: method,
              start: 'top 85%',
              once: true
            }
          }
        );

        // Hover animation
        method.addEventListener('mouseenter', () => {
          gsap.to(method, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        method.addEventListener('mouseleave', () => {
          gsap.to(method, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Animate section header
      gsap.fromTo('.methods-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className="methods-header">
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Choose your preferred method to connect with our team
          </p>
        </div>

        <div className={styles.methodsGrid}>
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                ref={el => methodsRef.current[index] = el!}
                className={`${styles.methodCard} ${method.highlight ? styles.highlight : ''}`}
                onClick={method.action}
              >
                <div className={styles.iconWrapper}>
                  <Icon className={styles.icon} />
                  {method.highlight && <Zap className={styles.highlightIcon} />}
                </div>
                
                <h3 className={styles.methodTitle}>{method.title}</h3>
                <p className={styles.methodValue}>{method.value}</p>
                <p className={styles.methodDescription}>{method.description}</p>
                
                <div className={styles.hoverEffect} />
              </div>
            );
          })}
        </div>

        <div className={styles.partnershipCTA}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Why Partner With Us?</h3>
            <div className={styles.ctaGrid}>
              <div className={styles.ctaItem}>
                <span className={styles.ctaNumber}>900m/day</span>
                <span className={styles.ctaLabel}>Inspection Speed</span>
              </div>
              <div className={styles.ctaItem}>
                <span className={styles.ctaNumber}>80%</span>
                <span className={styles.ctaLabel}>Carbon Reduction</span>
              </div>
              <div className={styles.ctaItem}>
                <span className={styles.ctaNumber}>24/7</span>
                <span className={styles.ctaLabel}>Support Available</span>
              </div>
              <div className={styles.ctaItem}>
                <span className={styles.ctaNumber}>2</span>
                <span className={styles.ctaLabel}>Strategic Partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

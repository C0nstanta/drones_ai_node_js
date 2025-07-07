'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ServiceCard.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics: Metric[];
  gradient: string;
  delay?: number;
  imageUrl?: string;
  tags?: string[];
}

export default function ServiceCard({
  title,
  description,
  icon,
  metrics,
  gradient,
  delay = 0,
  imageUrl,
  tags = []
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    
    if (!card || !icon) return;

    gsap.set(card, {
      rotateY: 0,
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });

    gsap.to(icon, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        setIsInView(true);
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          delay: delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [delay]);

  useEffect(() => {
    if (!isInView || !metricsRef.current) return;

    const metricElements = metricsRef.current.querySelectorAll('.metric-value');
    
    metricElements.forEach((element, index) => {
      const metric = metrics[index];
      if (!metric) return;

      gsap.to(element, {
        innerText: metric.value,
        duration: 2,
        delay: delay + 0.5 + index * 0.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function() {
          const value = Math.round(this.targets()[0].innerText);
          element.textContent = (metric.prefix || '') + value + metric.suffix;
        },
      });
    });
  }, [isInView, metrics, delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    
    gsap.to(cardRef.current, {
      rotateX: y,
      rotateY: x,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    gsap.to(cardRef.current, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  };

  return (
    <div className="service-card-container" style={{ perspective: '1000px', width: '100%', maxWidth: '400px' }}>
      <div
        ref={cardRef}
        className={'service-card ' + styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.face + ' ' + styles.front}>
          <div className={styles.gradientBorder + ' ' + gradient} />
          
          <div className={styles.glassBackground}>
            <div ref={iconRef} className={styles.iconContainer}>
              <div className={styles.iconGlow}>
                {icon}
              </div>
            </div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <div ref={metricsRef} className={styles.metrics}>
              {metrics.map((metric, index) => (
                <div key={index} className={styles.metric}>
                  <div className={'metric-value ' + styles.metricValue}>
                    {metric.prefix || ''}0{metric.suffix}
                  </div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>

            {tags.length > 0 && (
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.clickHint}>Click to flip</div>
          </div>
        </div>

        <div className={styles.face + ' ' + styles.back}>
          <div className={styles.gradientBorder + ' ' + gradient} />
          <div className={styles.glassBackground}>
            <h4 className={styles.backTitle}>Technical Details</h4>
            
            <div className={styles.techSpecs}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Processing Power</span>
                <span className={styles.specValue}>Neural Engine v3.0</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Data Throughput</span>
                <span className={styles.specValue}>10GB/s realtime</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Accuracy Rate</span>
                <span className={styles.specValue}>99.8% precision</span>
              </div>
            </div>

            {imageUrl && (
              <div className={styles.imageContainer}>
                <img src={imageUrl} alt={title} />
              </div>
            )}

            <button className={styles.ctaButton}>
              Learn More
              <svg className={styles.arrow} viewBox="0 0 24 24" width="20" height="20">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

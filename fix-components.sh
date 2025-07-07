#!/bin/bash

echo "🚀 Fixing AI Drone Website Components..."

# Create directories
mkdir -p src/components/molecules/ServiceCard
mkdir -p src/components/organisms

# Create ServiceCard component
cat > src/components/molecules/ServiceCard/ServiceCard.tsx << 'EOF'
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
EOF

# Create CSS
cat > src/components/molecules/ServiceCard/ServiceCard.module.css << 'EOF'
.card {
  position: relative;
  width: 100%;
  height: 500px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  overflow: hidden;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}

.gradientBorder {
  position: absolute;
  inset: -2px;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(45deg, #00ff88, #0088ff, #ff0088, #00ff88);
  background-size: 300% 300%;
  animation: gradientShift 4s ease infinite;
  z-index: -1;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glassBackground {
  position: absolute;
  inset: 2px;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
}

.iconContainer {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: relative;
}

.iconGlow {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  position: relative;
}

.iconGlow svg {
  width: 48px;
  height: 48px;
  filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));
  color: #00ff88;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
}

.description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 1.6;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: auto;
}

.metric {
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.metric:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.metricValue {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.25rem;
}

.metricLabel {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 999px;
  font-size: 0.75rem;
  color: #00ff88;
  transition: all 0.3s ease;
}

.clickHint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  opacity: 0;
  animation: fadeInOut 3s infinite;
  animation-delay: 2s;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.backTitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
}

.techSpecs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.specItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.specLabel {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.specValue {
  font-size: 0.875rem;
  font-weight: 600;
  color: #00ff88;
}

.imageContainer {
  width: 100%;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.imageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
  transition: transform 0.3s ease;
}

.ctaButton {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00ff88 0%, #0088ff 100%);
  border: none;
  border-radius: 8px;
  color: #000000;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.ctaButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.arrow {
  transition: transform 0.3s ease;
}

.ctaButton:hover .arrow {
  transform: translateX(4px);
}
EOF

echo "✅ All components created successfully!"
echo "🎯 Your app should now work!"

// File: /home/user/ai-drone-website_v2/src/components/organisms/DrainageStory.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './DrainageStory.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatisticProps {
  label: string;
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

interface CalculatorResult {
  timeSaved: number;
  costSaved: number;
  co2Reduced: number;
  daysReduced: number;
}

const DrainageStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [pipeLength, setPipeLength] = useState(1000);
  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Parallax transforms
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  // Initialize GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate statistics on scroll
      gsap.from('.stat-item', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate timeline points
      gsap.from('.timeline-point', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // CO2 particles animation
      gsap.to('.co2-particle', {
        y: -100,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.co2-section',
          start: 'top center',
          toggleActions: 'play pause resume pause'
        }
      });

      // Pin comparison section
      ScrollTrigger.create({
        trigger: '.comparison-section',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Counter animation for statistics
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseFloat(counter.getAttribute('data-target') || '0');
          const duration = 2000;
          const start = performance.now();
          
          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const value = progress * target;
            
            counter.textContent = Math.floor(value).toString();
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toString();
            }
          };
          
          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  // Calculate savings
  const calculateSavings = () => {
    const traditionalDays = pipeLength / 100; // 100m/day
    const ourDays = pipeLength / 900; // 900m/day
    const daysReduced = traditionalDays - ourDays;
    
    const traditionalCost = traditionalDays * 1000; // $1000/day
    const ourCost = ourDays * 200; // $200/day
    const costSaved = traditionalCost - ourCost;
    
    const traditionalCO2 = traditionalDays * 50; // 50kg CO2/day
    const ourCO2 = ourDays * 10; // 10kg CO2/day (80% reduction)
    const co2Reduced = traditionalCO2 - ourCO2;
    
    setCalculatorResult({
      timeSaved: Math.round(daysReduced * 10) / 10,
      costSaved: Math.round(costSaved),
      co2Reduced: Math.round(co2Reduced),
      daysReduced: Math.round(daysReduced * 10) / 10
    });
  };

  // Handle slider drag
  const handleSliderDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const slider = e.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const statistics: StatisticProps[] = [
    { label: 'Inspection Speed', from: 100, to: 900, suffix: 'm/day' },
    { label: 'Carbon Reduction', from: 0, to: 80, suffix: '%' },
    { label: 'Cost Savings', from: 0, to: 80, suffix: '%' },
    { label: 'Efficiency Gain', from: 1, to: 9, suffix: 'x' }
  ];

  const timelineSteps = [
    { time: '00:00', title: 'Deployment', description: 'Drone arrives at inspection site' },
    { time: '00:15', title: 'Calibration', description: 'Automated system checks and calibration' },
    { time: '00:30', title: 'Inspection Start', description: 'Drone enters drainage system' },
    { time: '04:00', title: '450m Completed', description: 'Half-day traditional work done' },
    { time: '08:00', title: '900m Completed', description: 'Full inspection finished' }
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Hero Section with Parallax */}
      <section className={styles.heroSection}>
        <motion.div 
          className={styles.parallaxLayer1}
          style={{ y: layer1Y }}
        >
          <div className={styles.pipeBackground} />
        </motion.div>
        
        <motion.div 
          className={styles.parallaxLayer2}
          style={{ y: layer2Y }}
        >
          <div className={styles.waterFlow} />
        </motion.div>
        
        <motion.div 
          className={styles.parallaxLayer3}
          style={{ y: layer3Y }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Revolutionizing Drainage Inspection
            </h1>
            <p className={styles.heroSubtitle}>
              900m/day with 80% Carbon Reduction
            </p>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>The Numbers Speak</h2>
        <div className={styles.statsGrid}>
          {statistics.map((stat, index) => (
            <div key={index} className={`${styles.statItem} stat-item`}>
              <div className={styles.statValue}>
                {stat.prefix}
                <span 
                  className="counter" 
                  data-target={stat.to}
                >
                  {stat.from}
                </span>
                {stat.suffix}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className={`${styles.comparisonSection} comparison-section`}>
        <h2 className={styles.sectionTitle}>See the Difference</h2>
        <div 
          className={styles.comparisonContainer}
          onMouseMove={handleSliderDrag}
          onTouchMove={handleSliderDrag}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div className={styles.beforeImage}>
            <div className={styles.imageLabel}>Traditional Method</div>
            <div className={styles.comparisonStats}>
              <div>100m/day</div>
              <div>4-6 Workers</div>
              <div>High Carbon</div>
            </div>
          </div>
          
          <div 
            className={styles.afterImage}
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className={styles.imageLabel}>Our Solution</div>
            <div className={styles.comparisonStats}>
              <div>900m/day</div>
              <div>1 Operator</div>
              <div>80% Less CO₂</div>
            </div>
          </div>
          
          <div 
            className={styles.sliderHandle}
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className={styles.sliderIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M15 10 L10 20 L15 30 M25 10 L30 20 L25 30" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CO2 Reduction Visualization */}
      <section className={`${styles.co2Section} co2-section`}>
        <h2 className={styles.sectionTitle}>Environmental Impact</h2>
        <div className={styles.co2Container}>
          <div className={styles.co2Visual}>
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`${styles.co2Particle} co2-particle`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className={styles.co2Stats}>
            <div className={styles.co2Stat}>
              <span className={styles.co2Number}>80%</span>
              <span className={styles.co2Label}>Less CO₂ Emissions</span>
            </div>
            <div className={styles.co2Stat}>
              <span className={styles.co2Number}>50kg</span>
              <span className={styles.co2Label}>CO₂ Saved Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section className={styles.calculatorSection}>
        <h2 className={styles.sectionTitle}>Calculate Your Savings</h2>
        <div className={styles.calculator}>
          <div className={styles.calculatorInput}>
            <label htmlFor="pipeLength">Pipe Length (meters)</label>
            <input
              id="pipeLength"
              type="number"
              value={pipeLength}
              onChange={(e) => setPipeLength(Number(e.target.value))}
              min="100"
              max="10000"
              step="100"
            />
            <input
              type="range"
              value={pipeLength}
              onChange={(e) => setPipeLength(Number(e.target.value))}
              min="100"
              max="10000"
              step="100"
              className={styles.rangeSlider}
            />
          </div>
          
          <button 
            className={styles.calculateButton}
            onClick={calculateSavings}
          >
            Calculate Savings
          </button>
          
          {calculatorResult && (
            <motion.div 
              className={styles.calculatorResults}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.resultItem}>
                <span className={styles.resultValue}>
                  {calculatorResult.daysReduced}
                </span>
                <span className={styles.resultLabel}>Days Saved</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultValue}>
                  ${calculatorResult.costSaved}
                </span>
                <span className={styles.resultLabel}>Cost Saved</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultValue}>
                  {calculatorResult.co2Reduced}kg
                </span>
                <span className={styles.resultLabel}>CO₂ Reduced</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>A Day in Operation</h2>
        <div className={styles.timeline}>
          {timelineSteps.map((step, index) => (
            <div key={index} className={`${styles.timelineItem} timeline-point`}>
              <div className={styles.timelineTime}>{step.time}</div>
              <div className={styles.timelinePoint} />
              <div className={styles.timelineContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Operations?</h2>
        <p className={styles.ctaSubtitle}>
          Join the future of sustainable drainage inspection
        </p>
        <button className={styles.ctaButton}>
          Get Started Today
        </button>
      </section>
    </div>
  );
};

export default DrainageStory;

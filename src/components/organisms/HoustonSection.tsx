// src/components/organisms/HoustonSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Rocket, Building2, Plane, Satellite, Navigation } from 'lucide-react';
import styles from './HoustonSection.module.css';

interface Landmark {
  name: string;
  description: string;
  icon: React.ReactNode;
  position: { top: string; left: string };
}

const landmarks: Landmark[] = [
  {
    name: 'NASA Johnson Space Center',
    description: 'Partner in aerospace innovation',
    icon: <Rocket className="w-4 h-4" />,
    position: { top: '45%', left: '75%' }
  },
  {
    name: 'Elphel Inc.',
    description: 'Strategic thermal imaging partner',
    icon: <Satellite className="w-4 h-4" />,
    position: { top: '55%', left: '50%' }
  },
  {
    name: 'Houston Airport System',
    description: 'Drone testing grounds',
    icon: <Plane className="w-4 h-4" />,
    position: { top: '25%', left: '60%' }
  },
  {
    name: 'Energy Corridor',
    description: 'Oil & gas industry clients',
    icon: <Building2 className="w-4 h-4" />,
    position: { top: '50%', left: '25%' }
  }
];

export default function HoustonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate section entrance
      gsap.fromTo('.houston-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.houston-content',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate map
      gsap.fromTo('.houston-map',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.houston-map',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate features
      const features = document.querySelectorAll('.houston-feature');
      gsap.fromTo(features,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.houston-features',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };
    
    loadAnimations();
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };
  
  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Animated background grid */}
      <div className={styles.gridBackground} />
      
      <div className={styles.container}>
        <div className={`${styles.content} houston-content`}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Houston Headquarters
              <span className={styles.titleAccent}>Space City Innovation</span>
            </h2>
            
            <p className={styles.description}>
              Strategically located in Houston, Texas - the heart of American aerospace 
              and energy industries. Our headquarters leverages the city's unique ecosystem 
              of innovation, from NASA's pioneering spirit to the world's energy capital.
            </p>
            
            <div className={`${styles.features} houston-features`}>
              <div className={`${styles.feature} houston-feature`}>
                <Navigation className={styles.featureIcon} />
                <div>
                  <h4>Strategic Location</h4>
                  <p>Adjacent to Elphel's facility for seamless collaboration</p>
                </div>
              </div>
              
              <div className={`${styles.feature} houston-feature`}>
                <Rocket className={styles.featureIcon} />
                <div>
                  <h4>Aerospace Heritage</h4>
                  <p>Access to NASA expertise and aerospace talent pool</p>
                </div>
              </div>
              
              <div className={`${styles.feature} houston-feature`}>
                <Building2 className={styles.featureIcon} />
                <div>
                  <h4>Industry Access</h4>
                  <p>Direct connections to oil, gas, and maritime sectors</p>
                </div>
              </div>
            </div>
            
            <div className={styles.address}>
              <MapPin className={styles.addressIcon} />
              <div>
                <h4>Visit Our Innovation Lab</h4>
                <p>Salt Lake City, Utah</p>
                <p className={styles.addressDetail}>Next to Elphel Inc. Facility</p>
              </div>
            </div>
          </div>
          
          {/* Interactive Map */}
          <div className={`${styles.mapContainer} houston-map`}>
            <div 
              className={styles.map}
              onMouseMove={handleMouseMove}
              style={{
                '--mouse-x': `${mousePosition.x}%`,
                '--mouse-y': `${mousePosition.y}%`
              } as React.CSSProperties}
            >
              {/* Map overlay with glassmorphism */}
              <div className={styles.mapOverlay} />
              
              {/* Grid lines */}
              <div className={styles.mapGrid} />
              
              {/* Central Houston marker */}
              <div className={styles.hqMarker}>
                <div className={styles.hqPulse} />
                <div className={styles.hqCore}>
                  <MapPin className="w-6 h-6" />
                </div>
                <span className={styles.hqLabel}>AI Drone HQ</span>
              </div>
              
              {/* Landmark markers */}
              {landmarks.map((landmark, index) => (
                <div
                  key={index}
                  className={styles.landmark}
                  style={landmark.position}
                  onMouseEnter={() => setActiveLocation(index)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  <div className={styles.landmarkIcon}>
                    {landmark.icon}
                  </div>
                  {activeLocation === index && (
                    <div className={styles.tooltip}>
                      <h5>{landmark.name}</h5>
                      <p>{landmark.description}</p>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Connection lines */}
              <svg className={styles.connections}>
                {landmarks.map((_, index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={landmarks[index].position.left}
                    y2={landmarks[index].position.top}
                    stroke="rgba(0, 255, 136, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className={styles.connectionLine}
                  />
                ))}
              </svg>
              
              {/* Hover effect spotlight */}
              <div className={styles.spotlight} />
            </div>
            
            {/* Map legend */}
            <div className={styles.legend}>
              <h4>Key Partnerships & Locations</h4>
              <div className={styles.legendItems}>
                {landmarks.map((landmark, index) => (
                  <div key={index} className={styles.legendItem}>
                    {landmark.icon}
                    <span>{landmark.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

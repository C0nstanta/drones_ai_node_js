// File: /src/components/organisms/OfficeLocations.tsx
// Absolute path: /src/components/organisms/OfficeLocations.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Building2, Clock, ArrowRight } from 'lucide-react';
import styles from './OfficeLocations.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Office {
  id: string;
  name: string;
  status: 'active' | 'coming-soon';
  address: string;
  description: string;
  coordinates: { lat: number; lng: number };
  features: string[];
}

const offices: Office[] = [
  {
    id: 'houston',
    name: 'Houston Office',
    status: 'active',
    address: 'Houston, TX',
    description: 'Expanding to serve civil infrastructure projects across Texas.',
    coordinates: { lat: 29.78189331168656, lng: -95.64493318860919 },
    features: ['Oil & Gas Solutions', 'Civil Engineering', 'Pipeline Inspection', 'Client Demo Area']
  }
];

export default function OfficeLocations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo('.section-title',
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

      // Animate office cards
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleGetDirections = (office: Office) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${office.coordinates.lat},${office.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <h2 className={`section-title ${styles.title}`}>Our Locations</h2>
        
        <div className={styles.officeGrid}>
          {offices.map((office, index) => (
            <div
              key={office.id}
              ref={el => cardsRef.current[index] = el!}
              className={`${styles.officeCard} ${office.status === 'coming-soon' ? styles.comingSoon : ''}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Building2 className={styles.icon} />
                </div>
                <div>
                  <h3 className={styles.officeName}>{office.name}</h3>
                  {office.status === 'coming-soon' && (
                    <span className={styles.badge}>Coming Soon</span>
                  )}
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.addressRow}>
                  <MapPin size={16} className={styles.smallIcon} />
                  <p className={styles.address}>{office.address}</p>
                </div>

                <p className={styles.description}>{office.description}</p>

                <div className={styles.features}>
                  {office.features.map((feature, idx) => (
                    <span key={idx} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>

                {office.status === 'active' && (
                  <div className={styles.mapPreview}>
                    {/* Interactive map would go here */}
                    <div className={styles.mapPlaceholder}>
                      <iframe
                        /* ✅ FIX: remove the hard-coded Google "pb" embed (which encoded SLC)
                           and use the office coordinates directly so it always centers on Houston. */
                        src={`https://www.google.com/maps?q=${office.coordinates.lat},${office.coordinates.lng}&z=14&output=embed`}
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleGetDirections(office)}
                  className={styles.directionsButton}
                  disabled={office.status === 'coming-soon'}
                >
                  {office.status === 'active' ? (
                    <>
                      Get Directions
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    'Location Coming Soon'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

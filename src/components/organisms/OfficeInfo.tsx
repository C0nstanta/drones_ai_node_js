// /src/components/organisms/OfficeInfo.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OfficeInfo.module.css';
import { FiClock, FiPhone, FiMail, FiCopy, FiCheck } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const OFFICE_HOURS = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM MST' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM MST' },
  { day: 'Sunday', hours: 'Closed' },
];

const CONTACT_INFO = {
  phone: '+1 (801) 555-0123',
  email: 'info@deepskysolutions.com',
  address: '430 S Texas 6, Suite 206, Houston, TX 77079',
};

const OfficeInfo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Animate cards
      const cards = sectionRef.current?.querySelectorAll(`.${styles.infoCard}`);
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const mstTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(now);
    return mstTime;
  };

  const isOfficeOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    
    if (day === 0) return false; // Sunday
    if (day === 6) return hours >= 10 && hours < 16; // Saturday
    return hours >= 9 && hours < 18; // Weekdays
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visit Our Office</h2>
        <p className={styles.subtitle}>
          Experience our drone technology firsthand at our Houston, Texas headquarters
        </p>
      </div>

      <div className={styles.grid}>
        {/* Office Hours Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FiClock className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Office Hours</h3>
          </div>
          
          <div className={styles.hoursContainer}>
            {OFFICE_HOURS.map((schedule, index) => (
              <div key={index} className={styles.hoursRow}>
                <span className={styles.day}>{schedule.day}</span>
                <span className={styles.hours}>{schedule.hours}</span>
              </div>
            ))}
          </div>

          <div className={styles.currentTime}>
            <span className={styles.timeLabel}>Current MST Time:</span>
            <span className={styles.time}>{getCurrentTime()}</span>
          </div>

          <div className={`${styles.status} ${isOfficeOpen() ? styles.open : styles.closed}`}>
            <div className={styles.statusDot} />
            <span>{isOfficeOpen() ? 'We are open' : 'We are closed'}</span>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FiPhone className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Get in Touch</h3>
          </div>

          <div className={styles.contactContainer}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone</span>
              <div className={styles.contactValue}>
                <span>{CONTACT_INFO.phone}</span>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                  className={styles.copyButton}
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <div className={styles.contactValue}>
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.link}>
                  {CONTACT_INFO.email}
                </a>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.email, 'email')}
                  className={styles.copyButton}
                  title="Copy email address"
                >
                  {copiedField === 'email' ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Address</span>
              <div className={styles.contactValue}>
                <span>{CONTACT_INFO.address}</span>
                <button
                  onClick={() => copyToClipboard(CONTACT_INFO.address, 'address')}
                  className={styles.copyButton}
                  title="Copy address"
                >
                  {copiedField === 'address' ? <FiCheck /> : <FiCopy />}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.directions}>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(CONTACT_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsButton}
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FiMail className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Quick Info</h3>
          </div>

          <div className={styles.quickInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🚗</span>
              <div>
                <h4>Parking</h4>
                <p>Free visitor parking available on-site. Electric vehicle charging stations available.</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>♿</span>
              <div>
                <h4>Accessibility</h4>
                <p>Fully wheelchair accessible facility with elevator access to all floors.</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🚊</span>
              <div>
                <h4>Public Transit</h4>
                <p>5-minute walk from Temple Square TRAX station (Blue/Green lines).</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>☕</span>
              <div>
                <h4>Amenities</h4>
                <p>Complimentary coffee bar and refreshments for all visitors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeInfo;

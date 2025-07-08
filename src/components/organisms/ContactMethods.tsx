// /src/components/organisms/ContactMethods.tsx
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactMethods.module.css';
import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram, FiYoutube, FiGithub } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com/aidronesolutions', color: '#1DA1F2' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com/company/aidronesolutions', color: '#0077B5' },
  { name: 'Facebook', icon: FiFacebook, url: 'https://facebook.com/aidronesolutions', color: '#1877F2' },
  { name: 'Instagram', icon: FiInstagram, url: 'https://instagram.com/aidronesolutions', color: '#E4405F' },
  { name: 'YouTube', icon: FiYoutube, url: 'https://youtube.com/@aidronesolutions', color: '#FF0000' },
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com/aidronesolutions', color: '#181717' },
];

const CONTACT_METHODS = [
  {
    title: 'Sales Team',
    description: 'Ready to transform your business with AI drones?',
    email: 'sales@aidronesolutions.com',
    phone: '+1 (801) 555-0100',
    responseTime: 'Response within 2 hours',
    icon: '💼',
  },
  {
    title: 'Technical Support',
    description: 'Need help with your drone systems?',
    email: 'support@aidronesolutions.com',
    phone: '+1 (801) 555-0111',
    responseTime: '24/7 support available',
    icon: '🛠️',
  },
  {
    title: 'Partnerships',
    description: 'Interested in collaborating with us?',
    email: 'partners@aidronesolutions.com',
    phone: '+1 (801) 555-0122',
    responseTime: 'Response within 24 hours',
    icon: '🤝',
  },
];

const ContactMethods = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Animate contact method cards
      const cards = sectionRef.current?.querySelectorAll(`.${styles.methodCard}`);
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotationY: -15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(0, 255, 136, 0.3)',
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
          });
        });
      });

      // Animate social icons
      const socialIcons = socialRef.current?.querySelectorAll(`.${styles.socialIcon}`);
      socialIcons?.forEach((icon, index) => {
        gsap.fromTo(icon,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.8 + index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: socialRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Multiple Ways to Connect</h2>
        <p className={styles.subtitle}>
          Choose the best way to reach our team
        </p>
      </div>

      <div className={styles.methodsGrid}>
        {CONTACT_METHODS.map((method, index) => (
          <div key={index} className={styles.methodCard}>
            <div className={styles.methodIcon}>{method.icon}</div>
            <h3 className={styles.methodTitle}>{method.title}</h3>
            <p className={styles.methodDescription}>{method.description}</p>
            
            <div className={styles.methodContact}>
              <a href={`mailto:${method.email}`} className={styles.methodLink}>
                <span className={styles.linkIcon}>✉️</span>
                {method.email}
              </a>
              <a href={`tel:${method.phone}`} className={styles.methodLink}>
                <span className={styles.linkIcon}>📞</span>
                {method.phone}
              </a>
            </div>

            <div className={styles.responseTime}>
              <span className={styles.responseIcon}>⏱️</span>
              {method.responseTime}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.socialSection}>
        <h3 className={styles.socialTitle}>Follow Us</h3>
        <p className={styles.socialSubtitle}>
          Stay updated with our latest innovations and drone technology
        </p>
        
        <div ref={socialRef} className={styles.socialGrid}>
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                style={{ '--social-color': social.color } as React.CSSProperties}
                title={social.name}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>

      <div className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h3 className={styles.newsletterTitle}>Stay in the Loop</h3>
          <p className={styles.newsletterDescription}>
            Subscribe to our newsletter for the latest drone technology updates and exclusive offers
          </p>
          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>
        <div className={styles.newsletterDecoration}>
          <div className={styles.decorationCircle} />
          <div className={styles.decorationCircle} />
          <div className={styles.decorationCircle} />
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;

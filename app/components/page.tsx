// app/components/page.tsx
'use client';

import { useState } from 'react';
import { GlowButton } from '@/components/atoms/GlowButton/GlowButton';
import { ServiceCard } from '@/components/molecules/ServiceCard/ServiceCard';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { ParticleBackground } from '@/components/atoms/ParticleBackground/ParticleBackground';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';
import styles from './components.module.css';

// Icon components
const DroneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 1C3.89 1 3 1.89 3 3S3.89 5 5 5 7 4.11 7 3 6.11 1 5 1M19 1C17.89 1 17 1.89 17 3S17.89 5 19 5 21 4.11 21 3 20.11 1 19 1M21 7H17V9.65L14.52 12H9.48L7 9.65V7H3V9H7V11.65L9.48 14H14.52L17 11.65V9H21V7M5 19C3.89 19 3 19.89 3 21S3.89 23 5 23 7 22.11 7 21 6.11 19 5 19M19 19C17.89 19 17 19.89 17 21S17.89 23 19 23 21 22.11 21 21 20.11 19 19 19M3 15V17H7V14.35L9.48 12H14.52L17 14.35V17H21V15H17V12.35L14.52 10H9.48L7 12.35V15H3Z"/>
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
  </svg>
);

const ChipIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6,4H18V5H21V7H18V9H21V11H18V13H21V15H18V17H21V19H18V20H6V19H3V17H6V15H3V13H6V11H3V9H6V7H3V5H6V4M11,15V18H12V15H11M13,15V18H14V15H13M15,15V18H16V15H15Z"/>
  </svg>
);

export default function ComponentsShowcase() {
  const [showLoadingFullScreen, setShowLoadingFullScreen] = useState(false);

  return (
    <>
      <ParticleBackground />
      <Navigation />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Component Showcase</h1>
          <p className={styles.subtitle}>
            Military-grade UI components with stunning visual effects
          </p>
        </section>

        {/* GlowButton Showcase */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>GlowButton</h2>
          <div className={styles.buttonGrid}>
            <GlowButton variant="primary">Primary Button</GlowButton>
            <GlowButton variant="secondary">Secondary Button</GlowButton>
            <GlowButton variant="danger">Danger Button</GlowButton>
            <GlowButton variant="primary" size="sm">Small</GlowButton>
            <GlowButton variant="primary" size="md">Medium</GlowButton>
            <GlowButton variant="primary" size="lg">Large</GlowButton>
            <GlowButton variant="primary" fullWidth>Full Width Button</GlowButton>
          </div>
        </section>

        {/* ServiceCard Showcase */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>ServiceCard</h2>
          <div className={styles.cardGrid}>
            <ServiceCard
              title="Drainage Inspection"
              description="AI-powered pipeline inspection with advanced computer vision"
              icon={<DroneIcon />}
              features={[
                "900m/day inspection capability",
                "80% carbon emission reduction",
                "Real-time defect detection",
                "Automated reporting system"
              ]}
              metric={{
                value: "900m/day",
                label: "Inspection Speed"
              }}
            />
            
            <ServiceCard
              title="Elphel Camera Systems"
              description="Military-grade thermal and visible spectrum imaging"
              icon={<CameraIcon />}
              features={[
                "0.05 pixel disparity resolution",
                "Dual spectrum imaging",
                "Open-source integration",
                "Real-time processing"
              ]}
              metric={{
                value: "0.05px",
                label: "Disparity Resolution"
              }}
            />
            
            <ServiceCard
              title="RTOS Development"
              description="High-performance real-time operating systems for drones"
              icon={<ChipIcon />}
              features={[
                "500Hz-1kHz update rates",
                "FreeRTOS/NuttX expertise",
                "Custom flight controllers",
                "Hardware optimization"
              ]}
              metric={{
                value: "1kHz",
                label: "Update Rate"
              }}
            />
          </div>
        </section>

        {/* LoadingSpinner Showcase */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>LoadingSpinner</h2>
          <div className={styles.spinnerGrid}>
            <div className={styles.spinnerItem}>
              <LoadingSpinner size="sm" />
              <p>Small</p>
            </div>
            <div className={styles.spinnerItem}>
              <LoadingSpinner size="md" />
              <p>Medium</p>
            </div>
            <div className={styles.spinnerItem}>
              <LoadingSpinner size="lg" />
              <p>Large</p>
            </div>
          </div>
          
          <GlowButton 
            variant="secondary"
            onClick={() => setShowLoadingFullScreen(true)}
            style={{ marginTop: '2rem' }}
          >
            Show Full Screen Loading
          </GlowButton>
        </section>
      </main>

      {/* Full screen loading demo */}
      {showLoadingFullScreen && (
        <div onClick={() => setShowLoadingFullScreen(false)}>
          <LoadingSpinner fullScreen />
        </div>
      )}
    </>
  );
}

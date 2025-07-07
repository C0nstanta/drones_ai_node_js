// src/app/components/page.tsx
'use client';

import React, { useState } from 'react';
import Navigation from '@/components/organisms/Navigation';
import ServiceCard from '@/components/molecules/ServiceCard';
import GlowButton from '@/components/atoms/GlowButton';
import ParticleBackground from '@/components/atoms/ParticleBackground';
import { Camera, Code, Droplets, Sparkles, Zap, Shield } from 'lucide-react';
import styles from './components.module.css';

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('atoms');

  const tabs = ['atoms', 'molecules', 'organisms'];

  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <ParticleBackground count={1000} mouseReactive />
        
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Component Showcase</h1>
            <p className={styles.subtitle}>
              Explore our design system with stunning visual effects and interactions
            </p>
          </header>

          {/* Tab Navigation */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Atoms Section */}
          {activeTab === 'atoms' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Atomic Components</h2>
              
              {/* Glow Buttons */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>GlowButton</h3>
                <p className={styles.componentDesc}>
                  Neon glow effect that intensifies on hover with ripple on click
                </p>
                <div className={styles.showcase}>
                  <GlowButton size="small">Small</GlowButton>
                  <GlowButton>Default</GlowButton>
                  <GlowButton size="large">Large</GlowButton>
                  <GlowButton variant="secondary">Secondary</GlowButton>
                  <GlowButton disabled>Disabled</GlowButton>
                </div>
                <details className={styles.codeBlock}>
                  <summary>View Code</summary>
                  <pre>{`<GlowButton size="large">Click Me</GlowButton>`}</pre>
                </details>
              </div>

              {/* Loading Spinner */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>LoadingSpinner</h3>
                <p className={styles.componentDesc}>
                  Futuristic circular design with pulsing glow
                </p>
                <div className={styles.showcase}>
                  <div className={styles.spinner}>
                    <div className={styles.spinnerRing} />
                  </div>
                </div>
              </div>

              {/* Icons with Effects */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>Icon Effects</h3>
                <p className={styles.componentDesc}>
                  Icons with glow and animation effects
                </p>
                <div className={styles.showcase}>
                  <div className={styles.iconWrapper}>
                    <Sparkles className={styles.glowIcon} />
                  </div>
                  <div className={styles.iconWrapper}>
                    <Zap className={styles.pulseIcon} />
                  </div>
                  <div className={styles.iconWrapper}>
                    <Shield className={styles.rotateIcon} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Molecules Section */}
          {activeTab === 'molecules' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Molecular Components</h2>
              
              {/* Service Cards */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>ServiceCard</h3>
                <p className={styles.componentDesc}>
                  3D flip animation with glassmorphism and animated metrics
                </p>
                <div className={styles.cardGrid}>
                  <ServiceCard
                    title="Example Service"
                    description="This card demonstrates 3D transforms, glassmorphism, and animated metrics."
                    icon={<Code size={48} />}
                    metrics={[
                      { label: 'Performance', value: 95, suffix: '%' },
                      { label: 'Uptime', value: 99.9, suffix: '%' }
                    ]}
                    gradient="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"
                    tags={['Demo', 'Interactive']}
                  />
                </div>
                <details className={styles.codeBlock}>
                  <summary>View Code</summary>
                  <pre>{`<ServiceCard
  title="Example Service"
  description="Card description"
  icon={<Code size={48} />}
  metrics={[
    { label: 'Performance', value: 95, suffix: '%' }
  ]}
  gradient="bg-gradient-to-br from-purple-500 to-red-500"
  tags={['Demo', 'Interactive']}
/>`}</pre>
                </details>
              </div>
            </section>
          )}

          {/* Organisms Section */}
          {activeTab === 'organisms' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Organism Components</h2>
              
              {/* Navigation Preview */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>Navigation</h3>
                <p className={styles.componentDesc}>
                  Fixed navigation with blur background and magnetic hover effects
                </p>
                <div className={styles.navNote}>
                  ℹ️ The navigation is displayed at the top of this page. 
                  Scroll to see blur effect, hover items for magnetic effect.
                </div>
              </div>

              {/* Performance Metrics */}
              <div className={styles.component}>
                <h3 className={styles.componentTitle}>Performance Metrics</h3>
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <h4>Lighthouse Score</h4>
                    <div className={styles.metricValue}>95+</div>
                  </div>
                  <div className={styles.metricCard}>
                    <h4>Animation FPS</h4>
                    <div className={styles.metricValue}>60fps</div>
                  </div>
                  <div className={styles.metricCard}>
                    <h4>Load Time</h4>
                    <div className={styles.metricValue}>&lt;3s</div>
                  </div>
                  <div className={styles.metricCard}>
                    <h4>Components</h4>
                    <div className={styles.metricValue}>15+</div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

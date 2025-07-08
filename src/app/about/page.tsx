'use client';

import Navigation from '@/components/organisms/Navigation';
import ParticleBackground from '@/components/atoms/ParticleBackground';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black text-white overflow-x-hidden">
        <ParticleBackground count={800} />
        
        {/* Temporary content until components are built */}
        <div className="min-h-screen pt-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
              About <span className="text-green-400">AI Drone Solutions</span>
            </h1>
            
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
              Pioneering AI-powered drone solutions from our headquarters in Salt Lake City.
              Full page implementation coming soon with team, partnerships, and company story sections.
            </p>
            
            {/* Placeholder sections */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-green-400/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Our Mission</h2>
                <p className="text-gray-300">
                  To revolutionize drone technology with cutting-edge AI solutions,
                  making aerial intelligence accessible and impactful across industries.
                </p>
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg border border-green-400/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">Why Salt Lake City</h2>
                <p className="text-gray-300">
                  Located in the heart of Silicon Slopes, we leverage Utah's thriving
                  tech ecosystem and unique geographical advantages for drone testing.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>Join Us in Shaping the Future</h2>
            <p className={styles.ctaSubtitle}>
              From our headquarters in the heart of Silicon Slopes
            </p>
            <button className={styles.ctaButton}>
              Get in Touch
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

// File: /src/app/contact/page.tsx
// Absolute path: /src/app/contact/page.tsx

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ContactHero from '@/components/organisms/ContactHero';
import ContactForm from '@/components/organisms/ContactForm';
import OfficeLocations from '@/components/organisms/OfficeLocations';
import ContactMethods from '@/components/organisms/ContactMethods';
// Fix the ParticleBackground import - it's likely a named export
import { ParticleBackground } from '@/components/atoms/ParticleBackground/ParticleBackground';

// Dynamic import for heavy components
const InteractiveGlobe = dynamic(() => import('@/components/molecules/InteractiveGlobe'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-900 animate-pulse rounded-xl" />
});

export const metadata: Metadata = {
  title: 'Contact Us | Adaptive Auto Hub - Drone Solutions',
  description: 'Get in touch with Adaptive Auto Hub for AI-powered drone solutions. Located in Salt Lake City, partnering with Elphel and InterProInvest.',
  keywords: 'contact, drone services, Salt Lake City, thermal imaging, drainage inspection',
  openGraph: {
    title: 'Contact Adaptive Auto Hub',
    description: 'Partner with us for revolutionary drone technology solutions',
    images: ['/images/contact-og.jpg'],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <ParticleBackground count={500} />
      
      {/* Hero Section */}
      <ContactHero />
      
      {/* Main Content Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-white mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
            
            {/* Interactive Globe/Map */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-white mb-8">
                Global Reach, Local Expertise
              </h2>
              <InteractiveGlobe />
              <p className="mt-4 text-gray-400">
                Headquartered in Salt Lake City with planned expansion to Texas
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Locations */}
      <OfficeLocations />
      
      {/* Contact Methods */}
      <ContactMethods />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </main>
  );
}

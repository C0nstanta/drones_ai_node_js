// File: /src/app/services/page.tsx
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ServiceShowcaseSkeleton } from '@/components/skeletons/ServiceShowcaseSkeleton';

// Dynamic import for performance
const ServiceShowcase = dynamic(
  () => import('@/components/organisms/ServiceShowcase'),
  {
    loading: () => <ServiceShowcaseSkeleton />,
    ssr: false
  }
);

export const metadata: Metadata = {
  title: 'Our Services - AI Drone Solutions | Drainage, Thermal Detection, Anti-Drone',
  description: 'Explore our cutting-edge drone services: AI-powered drainage inspection (900m/day), Elphel thermal detection with AFWERX partnership, and InterProInvest anti-drone defense systems.',
  keywords: 'drone services, drainage inspection AI, thermal imaging drone, anti-drone technology, RIFF systems, Elphel LWIR, InterProInvest defense',
  openGraph: {
    title: 'Drone Technology Services - AI Drone Solutions',
    description: 'Revolutionary drone services: 900m/day drainage inspection, military-grade thermal detection, combat-proven anti-drone systems',
    url: 'https://your-domain.com/services',
    images: [
      {
        url: '/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Drone Solutions Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drone Technology Services - AI Drone Solutions',
    description: 'Revolutionary drone services powered by partnerships with InterProInvest and Elphel',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">
            Our Services
          </h1>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            Leveraging strategic partnerships with InterProInvest and Elphel to deliver 
            next-generation drone solutions for inspection, detection, and defense.
          </p>
        </div>
      </section>

      {/* Services Showcase */}
      <ServiceShowcase />

      {/* Additional Structured Data for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Drone Technology Solutions',
            provider: {
              '@type': 'Organization',
              name: 'AI Drone Solutions',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Drone Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'AI Drainage Inspection',
                    description: '900m/day inspection rate with 80% carbon reduction',
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Elphel Thermal Detection',
                    description: 'LWIR technology with 20x sensitivity improvement',
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Anti-Drone Defense Systems',
                    description: 'RIFF family RF jamming systems with 5km range',
                  }
                }
              ]
            }
          })
        }}
      />
    </main>
  );
}

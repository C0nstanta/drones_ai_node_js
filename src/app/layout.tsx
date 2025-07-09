// File: /src/app/layout.tsx
// Absolute path: /src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Drone Solutions - Salt Lake City | Drainage Inspection, Thermal Detection, Anti-Drone Defense',
  description: 'Leading AI-powered drone technology provider based in Salt Lake City, Utah. Revolutionary drainage inspection (900m/day), military-grade thermal detection with Elphel, and combat-proven anti-drone systems from InterProInvest. Serving Utah and the Mountain West.',
  keywords: 'Salt Lake City drone services, Utah AI drone technology, drone inspection Salt Lake City, thermal imaging Utah, anti-drone Utah, RF jamming, RIFF, Elphel, InterProInvest, LWIR, drainage inspection, AFWERX, Silicon Slopes drone company, Mountain West drone solutions',
  authors: [{ name: 'AI Drone Solutions' }],
  creator: 'AI Drone Solutions',
  publisher: 'AI Drone Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aidronesolutions.com'),
  openGraph: {
    title: 'AI Drone Solutions - Salt Lake City\'s Premier Drone Technology Provider',
    description: 'Based in Salt Lake City, Utah. Revolutionary drone solutions: 900m/day drainage inspection, military-grade thermal detection, combat-proven anti-drone defense systems. Serving the Mountain West region.',
    url: 'https://aidronesolutions.com',
    siteName: 'AI Drone Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Drone Solutions - Salt Lake City Drone Technology Leader',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Drone Solutions - Salt Lake City Drone Technology',
    description: 'Utah\'s premier drone solutions provider. Drainage inspection, thermal detection, anti-drone defense. Based in Silicon Slopes.',
    images: ['/twitter-image.jpg'],
    creator: '@AIDroneSLC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aidronesolutions.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Local Business Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://aidronesolutions.com',
              name: 'AI Drone Solutions',
              description: 'Leading AI-powered drone technology provider in Salt Lake City, Utah. Specializing in drainage inspection, thermal detection, and anti-drone defense systems.',
              url: 'https://aidronesolutions.com',
              logo: 'https://aidronesolutions.com/logo.png',
              image: 'https://aidronesolutions.com/building.jpg',
              telephone: '+1-801-555-0100',
              priceRange: '$$$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Innovation Drive',
                addressLocality: 'Salt Lake City',
                addressRegion: 'UT',
                postalCode: '84101',
                addressCountry: 'US'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7608,
                longitude: -111.8910
              },
              areaServed: [
                {
                  '@type': 'GeoCircle',
                  geoMidpoint: {
                    '@type': 'GeoCoordinates',
                    latitude: 40.7608,
                    longitude: -111.8910
                  },
                  geoRadius: '500000'
                },
                {
                  '@type': 'State',
                  name: 'Utah',
                  '@id': 'https://en.wikipedia.org/wiki/Utah'
                },
                {
                  '@type': 'AdministrativeArea',
                  name: 'Mountain West Region'
                }
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00'
                }
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-801-555-0100',
                contactType: 'customer service',
                contactOption: 'TollFree',
                availableLanguage: ['en'],
                areaServed: 'US',
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '17:00',
                  timeZone: 'America/Denver'
                }
              },
              sameAs: [
                'https://twitter.com/AIDroneSLC',
                'https://www.linkedin.com/company/ai-drone-solutions-slc',
                'https://www.facebook.com/AIDroneSolutionsSLC',
                'https://www.youtube.com/@AIDroneSLC'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Drone Technology Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'AI Drainage Inspection',
                      description: '900m/day inspection rate with 80% carbon reduction'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Elphel Thermal Detection',
                      description: 'LWIR technology with 20x sensitivity improvement'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Anti-Drone Defense Systems',
                      description: 'RIFF family RF jamming systems with 5km range'
                    }
                  }
                ]
              },
              founder: {
                '@type': 'Person',
                name: 'AI Drone Solutions Leadership Team'
              },
              foundingDate: '2020',
              slogan: 'Advancing Drone Technology from the Heart of Silicon Slopes',
              knowsAbout: [
                'Drone Technology',
                'AI and Machine Learning',
                'Thermal Imaging',
                'RF Technology',
                'Environmental Monitoring',
                'Defense Systems'
              ],
              memberOf: [
                {
                  '@type': 'Organization',
                  name: 'Silicon Slopes',
                  url: 'https://siliconslopes.com'
                },
                {
                  '@type': 'Organization',
                  name: 'Utah Technology Council',
                  url: 'https://utahtech.org'
                }
              ]
            })
          }}
        />
        
        {/* Organization Schema with Location */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AI Drone Solutions',
              url: 'https://aidronesolutions.com',
              logo: 'https://aidronesolutions.com/logo.png',
              description: 'Headquartered in Salt Lake City, Utah. Leading provider of AI-powered drone solutions.',
              location: {
                '@type': 'Place',
                name: 'AI Drone Solutions Headquarters',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '123 Innovation Drive',
                  addressLocality: 'Salt Lake City',
                  addressRegion: 'UT',
                  postalCode: '84101',
                  addressCountry: 'US'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 40.7608,
                  longitude: -111.8910
                },
                hasMap: 'https://maps.google.com/?q=AI+Drone+Solutions+Salt+Lake+City+Utah'
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 40.7608,
                  longitude: -111.8910
                },
                geoRadius: '500000'
              }
            })
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://aidronesolutions.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Salt Lake City Headquarters',
                  item: 'https://aidronesolutions.com/about'
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

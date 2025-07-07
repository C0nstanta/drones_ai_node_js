// File: /src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Drone Solutions - Drainage Inspection, Thermal Detection, Anti-Drone Defense',
  description: 'Leading provider of AI-powered drone technology: 900m/day drainage inspection with 80% carbon reduction, military-grade thermal detection with Elphel, and combat-proven anti-drone systems from InterProInvest.',
  keywords: 'drone inspection, thermal imaging, anti-drone, RF jamming, RIFF, Elphel, InterProInvest, LWIR, drainage inspection, AFWERX, Ukrainian defense technology',
  authors: [{ name: 'AI Drone Solutions' }],
  creator: 'AI Drone Solutions',
  publisher: 'AI Drone Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  openGraph: {
    title: 'AI Drone Solutions - Next-Gen Drone Technology',
    description: 'Revolutionary drone solutions: 900m/day drainage inspection, military-grade thermal detection, combat-proven anti-drone defense systems',
    url: 'https://your-domain.com',
    siteName: 'AI Drone Solutions',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'AI Drone Solutions - Cutting-edge drone technology',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Drone Solutions - Next-Gen Drone Technology',
    description: 'Revolutionary drone solutions: drainage inspection, thermal detection, anti-drone defense',
    images: ['/twitter-image.jpg'], // Add your Twitter image
    creator: '@yourtwitterhandle',
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
    canonical: 'https://your-domain.com',
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
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AI Drone Solutions',
              description: 'Leading provider of AI-powered drone technology solutions',
              url: 'https://your-domain.com',
              logo: 'https://your-domain.com/logo.png',
              sameAs: [
                'https://twitter.com/yourtwitterhandle',
                'https://linkedin.com/company/your-company',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-XXX-XXX-XXXX',
                contactType: 'customer service',
                availableLanguage: ['en'],
              },
              partner: [
                {
                  '@type': 'Organization',
                  name: 'InterProInvest',
                  url: 'https://interproinvest.com',
                  description: 'Ukrainian defense contractor specializing in anti-drone systems'
                },
                {
                  '@type': 'Organization', 
                  name: 'Elphel Inc.',
                  url: 'https://www.elphel.com',
                  description: 'Open-source imaging solutions with AFWERX partnership'
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navigation from '@/components/organisms/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deep Sky Solutions - Houston, Texas | Drainage Inspection, Thermal Detection, Anti-Drone Defense',
  description: 'Leading AI-powered drone technology provider based in Houston, Texas. Revolutionary drainage inspection (900m/day), military-grade thermal detection with Elphel, and combat-proven anti-drone systems from InterProInvest.',
  keywords: 'Houston, Texas drone services, AI drone technology, drone inspection Houston, Texas, thermal imaging Utah, RF jamming, RIFF, Elphel, InterProInvest, LWIR, drainage inspection, AFWERX, Silicon Slopes drone company, Mountain West drone solutions',
  authors: [{ name: 'Deep Sky Solutions' }],
  creator: 'Deep Sky Solutions',
  publisher: 'Deep Sky Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://deepskysolutions.com'),
  openGraph: {
    title: 'Deep Sky Solutions - Houston, Texas\'s Premier Drone Technology Provider',
    description: 'Based in Houston, Texas. Revolutionary drone solutions: 900m/day drainage inspection, military-grade thermal detection, combat-proven anti-drone defense systems. Serving the Mountain West region.',
    url: 'https://deepskysolutions.com',
    siteName: 'Deep Sky Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Sky Solutions - Houston, Texas Drone Technology Leader',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Sky Solutions - Houston, Texas Drone Technology',
    description: 'Texas\'s premier drone solutions provider. Drainage inspection, thermal detection, anti-drone defense. Based in Silicon Slopes.',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

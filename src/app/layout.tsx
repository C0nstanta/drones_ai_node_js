// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navigation from '@/components/organisms/Navigation';

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

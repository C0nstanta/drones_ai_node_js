import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Deep Sky Solutions | Houston, Texas Headquarters',
  description: 'Learn about our journey from a Houston, Texas startup to a leader in AI-powered drone technology. Discover our team, partnerships, and commitment to the Mountain West region.',
  keywords: 'AI drone company Houston, Texas',
  openGraph: {
    title: 'About Deep Sky Solutions - Pioneering from Houston, Texas',
    description: 'From our headquarters in Houston, Texas, we\'re revolutionizing drone technology with AI-powered solutions.',
    url: 'https://your-domain.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Sky Solutions Houston, Texas Headquarters',
      }
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}

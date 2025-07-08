import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - AI Drone Solutions | Salt Lake City Headquarters',
  description: 'Learn about our journey from a Salt Lake City startup to a leader in AI-powered drone technology. Discover our team, partnerships, and commitment to the Mountain West region.',
  keywords: 'AI drone company Salt Lake City, Silicon Slopes drone technology, Utah tech companies, Mountain West drone solutions',
  openGraph: {
    title: 'About AI Drone Solutions - Pioneering from Salt Lake City',
    description: 'From our headquarters in Silicon Slopes, we\'re revolutionizing drone technology with AI-powered solutions.',
    url: 'https://your-domain.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Drone Solutions Salt Lake City Headquarters',
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

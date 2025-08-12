// /src/app/contact/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Deep Sky Solutions',
  description: 'Get in touch with our AI drone experts in Houston, Texas. We offer consultation, support, and partnership opportunities.',
  openGraph: {
    title: 'Contact Deep Sky Solutions',
    description: 'Connect with our team for cutting-edge drone technology solutions',
    images: ['/images/contact-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Deep Sky Solutions',
    description: 'Get in touch with our drone technology experts',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

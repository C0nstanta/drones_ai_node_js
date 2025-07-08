// /src/app/contact/page.tsx
'use client';

import { Suspense, lazy } from 'react';
import { Metadata } from 'next';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

// Lazy load components for better performance
const ContactHero = lazy(() => import('@/components/organisms/ContactHero'));
const ContactForm = lazy(() => import('@/components/organisms/ContactForm'));
const InteractiveMap = lazy(() => import('@/components/organisms/InteractiveMap'));
const OfficeInfo = lazy(() => import('@/components/organisms/OfficeInfo'));
const ContactMethods = lazy(() => import('@/components/organisms/ContactMethods'));

export const metadata: Metadata = {
  title: 'Contact Us - AI Drone Solutions',
  description: 'Get in touch with our team for AI-powered drone solutions. Located in Salt Lake City, Utah.',
  keywords: 'contact, ai drone, salt lake city, drone services, consultation',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Suspense fallback={<LoadingSpinner />}>
        <ContactHero />
      </Suspense>

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form Section */}
          <div className="order-2 lg:order-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Map Section */}
          <div className="order-1 lg:order-2">
            <Suspense fallback={<LoadingSpinner />}>
              <InteractiveMap />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="container mx-auto px-4 py-16">
        <Suspense fallback={<LoadingSpinner />}>
          <OfficeInfo />
        </Suspense>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <Suspense fallback={<LoadingSpinner />}>
          <ContactMethods />
        </Suspense>
      </section>
    </main>
  );
}

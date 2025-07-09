// src/app/about/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="h-screen bg-black flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-green-400/30 rounded-full animate-spin border-t-green-400"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-green-400/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Dynamic imports for better performance
const AboutHero = dynamic(() => import('@/components/organisms/AboutHero'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const CompanyStory = dynamic(() => import('@/components/organisms/CompanyStory'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const MissionValues = dynamic(() => import('@/components/organisms/MissionValues'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const TeamSection = dynamic(() => import('@/components/organisms/TeamSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

const HoustonSection = dynamic(() => import('@/components/organisms/HoustonSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />
});

export default function AboutPage() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <AboutHero />
      </Suspense>
      
      {/* Company Story Timeline */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CompanyStory />
      </Suspense>
      
      {/* Mission & Values */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <MissionValues />
      </Suspense>
      
      {/* Team Section */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <TeamSection />
      </Suspense>
      
      {/* Houston Headquarters */}
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <HoustonSection />
      </Suspense>
      
      {/* Call to Action Footer */}
      <section className="py-20 px-4 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the future of autonomous drone technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105 glow glow-hover">
              Work With Us
            </button>
            <button className="px-8 py-4 border-2 border-blue-500 hover:bg-blue-500/20 rounded-full font-bold text-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105">
              Explore Partnerships
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

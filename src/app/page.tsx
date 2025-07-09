// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues with Three.js
const HeroSection = dynamic(() => import('@/components/organisms/HeroSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black flex items-center justify-center"><div className="loading-spinner w-12 h-12" /></div>
});

const ServiceShowcase = dynamic(() => import('@/components/organisms/ServiceShowcase'), {
  ssr: false,
});

const EnhancedDroneViewer = dynamic(() => import('@/components/organisms/EnhancedDroneViewer'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
});

const DrainageStory = dynamic(() => import('@/components/organisms/DrainageStory'), {
  ssr: false,
});

const ElphelCameraShowcase = dynamic(() => import('@/components/organisms/ElphelCameraShowcase'), {
  ssr: false,
});

const RTOSDevelopment = dynamic(() => import('@/components/organisms/RTOSDevelopment'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
        
        {/* Service Showcase */}
        <ServiceShowcase />
        
        {/* 3D Drone Viewer */}
        <EnhancedDroneViewer />
        
        {/* Drainage Story */}
        <DrainageStory />
        
        {/* Elphel Camera Showcase */}
        <ElphelCameraShowcase />
        
        {/* RTOS Development */}
        <RTOSDevelopment />
        
        {/* Footer */}
        <footer className="py-20 px-4 bg-gradient-to-t from-gray-900 to-black">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of drone technology today
            </p>
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105 glow glow-hover">
              Schedule a Demo
            </button>
          </div>
        </footer>
    </main>
  );
}

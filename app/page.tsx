'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues with Three.js
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Particle effect overlay */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              AI-Powered
            </span>
            <span className="block mt-2">Drone Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Revolutionary technology for the future of inspection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]">
              Explore Our Technology
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black rounded-full font-bold transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
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
          <button className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.6)]">
            Schedule a Demo
          </button>
        </div>
      </footer>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  );
}

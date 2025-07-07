// src/components/organisms/EnhancedDroneViewer.tsx
'use client';

import React from 'react';

export default function EnhancedDroneViewer() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Interactive 3D Drone Model
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our cutting-edge drone technology in stunning 3D
          </p>
        </div>
        
        {/* Placeholder for 3D viewer */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-green-500/40 rounded-full animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🚁</span>
                </div>
              </div>
              <p className="text-gray-400">3D Drone Viewer Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">Session 5 Implementation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

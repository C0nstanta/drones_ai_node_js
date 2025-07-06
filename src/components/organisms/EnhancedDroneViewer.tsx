'use client';

import React from 'react';

export default function EnhancedDroneViewer() {
  return (
    <section className="relative h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-pulse">🚁</div>
          <h3 className="text-3xl font-bold text-green-400 mb-2">3D Drone Viewer</h3>
          <p className="text-gray-300">Interactive 3D model coming soon</p>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md rounded-lg p-6 border border-green-500/30 max-w-md">
        <h3 className="text-green-400 font-bold mb-2">Interactive 3D Model</h3>
        <p className="text-gray-300 text-sm">
          Experience our cutting-edge drone technology with advanced visual effects.
        </p>
      </div>
    </section>
  );
}

'use client';

import React from 'react';

export default function ElphelCameraShowcase() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gradient">
          Elphel Military-Grade Cameras
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Precision Beyond Compare</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <strong className="text-xl">0.05 Pixel Disparity</strong>
                  <p className="text-gray-400">Ultra-high precision for critical applications</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <strong className="text-xl">Thermal + Visible Integration</strong>
                  <p className="text-gray-400">Dual spectrum imaging in real-time</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <strong className="text-xl">Open Source Design</strong>
                  <p className="text-gray-400">Full transparency and customization</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="text-6xl">📷</div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

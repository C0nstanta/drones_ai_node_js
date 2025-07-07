// src/components/organisms/ElphelCameraShowcase.tsx
'use client';

import React from 'react';

export default function ElphelCameraShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-orange-900/10 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Elphel Military-Grade Cameras
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            0.05 pixel disparity resolution with thermal + visible spectrum
          </p>
        </div>
        
        {/* Placeholder for camera showcase */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/30">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">0.05px</div>
                <p className="text-gray-400">Disparity Resolution</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">2</div>
                <p className="text-gray-400">Spectrum Types</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">360°</div>
                <p className="text-gray-400">Field of View</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Technical showcase coming in Session 7</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/organisms/RTOSDevelopment.tsx
'use client';

import React from 'react';

export default function RTOSDevelopment() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-purple-900/10 to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            RTOS Development
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time operating system with 500Hz-1kHz update rates
          </p>
        </div>
        
        {/* Placeholder for RTOS visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/30">
            {/* Code snippet preview */}
            <div className="bg-black rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">
{`void flight_control_loop() {
  while(1) {
    read_sensors();
    calculate_pid();
    update_motors();
    vTaskDelay(2); // 500Hz update rate
  }
}`}
              </pre>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-500 mb-2">1kHz</div>
                <p className="text-gray-400">Max Update Rate</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-500 mb-2">&lt;2ms</div>
                <p className="text-gray-400">Latency</p>
              </div>
              <div className="bg-black/50 rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-500 mb-2">4</div>
                <p className="text-gray-400">CPU Cores</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Interactive visualization coming in Session 8</p>
          </div>
        </div>
      </div>
    </section>
  );
}

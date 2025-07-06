'use client';

import React, { useEffect, useState } from 'react';

export default function RTOSDevelopment() {
  const [code, setCode] = useState('');
  const fullCode = `void flight_control_loop() {
  while(1) {
    read_sensors();
    calculate_pid();
    update_motors();
    vTaskDelay(2); // 500Hz update rate
  }
}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCode.length) {
        setCode(fullCode.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gradient">
          RTOS Development
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-6 border border-green-500/30">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm">flight_control.c</span>
            </div>
            <pre className="text-green-400 font-mono text-sm">
              <code>{code}</code>
              <span className="animate-pulse">|</span>
            </pre>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ultra-Low Latency</h3>
              <div className="flex items-center justify-between mb-2">
                <span>Update Rate</span>
                <span className="text-green-400 font-bold">500Hz - 1kHz</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• FreeRTOS & NuttX Support</li>
                <li>• Hardware Abstraction Layer</li>
                <li>• Real-time Sensor Fusion</li>
                <li>• Fault-Tolerant Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

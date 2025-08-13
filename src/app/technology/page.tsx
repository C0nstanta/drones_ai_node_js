// src/app/technology/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology - Deep Sky Solutions | RTOS, AI Drone Detection, Thermal Imaging',
  description: 'Explore our cutting-edge technology stack: Real-Time Operating Systems for drone detection, Elphel thermal imaging, InterProInvest military-grade systems, and AI-powered analytics.',
  keywords: 'RTOS drone detection, real-time operating system, Elphel thermal imaging, LWIR technology, InterProInvest, RF jamming, drone detection algorithms, AI drone technology, Houston tech company',
  openGraph: {
    title: 'Advanced Drone Technology - Deep Sky Solutions',
    description: 'Revolutionary technology stack: RTOS integration, military-grade detection systems, thermal imaging, and AI-powered analytics',
    url: 'https://deepskysolutions.com/technology',
    images: [
      {
        url: '/technology-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Sky Solutions Technology Stack',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Drone Technology - Deep Sky Solutions',
    description: 'RTOS, AI detection, thermal imaging - the future of drone technology',
  },
};

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black via-blue-900/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30 text-cyan-300 text-sm font-semibold backdrop-blur-sm mb-6">
              CUTTING-EDGE INNOVATION
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technology Stack
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Powered by <span className="text-cyan-400 font-semibold">Real-Time Operating Systems</span>, 
              <span className="text-blue-400 font-semibold"> Military-Grade Detection</span>, and 
              <span className="text-purple-400 font-semibold"> AI-Driven Analytics</span>
            </p>
          </div>
        </div>
      </section>

      {/* RTOS Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Real-Time Operating System
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-900/10 rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">RTOS Core Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span><strong>1000Hz Update Rate:</strong> Real-time sensor processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span><strong>&lt;2ms Latency:</strong> Ultra-low response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span><strong>Multi-Core Processing:</strong> 8 CPU cores utilized</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span><strong>FreeRTOS/NuttX:</strong> Industry-standard kernels</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-700">
              <div className="font-mono text-sm text-green-400 overflow-x-auto">
                <pre>{`// Drone Detection Core
void detection_task() {
  while(1) {
    sensor_data = read_sensors();
    result = ai_detect(&sensor_data);
    if (result.confidence > 0.95) {
      trigger_alert(&result);
    }
    vTaskDelay(1); // 1000Hz
  }
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* InterProInvest Partnership */}
      <section className="py-20 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 font-semibold mb-4">
              Partnership with InterProInvest
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Military-Grade Drone Detection
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combat-proven RF detection and jamming systems from Ukraine's battlefield
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">5km</div>
              <p className="text-gray-300">Detection Range</p>
            </div>
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-xl p-6 border border-red-500/30 text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">1000W</div>
              <p className="text-gray-300">Jamming Power</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl p-6 border border-green-500/30 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">2020+</div>
              <p className="text-gray-300">Combat Tested</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-full border border-red-500/30">
              <span className="text-red-300 font-semibold">✓ Battlefield Proven in Ukraine Since 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* Elphel Thermal Imaging */}
      <section className="py-20 bg-gradient-to-b from-black via-orange-950/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 font-semibold mb-4">
              Powered by Elphel Inc.
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced Thermal Imaging
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Military-grade LWIR technology with AFWERX partnership
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 rounded-xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-orange-400 mb-6">Elphel Camera System</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">0.05px</div>
                  <p className="text-sm text-gray-400">Resolution Disparity</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">20x</div>
                  <p className="text-sm text-gray-400">Sensitivity Improved</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">2.5km</div>
                  <p className="text-sm text-gray-400">Detection Range</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-400">87ms</div>
                  <p className="text-sm text-gray-400">Processing Time</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30">
              <h4 className="text-lg font-bold text-white mb-3">AFWERX Partnership</h4>
              <p className="text-gray-400 mb-4">U.S. Air Force innovation program collaboration</p>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Through-foliage detection</li>
                <li>✓ Open-source hardware</li>
                <li>✓ AI-enhanced processing</li>
                <li>✓ 360° gimbal rotation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
            Full Technology Stack
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { name: 'Hardware Layer', tech: 'FPGA, ARM Cortex, GPU, Sensors', color: 'from-red-500 to-orange-500' },
              { name: 'RTOS Layer', tech: 'FreeRTOS, NuttX, Real-time Scheduling', color: 'from-orange-500 to-yellow-500' },
              { name: 'Middleware', tech: 'ROS2, MAVLink, DDS, Message Queues', color: 'from-yellow-500 to-green-500' },
              { name: 'AI/ML Layer', tech: 'TensorFlow Lite, YOLO, Computer Vision', color: 'from-green-500 to-cyan-500' },
              { name: 'Application', tech: 'React, WebRTC, REST APIs, WebSockets', color: 'from-cyan-500 to-blue-500' },
              { name: 'Cloud', tech: 'AWS, Real-time Analytics, ML Pipeline', color: 'from-blue-500 to-purple-500' },
            ].map((layer, index) => (
              <div key={index} className={`bg-gradient-to-r ${layer.color} p-0.5 rounded-xl`}>
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                    <p className="text-gray-400">{layer.tech}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Our Technology?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us to learn how our advanced drone technology can transform your operations
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <span>Get Started</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}

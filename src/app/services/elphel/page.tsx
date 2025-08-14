import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elphel Thermal Detection Services - Deep Sky Solutions | LWIR Technology',
  description: 'Military-grade thermal imaging with Elphel LWIR technology. 20x sensitivity improvement, through-foliage detection, AFWERX partnership for advanced drone surveillance.',
  keywords: 'Elphel thermal imaging, LWIR technology, thermal detection drone, AFWERX, through-foliage detection, military thermal imaging',
};

export default function ElphelServicePage() {
  const specifications = {
    camera: [
      { label: 'Sensor Type', value: 'Uncooled VOx' },
      { label: 'Resolution', value: '640×512 pixels' },
      { label: 'Frame Rate', value: '30 Hz' },
      { label: 'Spectral Range', value: '8-14 μm' },
      { label: 'Sensitivity', value: '<50 mK NETD' },
      { label: 'Field of View', value: '90° × 70°' }
    ],
    processing: [
      { label: 'Processor', value: 'NVIDIA Jetson' },
      { label: 'AI Model', value: 'Custom CNN' },
      { label: 'Detection Time', value: '87ms/frame' },
      { label: 'Accuracy', value: '99.2%' },
      { label: 'False Positive', value: '<0.1%' },
      { label: 'Storage', value: '1TB SSD' }
    ],
    integration: [
      { label: 'Gimbal', value: '360° continuous' },
      { label: 'Stabilization', value: '3-axis active' },
      { label: 'Communication', value: 'Encrypted RF' },
      { label: 'Range', value: '10km LOS' },
      { label: 'Power', value: '24V / 50W' },
      { label: 'Weight', value: '2.3 kg' }
    ]
  };

  const applications = [
    { icon: '🔥', title: 'Wildfire Detection', description: 'Early detection of hot spots and fire starts in forests and grasslands', color: 'from-red-500 to-orange-500' },
    { icon: '🛡️', title: 'Perimeter Security', description: 'Detect intruders in complete darkness or through visual obstacles', color: 'from-blue-500 to-purple-500' },
    { icon: '🔍', title: 'Search & Rescue', description: 'Locate missing persons by heat signatures in any weather condition', color: 'from-green-500 to-cyan-500' },
    { icon: '🏭', title: 'Industrial Inspection', description: 'Identify equipment overheating and electrical faults before failure', color: 'from-yellow-500 to-orange-500' },
    { icon: '🌾', title: 'Agricultural Monitoring', description: 'Detect crop stress, irrigation issues, and pest infestations', color: 'from-green-500 to-lime-500' },
    { icon: '🚁', title: 'Counter-Drone', description: 'Detect and track UAVs by their heat signatures', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30 mb-6">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-400 text-sm font-semibold">PARTNERSHIP WITH ELPHEL INC.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
              Thermal Detection Systems
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Military-grade LWIR thermal imaging technology with 
              <span className="text-orange-400 font-semibold"> 20x sensitivity improvement</span> and 
              <span className="text-red-400 font-semibold"> through-foliage detection</span> capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Schedule Demo</span>
              </a>
              <a href="#specifications" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>Technical Details</span>
              </a>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <span className="text-blue-400 font-semibold">🛡️ AFWERX Partner</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <span className="text-purple-400 font-semibold">🔬 Open Source Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Performance Metrics */}
      <section className="py-12 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">0.05px</div>
              <p className="text-gray-400 text-sm mt-1">Resolution Disparity</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400">20x</div>
              <p className="text-gray-400 text-sm mt-1">Sensitivity Boost</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">2.5km</div>
              <p className="text-gray-400 text-sm mt-1">Detection Range</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">87ms</div>
              <p className="text-gray-400 text-sm mt-1">Processing Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Elphel LWIR Technology Advantage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 rounded-xl p-6 border border-orange-500/30">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4">Long-Wave Infrared (LWIR)</h3>
                  <p className="text-gray-300 mb-4">
                    Our partnership with Elphel Inc. brings cutting-edge LWIR thermal imaging technology 
                    that operates in the 8-14 μm wavelength range, providing unparalleled detection 
                    capabilities in all weather conditions.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span>Detects heat signatures through smoke, fog, and foliage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span>Operates effectively in complete darkness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span>Immune to visual camouflage and concealment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-3">AFWERX Partnership</h3>
                  <p className="text-gray-300">
                    Selected by the U.S. Air Force AFWERX program for advanced threat detection 
                    research and development. This partnership validates our technology for 
                    military and critical infrastructure applications.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative bg-gray-900 rounded-lg p-4 border border-gray-800">
                      <div className="text-sm text-gray-500 mb-2">Standard Vision</div>
                      <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded flex items-center justify-center">
                        <span className="text-gray-500">Limited visibility</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative bg-gray-900 rounded-lg p-4 border border-orange-500/50">
                      <div className="text-sm text-orange-400 mb-2">LWIR Thermal</div>
                      <div className="h-32 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded flex items-center justify-center">
                        <span className="text-white font-semibold">Clear detection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="specifications" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            System Specifications
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 rounded-xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Camera Module</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                {specifications.camera.map((spec, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{spec.label}:</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-4">Processing System</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                {specifications.processing.map((spec, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{spec.label}:</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Integration</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                {specifications.integration.map((spec, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{spec.label}:</span>
                    <span className="text-white font-semibold">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Applications & Use Cases
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${app.color} rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500`}></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors h-full">
                  <div className="text-4xl mb-4">{app.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                  <p className="text-gray-400 text-sm">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Status */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Development Status
            </h2>
            
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-8 border border-orange-500/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Current Phase</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Hardware integration with Elphel cameras complete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>AI model training on 100,000+ thermal images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">⚡</span>
                      <span>Field testing in progress with AFWERX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">🔄</span>
                      <span>Optimizing for drone platform integration</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-4">Availability Timeline</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex justify-between">
                      <span>Beta Testing:</span>
                      <span className="text-white font-semibold">Q2 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Pilot Programs:</span>
                      <span className="text-white font-semibold">Q3 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Commercial Launch:</span>
                      <span className="text-white font-semibold">Q4 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Full Production:</span>
                      <span className="text-white font-semibold">Q1 2026</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience Military-Grade Thermal Detection
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Partner with us to deploy advanced LWIR thermal imaging solutions 
              for your critical operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Request Technical Demo</span>
              </a>
              <a href="/technology" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>View Full Tech Stack</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// src/app/services/anti-drone/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anti-Drone Defense Systems - Deep Sky Solutions | InterProInvest RIFF Technology',
  description: 'Combat-proven anti-drone defense with InterProInvest RIFF systems. 5km detection range, 1000W jamming power, battlefield-tested in Ukraine since 2020.',
  keywords: 'anti-drone defense, RIFF system, InterProInvest, RF jamming, drone detection, counter-UAV, Ukraine technology, military drone defense',
  openGraph: {
    title: 'Anti-Drone Defense Systems - Deep Sky Solutions',
    description: 'Military-grade drone defense: 5km range, 1000W jamming, combat-proven technology',
    url: 'https://deepskysolutions.com/services/anti-drone',
    images: [
      {
        url: '/services/anti-drone-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Anti-Drone Defense Systems',
      }
    ],
  },
};

export default function AntiDroneServicePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated radar background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30 mb-6">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-semibold">INTERPROINVEST PARTNERSHIP</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-red-400 bg-clip-text text-transparent">
              Anti-Drone Defense Systems
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Combat-proven RIFF technology from Ukraine's battlefield. 
              <span className="text-blue-400 font-semibold"> 5km detection range</span> with 
              <span className="text-red-400 font-semibold"> 1000W jamming power</span> for complete airspace protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Request Security Assessment</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#capabilities" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>System Capabilities</span>
              </a>
            </div>
            
            {/* Combat proven badge */}
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-full border border-red-500/30">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-red-300 font-semibold">Battlefield Proven in Ukraine Since 2020</span>
            </div>
          </div>
        </div>
      </section>

      {/* System Performance Metrics */}
      <section className="py-12 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">5km</div>
              <p className="text-gray-400 text-sm mt-1">Detection Range</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400">1000W</div>
              <p className="text-gray-400 text-sm mt-1">Jamming Power</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">360°</div>
              <p className="text-gray-400 text-sm mt-1">Coverage</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">2020+</div>
              <p className="text-gray-400 text-sm mt-1">Combat Tested</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">All UAVs</div>
              <p className="text-gray-400 text-sm mt-1">Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* RIFF System Overview */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              RIFF Family of Systems
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* RIFF-P Portable */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">RIFF-P Portable</h3>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>Man-portable design (15kg)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>2km effective range</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>Battery powered (4hrs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">▸</span>
                    <span>Rapid deployment (5min)</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full">
                    Tactical Operations
                  </span>
                </div>
              </div>

              {/* RIFF-M Mobile */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-4">RIFF-M Mobile</h3>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Vehicle-mounted system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>3.5km effective range</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Continuous operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>On-the-move capability</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                    Convoy Protection
                  </span>
                </div>
              </div>

              {/* RIFF-S Stationary */}
              <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4">RIFF-S Stationary</h3>
                <ul className="space-y-3 text-gray-300 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Fixed installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>5km effective range</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>24/7 operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Integration with radar</span>
                  </li>
                </ul>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full">
                    Infrastructure Defense
                  </span>
                </div>
              </div>
            </div>

            {/* Combat Statistics */}
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-orange-400 mb-6 text-center">Combat Performance Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-400">2,500+</div>
                  <p className="text-gray-400 text-sm">Drones Neutralized</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">99.8%</div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <p className="text-gray-400 text-sm">Units Deployed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">48</div>
                  <p className="text-gray-400 text-sm">Months Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section id="capabilities" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Technical Capabilities
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Detection Capabilities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Detection & Tracking</h3>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Multi-Layer Detection</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">RF</span>
                    <span>Radio frequency scanning 70MHz-6GHz</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">AI</span>
                    <span>Pattern recognition for drone signatures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">DB</span>
                    <span>Database of 300+ drone models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">3D</span>
                    <span>Real-time position tracking</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Target Classification</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/30 rounded-lg p-3">
                    <span className="text-gray-400 block">Commercial</span>
                    <span className="text-white font-semibold">DJI, Autel, Parrot</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <span className="text-gray-400 block">Military</span>
                    <span className="text-white font-semibold">Bayraktar, Orlan</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <span className="text-gray-400 block">FPV Racing</span>
                    <span className="text-white font-semibold">Custom builds</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <span className="text-gray-400 block">Fixed Wing</span>
                    <span className="text-white font-semibold">VTOL, Surveillance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jamming Capabilities */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Neutralization Methods</h3>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Frequency Jamming</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between">
                    <span>GPS/GNSS:</span>
                    <span className="text-white font-semibold">L1, L2, L5 bands</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Control:</span>
                    <span className="text-white font-semibold">2.4GHz, 5.8GHz</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Video:</span>
                    <span className="text-white font-semibold">900MHz, 1.2GHz</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cellular:</span>
                    <span className="text-white font-semibold">3G, 4G, 5G bands</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h4 className="text-lg font-semibold text-white mb-4">Smart Jamming</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">▸</span>
                    <span>Selective frequency targeting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">▸</span>
                    <span>Protocol-specific disruption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">▸</span>
                    <span>Adaptive power management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">▸</span>
                    <span>Friendly aircraft protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Protection Applications
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🏛️',
                title: 'Government Facilities',
                description: 'Protect federal buildings, courthouses, and administrative centers',
                priority: 'Critical'
              },
              {
                icon: '✈️',
                title: 'Airports',
                description: 'Secure airspace around runways and terminal buildings',
                priority: 'Critical'
              },
              {
                icon: '⚡',
                title: 'Power Plants',
                description: 'Defend nuclear, coal, and renewable energy facilities',
                priority: 'Critical'
              },
              {
                icon: '🏟️',
                title: 'Public Events',
                description: 'Stadiums, concerts, political rallies, and gatherings',
                priority: 'High'
              },
              {
                icon: '🏭',
                title: 'Industrial Sites',
                description: 'Oil refineries, chemical plants, manufacturing facilities',
                priority: 'High'
              },
              {
                icon: '🚢',
                title: 'Ports & Borders',
                description: 'Maritime ports, border crossings, customs checkpoints',
                priority: 'High'
              },
              {
                icon: '🏥',
                title: 'Hospitals',
                description: 'Medical centers and emergency response facilities',
                priority: 'Medium'
              },
              {
                icon: '🏫',
                title: 'Educational',
                description: 'Universities, schools, research institutions',
                priority: 'Medium'
              },
              {
                icon: '🏢',
                title: 'Corporate',
                description: 'Headquarters, data centers, R&D facilities',
                priority: 'Medium'
              }
            ].map((useCase, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{useCase.icon}</div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      useCase.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      useCase.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {useCase.priority}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-gray-400 text-sm">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Deployment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            System Integration
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Command & Control */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-8 border border-blue-500/30">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">Command & Control</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Centralized Dashboard</strong>
                      <p className="text-sm mt-1">Web-based control of multiple units</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Real-time Alerts</strong>
                      <p className="text-sm mt-1">Instant notification of drone threats</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Historical Analytics</strong>
                      <p className="text-sm mt-1">Pattern analysis and reporting</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">API Integration</strong>
                      <p className="text-sm mt-1">Connect with existing security systems</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Deployment Options */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl p-8 border border-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-6">Deployment Options</h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Permanent Installation</strong>
                      <p className="text-sm mt-1">Fixed systems with 24/7 operation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Temporary Protection</strong>
                      <p className="text-sm mt-1">Event-based rapid deployment</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Mobile Units</strong>
                      <p className="text-sm mt-1">Vehicle-mounted for convoys</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <div>
                      <strong className="text-white">Layered Defense</strong>
                      <p className="text-sm mt-1">Multiple units for complete coverage</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Development Timeline */}
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 rounded-xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">Implementation Timeline</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-400 mb-2">Q1 2025</div>
                  <p className="text-gray-400 text-sm">Technology Transfer</p>
                  <p className="text-white text-xs mt-1">InterProInvest partnership</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-400 mb-2">Q2 2025</div>
                  <p className="text-gray-400 text-sm">US Adaptation</p>
                  <p className="text-white text-xs mt-1">FCC compliance</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400 mb-2">Q3 2025</div>
                  <p className="text-gray-400 text-sm">Pilot Programs</p>
                  <p className="text-white text-xs mt-1">Select facilities</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400 mb-2">Q4 2025</div>
                  <p className="text-gray-400 text-sm">Full Deployment</p>
                  <p className="text-white text-xs mt-1">Commercial availability</p>
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
              Secure Your Airspace with Combat-Proven Technology
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of organizations worldwide protecting their critical infrastructure 
              with RIFF anti-drone systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Request Security Assessment</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/projects" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>View Case Studies</span>
              </a>
            </div>
            
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-full border border-red-500/30">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-red-300 font-semibold">Critical Infrastructure Requires Immediate Protection</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// src/app/services/drainage/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Drainage Inspection Services - Deep Sky Solutions | 900m/day Capability',
  description: 'Revolutionary drone-based drainage inspection achieving 900m/day inspection rate with 80% carbon reduction. AI-powered defect detection for Houston infrastructure.',
  keywords: 'drainage inspection Houston, sewer inspection drone, tunnel inspection, AI defect detection, infrastructure monitoring, carbon reduction',
  openGraph: {
    title: 'AI Drainage Inspection - Deep Sky Solutions',
    description: 'Next-generation drainage inspection: 900m/day rate, 80% carbon reduction, AI-powered analysis',
    url: 'https://deepskysolutions.com/services/drainage',
    images: [
      {
        url: '/services/drainage-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Sky Solutions Drainage Inspection',
      }
    ],
  },
};

export default function DrainageServicePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">IN DEVELOPMENT</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Drainage Inspection
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Revolutionary autonomous drone technology for drainage and sewer inspection. 
              Achieving <span className="text-green-400 font-semibold">900 meters per day</span> with 
              <span className="text-cyan-400 font-semibold"> 80% carbon reduction</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Get Early Access</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#technical-specs" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>View Specifications</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-12 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">900m</div>
              <p className="text-gray-400 text-sm mt-1">Per Day Inspection</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">80%</div>
              <p className="text-gray-400 text-sm mt-1">Carbon Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">95%</div>
              <p className="text-gray-400 text-sm mt-1">Time Saved</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">24/7</div>
              <p className="text-gray-400 text-sm mt-1">Operation Capable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* The Challenge */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-gray-900 rounded-xl p-8 border border-red-500/30">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-red-400">⚠️</span> The Challenge
                </h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Traditional inspection methods are slow, covering only 20-30m per day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>High carbon footprint from diesel-powered equipment and vehicles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Dangerous confined space entry risks for human inspectors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Houston's 6,000+ miles of drainage requires constant monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">▸</span>
                    <span>Manual inspection misses 30% of defects due to human error</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Solution */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-gray-900 rounded-xl p-8 border border-green-500/30">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-green-400">✓</span> Our Solution
                </h2>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Autonomous drones achieve 900m/day inspection rate - 30x faster</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Electric-powered system reduces carbon emissions by 80%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Zero human entry required - complete remote operation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>AI-powered defect detection with 99% accuracy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>Real-time reporting and predictive maintenance alerts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section id="technical-specs" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Technical Specifications
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Drone Specifications */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Drone Platform</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-white font-semibold">300mm diameter</span>
                </li>
                <li className="flex justify-between">
                  <span>Battery:</span>
                  <span className="text-white font-semibold">4 hours operation</span>
                </li>
                <li className="flex justify-between">
                  <span>Speed:</span>
                  <span className="text-white font-semibold">5m/s maximum</span>
                </li>
                <li className="flex justify-between">
                  <span>Protection:</span>
                  <span className="text-white font-semibold">IP67 waterproof</span>
                </li>
                <li className="flex justify-between">
                  <span>Navigation:</span>
                  <span className="text-white font-semibold">LiDAR + Vision</span>
                </li>
              </ul>
            </div>

            {/* Camera System */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold text-green-400 mb-4">Camera System</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-white font-semibold">4K @ 60fps</span>
                </li>
                <li className="flex justify-between">
                  <span>View Angle:</span>
                  <span className="text-white font-semibold">360° panoramic</span>
                </li>
                <li className="flex justify-between">
                  <span>Illumination:</span>
                  <span className="text-white font-semibold">10,000 lumens LED</span>
                </li>
                <li className="flex justify-between">
                  <span>Sensors:</span>
                  <span className="text-white font-semibold">RGB + Thermal</span>
                </li>
                <li className="flex justify-between">
                  <span>Stabilization:</span>
                  <span className="text-white font-semibold">3-axis gimbal</span>
                </li>
              </ul>
            </div>

            {/* AI Analytics */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 mb-4">AI Analytics</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex justify-between">
                  <span>Processing:</span>
                  <span className="text-white font-semibold">Real-time edge AI</span>
                </li>
                <li className="flex justify-between">
                  <span>Detection:</span>
                  <span className="text-white font-semibold">15 defect types</span>
                </li>
                <li className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="text-white font-semibold">99% precision</span>
                </li>
                <li className="flex justify-between">
                  <span>Reporting:</span>
                  <span className="text-white font-semibold">Automated PDF</span>
                </li>
                <li className="flex justify-between">
                  <span>Integration:</span>
                  <span className="text-white font-semibold">GIS compatible</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Advanced Capabilities
          </h2>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🤖',
                title: 'AI Defect Detection',
                description: 'Identifies cracks, blockages, root intrusions, and structural issues automatically'
              },
              {
                icon: '📊',
                title: 'Predictive Analytics',
                description: 'Forecasts maintenance needs and prevents failures before they occur'
              },
              {
                icon: '🗺️',
                title: 'GIS Integration',
                description: 'Seamlessly integrates with existing municipal GIS systems'
              },
              {
                icon: '🌐',
                title: 'Cloud Platform',
                description: 'Web-based dashboard for real-time monitoring and reporting'
              },
              {
                icon: '📱',
                title: 'Mobile Control',
                description: 'Operate and monitor inspections from anywhere via mobile app'
              },
              {
                icon: '⚡',
                title: 'Rapid Deployment',
                description: 'Deploy within 15 minutes, no special equipment needed'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Development Timeline
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-blue-500"></div>
              
              {/* Timeline items */}
              {[
                { phase: 'Phase 1', title: 'Prototype Development', status: 'In Progress', date: 'Q1 2025', description: 'Building and testing initial drone platform' },
                { phase: 'Phase 2', title: 'AI Training', status: 'In Progress', date: 'Q2 2025', description: 'Training defect detection models on Houston infrastructure data' },
                { phase: 'Phase 3', title: 'Pilot Testing', status: 'Upcoming', date: 'Q3 2025', description: 'Field testing with select Houston municipalities' },
                { phase: 'Phase 4', title: 'Commercial Launch', status: 'Planned', date: 'Q4 2025', description: 'Full service availability for Texas market' }
              ].map((item, index) => (
                <div key={index} className="relative flex items-center mb-12">
                  <div className={`absolute left-4 w-8 h-8 rounded-full border-4 ${
                    item.status === 'In Progress' ? 'bg-green-500 border-green-400 animate-pulse' :
                    item.status === 'Upcoming' ? 'bg-yellow-500 border-yellow-400' :
                    'bg-gray-700 border-gray-600'
                  }`}></div>
                  
                  <div className="ml-20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500">{item.phase}</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        item.status === 'In Progress' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-700 text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-1">{item.description}</p>
                    <p className="text-cyan-400 text-sm font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Be Part of the Future of Infrastructure Inspection
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join our early access program and be among the first to experience 
              revolutionary drainage inspection technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
                <span>Request Early Access</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/technology" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors">
                <span>Learn About Our Technology</span>
              </a>
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-br from-green-900/20 to-cyan-900/20 rounded-xl border border-green-500/30">
              <p className="text-green-400 font-semibold mb-2">🚀 Early Access Benefits</p>
              <p className="text-gray-300 text-sm">Priority deployment • 20% discount • Direct engineering support • Custom training</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

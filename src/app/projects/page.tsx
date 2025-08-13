// src/app/projects/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Case Studies - Deep Sky Solutions | Drone Detection & Inspection',
  description: 'Explore our drone technology projects: military-grade detection systems, infrastructure inspection, thermal imaging deployments, and RTOS integration case studies.',
  keywords: 'drone projects Houston, case studies, drone detection implementation, thermal imaging projects, RTOS integration, infrastructure inspection, military drone defense',
  openGraph: {
    title: 'Projects & Case Studies - Deep Sky Solutions',
    description: 'Real-world applications of our drone detection, inspection, and defense technologies',
    url: 'https://deepskysolutions.com/projects',
    images: [
      {
        url: '/projects-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Sky Solutions Projects',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drone Technology Projects - Deep Sky Solutions',
    description: 'Innovative drone solutions for defense, infrastructure, and inspection',
  },
};

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  status: 'In Development' | 'Pilot Phase' | 'Planning';
  duration: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'critical-infrastructure-defense',
    title: 'Critical Infrastructure Drone Defense System',
    category: 'Defense & Security',
    client: 'Government Facility (Confidential)',
    status: 'Pilot Phase',
    duration: '6 months',
    technologies: ['InterProInvest RIFF', 'RTOS', 'AI Detection', 'RF Jamming'],
    description: 'Comprehensive drone detection and neutralization system for protecting critical infrastructure facilities in Texas.',
    challenge: 'A major government facility required protection against unauthorized drone intrusions, including both commercial and military-grade UAVs. The system needed to operate 24/7 with zero false positives in a complex RF environment near Houston airports.',
    solution: 'Deployed InterProInvest RIFF technology with custom RTOS integration for real-time threat assessment. Implemented multi-layer detection using RF scanning, thermal imaging, and acoustic sensors with AI-powered threat classification.',
    results: [
      '5km detection radius achieved',
      '99.7% threat detection accuracy',
      '<2 second response time',
      'Zero false positives in airport proximity',
      '360° coverage with redundant systems'
    ],
    image: '/projects/defense-system.jpg',
    featured: true
  },
  {
    id: 'houston-drainage-inspection',
    title: 'Houston Drainage Network AI Inspection',
    category: 'Infrastructure Inspection',
    client: 'Municipal Water Authority',
    status: 'In Development',
    duration: '12 months',
    technologies: ['AI Computer Vision', 'Thermal Imaging', 'Autonomous Navigation', 'Cloud Analytics'],
    description: 'Revolutionary drainage tunnel inspection system achieving 900m/day inspection rate with 80% carbon footprint reduction.',
    challenge: 'Houston\'s extensive drainage system requires regular inspection to prevent flooding. Traditional methods are slow, dangerous for workers, and carbon-intensive, taking weeks to inspect small sections.',
    solution: 'Developed autonomous drone system with specialized lighting and 4K cameras for tunnel navigation. AI-powered defect detection identifies cracks, blockages, and structural issues in real-time.',
    results: [
      '900 meters/day inspection rate',
      '80% reduction in carbon emissions',
      '95% reduction in inspection time',
      'Automated report generation',
      'Predictive maintenance recommendations'
    ],
    image: '/projects/drainage-inspection.jpg',
    featured: true
  },
  {
    id: 'wildfire-detection-network',
    title: 'Early Wildfire Detection Network',
    category: 'Environmental Monitoring',
    client: 'Texas Forest Service',
    status: 'Planning',
    duration: '8 months',
    technologies: ['Elphel LWIR', 'AI Pattern Recognition', 'Mesh Networking', 'Solar Power'],
    description: 'Advanced thermal imaging network for early wildfire detection across Texas wilderness areas.',
    challenge: 'Texas experiences numerous wildfires annually, causing millions in damage. Early detection is critical but challenging across vast, remote areas with no infrastructure.',
    solution: 'Deploying Elphel thermal cameras on autonomous drones with AI-powered smoke and heat signature detection. Solar-powered base stations create mesh network for continuous monitoring.',
    results: [
      '20x improvement in detection sensitivity',
      'Detection within 3 minutes of ignition',
      '2.5km detection range per unit',
      'Solar-powered 24/7 operation',
      'Automated alert system to fire departments'
    ],
    image: '/projects/wildfire-detection.jpg',
    featured: false
  },
  {
    id: 'pipeline-monitoring-system',
    title: 'Oil & Gas Pipeline Monitoring',
    category: 'Industrial Inspection',
    client: 'Energy Corporation',
    status: 'Pilot Phase',
    duration: '4 months',
    technologies: ['Thermal Imaging', 'Methane Detection', 'RTOS', 'Beyond Visual Line of Sight'],
    description: 'Automated pipeline inspection system for detecting leaks, intrusions, and maintenance issues across 500+ miles.',
    challenge: 'Energy companies need continuous monitoring of extensive pipeline networks for leaks, unauthorized access, and maintenance issues. Manual inspection is costly and infrequent.',
    solution: 'BVLOS drone operations with specialized methane sensors and thermal imaging. RTOS ensures real-time data processing and immediate alert generation for critical issues.',
    results: [
      '500+ miles coverage per day',
      'Methane leak detection at 10ppm',
      'Thermal anomaly detection',
      'Automated daily reports',
      '60% reduction in inspection costs'
    ],
    image: '/projects/pipeline-monitoring.jpg',
    featured: false
  },
  {
    id: 'border-security-deployment',
    title: 'Border Security Drone Detection',
    category: 'Defense & Security',
    client: 'Border Protection Agency',
    status: 'In Development',
    duration: '10 months',
    technologies: ['InterProInvest Technology', 'AI Classification', 'Night Vision', 'Counter-UAV'],
    description: 'Advanced drone detection and classification system for border security operations with counter-UAV capabilities.',
    challenge: 'Border agencies face increasing threats from drug smuggling drones and surveillance UAVs. Need to detect, classify, and neutralize threats without affecting legitimate aircraft.',
    solution: 'Integrated InterProInvest combat-proven technology with AI classification to distinguish between threats and authorized aircraft. Selective jamming capabilities for threat neutralization.',
    results: [
      'Detection up to 5km range',
      'Friend-or-foe identification',
      '1000W selective jamming',
      'Integration with existing radar',
      'Mobile and fixed deployments'
    ],
    image: '/projects/border-security.jpg',
    featured: false
  },
  {
    id: 'agricultural-monitoring',
    title: 'Precision Agriculture Monitoring',
    category: 'Agricultural Technology',
    client: 'Texas Agricultural Cooperative',
    status: 'Planning',
    duration: '3 months',
    technologies: ['Multispectral Imaging', 'AI Analytics', 'Automated Flight', 'Cloud Platform'],
    description: 'Smart farming solution using drones for crop health monitoring, irrigation optimization, and yield prediction.',
    challenge: 'Large farms need efficient monitoring of crop health, pest infestations, and irrigation needs across thousands of acres. Traditional methods miss problems until significant damage occurs.',
    solution: 'Automated drone flights with multispectral cameras detect crop stress before visible to human eye. AI analyzes data for actionable insights on irrigation, fertilization, and pest control.',
    results: [
      '1000 acres/day coverage',
      'Early disease detection',
      '30% water usage reduction',
      'Yield prediction accuracy 92%',
      'ROI within first season'
    ],
    image: '/projects/agriculture.jpg',
    featured: false
  }
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-black via-blue-900/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300 text-sm font-semibold backdrop-blur-sm mb-6">
              REAL-WORLD APPLICATIONS
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Projects & Case Studies
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Exploring innovative drone solutions for defense, infrastructure, and environmental challenges. 
              From concept to deployment, see how our technology transforms industries.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400">6</div>
              <p className="text-gray-400 text-sm mt-1">Active Projects</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">3</div>
              <p className="text-gray-400 text-sm mt-1">Industries Served</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">99.7%</div>
              <p className="text-gray-400 text-sm mt-1">Detection Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">80%</div>
              <p className="text-gray-400 text-sm mt-1">Carbon Reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Featured Projects
          </h2>
          
          <div className="space-y-20">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative bg-gray-900 rounded-xl p-8 border border-gray-800">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'Pilot Phase' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-orange-400 mb-2">Challenge</h4>
                          <p className="text-gray-300 text-sm">{project.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-green-400 mb-2">Solution</h4>
                          <p className="text-gray-300 text-sm">{project.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-xl font-bold text-white mb-4">Key Results</h4>
                    <ul className="space-y-3">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Client:</span>
                          <p className="text-white font-semibold">{project.client}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="text-white font-semibold">{project.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Additional Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div key={project.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>
                <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded">
                      {project.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      project.status === 'Planning' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Client:</span>
                      <span className="text-gray-300">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="text-gray-300">{project.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how our drone technology can solve your unique challenges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span>Start Your Project</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/technology"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 rounded-full text-white font-semibold border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <span>Explore Our Technology</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

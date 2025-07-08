// File: /src/components/Footer.tsx
// Path: /src/components/Footer.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                AI Drone Solutions
              </h3>
              <p className="text-gray-400 mt-2">
                Headquartered in Salt Lake City, Utah
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <address className="text-gray-400 not-italic">
                  222 S Main Street<br />
                  Salt Lake City, UT 84101<br />
                  United States
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+18015553766" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +1 (801) 555-DRONE
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:contact@aidronesolutions.com" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@aidronesolutions.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-green-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-gray-400 hover:text-green-400 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-green-400 transition-colors">
                  Careers in Utah
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/drainage-inspection" className="text-gray-400 hover:text-green-400 transition-colors">
                  AI Drainage Inspection
                </Link>
              </li>
              <li>
                <Link href="/services/thermal-detection" className="text-gray-400 hover:text-green-400 transition-colors">
                  Thermal Detection (Elphel)
                </Link>
              </li>
              <li>
                <Link href="/services/anti-drone" className="text-gray-400 hover:text-green-400 transition-colors">
                  Anti-Drone Defense (InterProInvest)
                </Link>
              </li>
              <li>
                <Link href="/services/custom-solutions" className="text-gray-400 hover:text-green-400 transition-colors">
                  Custom Drone Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Utah Resources & Partners */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Utah Tech Community</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://siliconslopes.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-1"
                >
                  <span>Silicon Slopes</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://business.utah.gov" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-1"
                >
                  <span>Utah Business</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://utahtech.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-1"
                >
                  <span>Utah Technology Council</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://edcutah.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-1"
                >
                  <span>Economic Development Utah</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-6 text-center">Strategic Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-gray-400">
              <p className="font-semibold">InterProInvest</p>
              <p className="text-sm">Anti-Drone Technology</p>
            </div>
            <div className="text-gray-400">
              <p className="font-semibold">Elphel</p>
              <p className="text-sm">Thermal Imaging Systems</p>
            </div>
            <div className="text-gray-400">
              <p className="font-semibold">AFWERX</p>
              <p className="text-sm">Innovation Partner</p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a 
                href="https://www.facebook.com/AIDroneSolutionsSLC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com/AIDroneSLC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ai-drone-solutions-slc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@AIDroneSLC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} AI Drone Solutions. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Proudly serving Utah and the Mountain West from Salt Lake City
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/accessibility" className="hover:text-gray-300 transition-colors">
              Accessibility
            </Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">
              Sitemap
            </Link>
            <span>•</span>
            <span>Salt Lake City, Utah, USA 🇺🇸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

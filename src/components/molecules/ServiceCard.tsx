'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  metrics?: {
    label: string;
    value: string;
    percentage?: number;
  }[];
  gradient?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  metrics = [],
  gradient = 'from-green-500 to-blue-500',
  delay = 0,
}: ServiceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000`} />
      
      <div
        className="relative h-full w-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-lg bg-gray-900/90 backdrop-blur-md border border-gray-700 p-8 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: `rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 136, 0.3), transparent 50%)`,
            }}
          />
          
          <motion.div
            className="text-6xl mb-6"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          
          {metrics.length > 0 && (
            <div className="space-y-3">
              {metrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">{metric.label}</span>
                    <span className="text-sm font-bold text-green-400">{metric.value}</span>
                  </div>
                  {metric.percentage !== undefined && (
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.percentage}%` }}
                        transition={{ duration: 1, delay: delay + 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 text-xs text-gray-500">
            Click to flip →
          </div>
        </div>
        
        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-lg bg-gray-900/90 backdrop-blur-md border border-gray-700 p-8 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Technical Details</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Key Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Real-time data processing</li>
                <li>AI-powered analytics</li>
                <li>Cloud integration</li>
                <li>Enterprise-grade security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Three.js', 'WebGL', 'AI/ML'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs text-gray-500">
            ← Click to flip back
          </div>
        </div>
      </div>
    </motion.div>
  );
}

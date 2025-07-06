'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  href?: string;
}

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  href,
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
    
    if (onClick) onClick();
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-green-500 hover:bg-green-600 text-black',
    secondary: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black',
  };

  const baseClasses = `
    relative overflow-hidden rounded-full font-bold transition-all duration-300
    transform hover:scale-105 active:scale-95
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const glowStyles = {
    boxShadow: isHovered
      ? variant === 'primary'
        ? '0 0 30px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.4), 0 0 90px rgba(0, 255, 136, 0.2)'
        : '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)'
      : '0 0 15px rgba(0, 255, 136, 0.3)',
  };

  const ButtonContent = (
    <>
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
          animation: isHovered ? 'shimmer 2s infinite' : 'none',
        }}
      />
      
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-30"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animation: 'ripple 1s ease-out',
          }}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
      
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        style={glowStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {ButtonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      style={glowStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {ButtonContent}
    </motion.button>
  );
}

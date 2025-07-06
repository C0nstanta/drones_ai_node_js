// src/components/molecules/ServiceCard/ServiceCard.tsx
'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  metric?: {
    value: string;
    label: string;
  };
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  metric,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D rotation based on mouse position
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.serviceCard}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glassmorphism background */}
      <div className={styles.glassBackground} />
      
      {/* Animated gradient border */}
      <div className={styles.borderGradient} />
      
      {/* Content */}
      <div className={styles.content}>
        {/* Floating animated icon */}
        <motion.div
          className={styles.iconWrapper}
          animate={{
            y: isHovered ? -10 : 0,
            rotateZ: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {icon}
        </motion.div>
        
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {/* Features list */}
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.featureBullet}>▸</span>
              {feature}
            </motion.li>
          ))}
        </ul>
        
        {/* Metric display */}
        {metric && (
          <motion.div
            className={styles.metric}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={styles.metricLabel}>{metric.label}</div>
          </motion.div>
        )}
      </div>
      
      {/* Holographic effect overlay */}
      <div className={styles.hologram} />
    </motion.div>
  );
};

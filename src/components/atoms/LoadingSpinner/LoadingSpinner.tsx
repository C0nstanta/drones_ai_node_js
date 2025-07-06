// src/components/atoms/LoadingSpinner/LoadingSpinner.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullScreen = false,
}) => {
  const sizes = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const currentSize = sizes[size];

  const spinner = (
    <div className={`${styles.spinnerContainer} ${styles[size]}`}>
      {/* Outer ring with gradient */}
      <motion.div
        className={styles.outerRing}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner ring with opposite rotation */}
      <motion.div
        className={styles.innerRing}
        animate={{ rotate: -360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Center pulse */}
      <motion.div
        className={styles.centerPulse}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Orbital dots */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={styles.orbitalDot}
          style={{
            width: currentSize,
            height: currentSize,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.5,
          }}
        >
          <div className={styles.dot} />
        </motion.div>
      ))}
      
      {/* Tech text */}
      <div className={styles.loadingText}>LOADING</div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenWrapper}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

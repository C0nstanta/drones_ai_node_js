// /src/components/molecules/FormProgress.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './FormProgress.module.css';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress = ({ currentStep, totalSteps }: FormProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = (currentStep / totalSteps) * 100;
    
    gsap.to(fillRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [currentStep, totalSteps]);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <span className={styles.stepIndicator}>
          Step {currentStep} of {totalSteps}
        </span>
        <span className={styles.progressPercentage}>
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div ref={progressRef} className={styles.progressBar}>
        <div ref={fillRef} className={styles.progressFill}>
          <div className={styles.progressGlow} />
        </div>
      </div>

      <div className={styles.stepDots}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${
              i + 1 <= currentStep ? styles.active : ''
            } ${i + 1 === currentStep ? styles.current : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FormProgress;

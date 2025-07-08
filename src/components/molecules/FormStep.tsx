// /src/components/molecules/FormStep.tsx
'use client';

import { ReactNode } from 'react';
import styles from './FormStep.module.css';

interface FormStepProps {
  title: string;
  description: string;
  children: ReactNode;
}

const FormStep = ({ title, description, children }: FormStepProps) => {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
      <div className={styles.stepContent}>
        {children}
      </div>
    </div>
  );
};

export default FormStep;

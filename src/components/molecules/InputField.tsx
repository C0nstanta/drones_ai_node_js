// /src/components/molecules/InputField.tsx
'use client';

import { forwardRef, ReactNode } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, ...props }, ref) => {
    return (
      <div className={styles.fieldContainer}>
        <label className={styles.label}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {label}
        </label>
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            {...props}
          />
          {error && <span className={styles.errorIcon}>⚠️</span>}
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;

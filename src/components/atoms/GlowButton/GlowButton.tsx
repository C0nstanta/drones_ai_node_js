// src/components/atoms/GlowButton/GlowButton.tsx
'use client';

import { ButtonHTMLAttributes, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GlowButton.module.css';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; key: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = Date.now();

    setRipples(prev => [...prev, { x, y, key }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.key !== key));
    }, 1000);

    onClick?.(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${styles.glowButton} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      {...props}
    >
      <span className={styles.content}>{children}</span>
      <div className={styles.glowEffect} />
      
      {ripples.map(({ x, y, key }) => (
        <span
          key={key}
          className={styles.ripple}
          style={{
            left: x,
            top: y,
          }}
        />
      ))}
    </motion.button>
  );
};

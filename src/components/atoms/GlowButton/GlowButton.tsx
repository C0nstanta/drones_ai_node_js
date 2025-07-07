// src/components/atoms/GlowButton/GlowButton.tsx
'use client';

import React, { useState, useRef } from 'react';
import styles from './GlowButton.module.css';

interface RippleType {
  x: number;
  y: number;
  id: number;
}

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function GlowButton({
  children,
  onClick,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}: GlowButtonProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleCounter = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleCounter.current++;

      setRipples(prev => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, 600);
    }

    // Call onClick handler
    onClick?.();
  };

  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const variantClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    danger: styles.danger,
  };

  return (
    <button
      ref={buttonRef}
      className={`
        ${styles.button} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${disabled ? styles.disabled : ''}
        ${loading ? styles.loading : ''}
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* Glow layers */}
      <span className={styles.glowOuter} />
      <span className={styles.glowInner} />
      
      {/* Button content */}
      <span className={styles.content}>
        {loading ? (
          <>
            <span className={styles.spinner}>
              <span className={styles.spinnerRing} />
            </span>
            <span className={styles.loadingText}>Loading...</span>
          </>
        ) : (
          children
        )}
      </span>

      {/* Ripple effects */}
      <span className={styles.rippleContainer}>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </span>

      {/* Enhanced glow effect on hover */}
      <span className={styles.hoverGlow} />
    </button>
  );
}

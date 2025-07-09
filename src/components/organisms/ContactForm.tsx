// File: /src/components/organisms/ContactForm.tsx
// Absolute path: /src/components/organisms/ContactForm.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import GlowButton from '@/components/atoms/GlowButton/GlowButton';
import styles from './ContactForm.module.css';
import { Send, Check as CheckCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: 'drainage' | 'thermal' | 'antiDrone' | 'custom';
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'custom',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Animate form fields on mount
    const ctx = gsap.context(() => {
      gsap.fromTo('.form-field',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Animate success message
    gsap.fromTo(successRef.current,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: 'custom',
        message: ''
      });
      setShowSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={styles.formContainer}>
      {showSuccess ? (
        <div ref={successRef} className={styles.successMessage}>
          <CheckCircle className={styles.successIcon} />
          <h3>Message Sent Successfully!</h3>
          <p>We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <div className={`form-field ${styles.formField}`}>
            <label htmlFor="name" className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={`form-field ${styles.formField}`}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="john@company.com"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={`form-field ${styles.formRow}`}>
            <div className={styles.formField}>
              <label htmlFor="company" className={styles.label}>
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
                placeholder="Acme Corp"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className={`form-field ${styles.formField}`}>
            <label htmlFor="service" className={styles.label}>
              Service Interest
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="drainage">Drainage Inspection</option>
              <option value="thermal">Thermal Detection (Elphel)</option>
              <option value="antiDrone">Anti-Drone Defense</option>
              <option value="custom">Custom Solution</option>
            </select>
          </div>

          <div className={`form-field ${styles.formField}`}>
            <label htmlFor="message" className={styles.label}>
              Message <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
              placeholder="Tell us about your project..."
              rows={5}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>

          <div className={styles.formActions}>
            <GlowButton
              type="submit"
              size="large"
              loading={isSubmitting}
              fullWidth
            >
              <Send size={20} />
              Send Message
            </GlowButton>
          </div>
        </form>
      )}
    </div>
  );
}

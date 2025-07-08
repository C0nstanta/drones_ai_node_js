// /src/components/organisms/ContactForm.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import gsap from 'gsap';
import styles from './ContactForm.module.css';
import FormStep from '@/components/molecules/FormStep';
import FormProgress from '@/components/molecules/FormProgress';
import InputField from '@/components/molecules/InputField';
import { FiCheck, FiSend, FiUser, FiMail, FiPhone, FiMessageSquare, FiPaperclip } from 'react-icons/fi';

// Form validation schema
const schema = yup.object({
  contactType: yup.string().required('Please select a contact type'),
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().matches(/^[\d\s()-]+$/, 'Please enter a valid phone number'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  attachment: yup.mixed().test('fileSize', 'File size must be less than 5MB', (value) => {
    if (!value || !value[0]) return true;
    return value[0].size <= 5242880;
  }),
});

type FormData = yup.InferType<typeof schema>;

const CONTACT_TYPES = [
  { value: 'sales', label: 'Sales Inquiry', icon: '💼' },
  { value: 'support', label: 'Technical Support', icon: '🛠️' },
  { value: 'partnership', label: 'Partnership Opportunity', icon: '🤝' },
  { value: 'general', label: 'General Question', icon: '💬' },
];

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    if (submitSuccess && successRef.current) {
      gsap.fromTo(successRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );
    }
  }, [submitSuccess]);

  const handleStepChange = async (step: number) => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid || step < currentStep) {
      setCurrentStep(step);
      animateStepTransition();
    }
  };

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case 1:
        return await trigger('contactType');
      case 2:
        return await trigger(['name', 'email', 'phone']);
      case 3:
        return await trigger('message');
      default:
        return true;
    }
  };

  const animateStepTransition = () => {
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setCurrentStep(1);
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep title="How can we help you?" description="Select the type of inquiry">
            <div className={styles.contactTypeGrid}>
              {CONTACT_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`${styles.contactTypeCard} ${
                    watchedValues.contactType === type.value ? styles.selected : ''
                  }`}
                >
                  <input
                    type="radio"
                    value={type.value}
                    {...register('contactType')}
                    className={styles.hiddenInput}
                  />
                  <span className={styles.contactTypeIcon}>{type.icon}</span>
                  <span className={styles.contactTypeLabel}>{type.label}</span>
                </label>
              ))}
            </div>
            {errors.contactType && (
              <p className={styles.errorMessage}>{errors.contactType.message}</p>
            )}
          </FormStep>
        );

      case 2:
        return (
          <FormStep title="Tell us about yourself" description="We'd love to know who we're talking to">
            <div className={styles.inputGroup}>
              <InputField
                label="Full Name"
                icon={<FiUser />}
                error={errors.name?.message}
                {...register('name')}
              />
              <InputField
                label="Email Address"
                type="email"
                icon={<FiMail />}
                error={errors.email?.message}
                {...register('email')}
              />
              <InputField
                label="Phone Number (Optional)"
                type="tel"
                icon={<FiPhone />}
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>
          </FormStep>
        );

      case 3:
        return (
          <FormStep title="Your message" description="Tell us more about your project or question">
            <div className={styles.inputGroup}>
              <div className={styles.textareaWrapper}>
                <label className={styles.label}>
                  <FiMessageSquare className={styles.icon} />
                  Message
                </label>
                <textarea
                  {...register('message')}
                  className={styles.textarea}
                  rows={6}
                  placeholder="Describe your project or question in detail..."
                />
                <span className={styles.charCount}>
                  {watchedValues.message?.length || 0} / 500
                </span>
                {errors.message && (
                  <p className={styles.errorMessage}>{errors.message.message}</p>
                )}
              </div>

              <div className={styles.fileUpload}>
                <label className={styles.fileLabel}>
                  <FiPaperclip className={styles.icon} />
                  <span>Attach files (optional)</span>
                  <input
                    type="file"
                    {...register('attachment')}
                    className={styles.fileInput}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
                <p className={styles.fileHint}>PDF, DOC, DOCX, JPG, or PNG (max 5MB)</p>
              </div>
            </div>
          </FormStep>
        );

      case 4:
        return (
          <FormStep title="Review and submit" description="Please review your information">
            <div className={styles.reviewSection}>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Inquiry Type:</span>
                <span className={styles.reviewValue}>
                  {CONTACT_TYPES.find(t => t.value === watchedValues.contactType)?.label}
                </span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Name:</span>
                <span className={styles.reviewValue}>{watchedValues.name}</span>
              </div>
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Email:</span>
                <span className={styles.reviewValue}>{watchedValues.email}</span>
              </div>
              {watchedValues.phone && (
                <div className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>Phone:</span>
                  <span className={styles.reviewValue}>{watchedValues.phone}</span>
                </div>
              )}
              <div className={styles.reviewItem}>
                <span className={styles.reviewLabel}>Message:</span>
                <p className={styles.reviewMessage}>{watchedValues.message}</p>
              </div>
            </div>
          </FormStep>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div ref={successRef} className={styles.successContainer}>
        <div className={styles.successIcon}>
          <FiCheck size={48} />
        </div>
        <h3 className={styles.successTitle}>Thank you!</h3>
        <p className={styles.successMessage}>
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <FormProgress currentStep={currentStep} totalSteps={4} />
      
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {renderStepContent()}

        <div className={styles.navigation}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep - 1)}
              className={styles.navButton}
            >
              Previous
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className={styles.navButtonPrimary}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <span className={styles.loadingSpinner} />
              ) : (
                <>
                  <FiSend />
                  Submit
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

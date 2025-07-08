// /src/utils/validation.ts

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-numeric characters except + for international
  const cleaned = phone.replace(/[^\d+]/g, '');
  // Check if it's a valid US phone number (10 digits) or international format
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as US phone number if 10 digits
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as international if starts with 1 and has 11 digits
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if doesn't match expected formats
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const sanitizeInput = (input: string): string => {
  // Basic XSS prevention
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateMessage = (message: string, minLength: number = 10, maxLength: number = 500): {
  isValid: boolean;
  error?: string;
} => {
  if (message.length < minLength) {
    return {
      isValid: false,
      error: `Message must be at least ${minLength} characters long`,
    };
  }
  
  if (message.length > maxLength) {
    return {
      isValid: false,
      error: `Message must not exceed ${maxLength} characters`,
    };
  }
  
  return { isValid: true };
};

// Honeypot field validation (should be empty)
export const validateHoneypot = (value: string): boolean => {
  return value === '';
};

// Rate limiting helper
export const checkRateLimit = (identifier: string, maxAttempts: number = 3, windowMinutes: number = 60): boolean => {
  const key = `rate_limit_${identifier}`;
  const now = Date.now();
  const window = windowMinutes * 60 * 1000;
  
  // Get existing attempts from localStorage
  const attempts = JSON.parse(localStorage.getItem(key) || '[]').filter(
    (timestamp: number) => now - timestamp < window
  );
  
  if (attempts.length >= maxAttempts) {
    return false;
  }
  
  // Add current attempt
  attempts.push(now);
  localStorage.setItem(key, JSON.stringify(attempts));
  
  return true;
};

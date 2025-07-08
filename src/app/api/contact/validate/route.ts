// /src/app/api/contact/validate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/utils/validation';

// Enhanced email validation with domain checking
async function enhancedEmailValidation(email: string): Promise<{
  valid: boolean;
  reason?: string;
}> {
  // Basic format validation
  if (!validateEmail(email)) {
    return { valid: false, reason: 'Invalid email format' };
  }

  // Extract domain
  const domain = email.split('@')[1];
  
  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'outlok.com': 'outlook.com',
  };

  if (commonTypos[domain]) {
    return { 
      valid: false, 
      reason: `Did you mean ${email.replace(domain, commonTypos[domain])}?` 
    };
  }

  // Check for disposable email domains (simplified list)
  const disposableDomains = [
    'tempmail.com',
    'throwaway.email',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
  ];

  if (disposableDomains.includes(domain)) {
    return { valid: false, reason: 'Please use a permanent email address' };
  }

  // In production, you could also:
  // 1. Check MX records for the domain
  // 2. Use a third-party email validation service
  // 3. Send a verification email

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const validation = await enhancedEmailValidation(email);

    return NextResponse.json({
      valid: validation.valid,
      reason: validation.reason,
    });

  } catch (error) {
    console.error('Email validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate email' },
      { status: 500 }
    );
  }
}

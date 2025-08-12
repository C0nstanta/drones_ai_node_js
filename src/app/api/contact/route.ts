// /src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateEmail, validatePhone, sanitizeInput, checkRateLimit } from '@/utils/validation';
import { formatEmailTemplate, formatAutoResponseTemplate } from '@/utils/emailService';

// This would be replaced with actual email service like SendGrid
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  // In production, use SendGrid or similar service
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to,
    from: process.env.CONTACT_EMAIL_FROM,
    subject,
    html,
  };
  
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid error:', error);
    return false;
  }
  */
  
  // For demo purposes, just log and return success
  console.log('Email would be sent:', { to, subject, html });
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIp, 5, 60)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse form data
    const contentType = request.headers.get('content-type');
    let data: any;

    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = {
        contactType: formData.get('contactType') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
        attachment: formData.get('attachment') as File | null,
      };
    } else {
      data = await request.json();
    }

    // Validate required fields
    if (!data.contactType || !data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email
    if (!validateEmail(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (data.phone && !validatePhone(data.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      message: sanitizeInput(data.message),
    };

    // Validate message length
    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Validate attachment if present
    if (data.attachment) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (data.attachment.size > maxSize) {
        return NextResponse.json(
          { error: 'File size must be less than 5MB' },
          { status: 400 }
        );
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];

      if (!allowedTypes.includes(data.attachment.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG' },
          { status: 400 }
        );
      }
    }

    // Send internal notification email
    const internalEmailHtml = formatEmailTemplate(sanitizedData);
    const internalEmailSent = await sendEmail(
      process.env.CONTACT_EMAIL_TO || 'info@deepskysolutions.com',
      `New ${sanitizedData.contactType} inquiry from ${sanitizedData.name}`,
      internalEmailHtml
    );

    if (!internalEmailSent) {
      throw new Error('Failed to send internal notification');
    }

    // Send auto-response to user
    const autoResponseHtml = formatAutoResponseTemplate(sanitizedData.name);
    await sendEmail(
      sanitizedData.email,
      'Thank you for contacting Deep Sky Solutions',
      autoResponseHtml
    );

    // Store in database (implementation would go here)
    // await storeContactSubmission(sanitizedData);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      referenceId: `ADS-${Date.now()}`, // Generate a reference ID
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your request. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to check API health
export async function GET() {
  return NextResponse.json({ status: 'Contact API is running' });
}

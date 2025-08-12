// /src/utils/emailService.ts

interface EmailData {
  contactType: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  attachment?: File;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const sendContactEmail = async (data: EmailData): Promise<EmailResponse> => {
  try {
    // Format the request body
    const formData = new FormData();
    formData.append('contactType', data.contactType);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    
    if (data.phone) {
      formData.append('phone', data.phone);
    }
    
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Failed to send your message. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const validateEmailAddress = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/contact/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    return result.valid;
  } catch (error) {
    console.error('Email validation error:', error);
    // Default to basic validation if API fails
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};

// Email template for internal notifications
export const formatEmailTemplate = (data: EmailData): string => {
  const contactTypeLabels: Record<string, string> = {
    sales: 'Sales Inquiry',
    support: 'Technical Support',
    partnership: 'Partnership Opportunity',
    general: 'General Question',
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00ff88;">New Contact Form Submission</h2>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0;">Contact Information</h3>
        <p><strong>Type:</strong> ${contactTypeLabels[data.contactType] || data.contactType}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 20px; background: #e8f5e9; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2e7d32;">
          <strong>Submitted on:</strong> ${new Date().toLocaleString('en-US', {
            timeZone: 'America/Denver',
            dateStyle: 'full',
            timeStyle: 'short',
          })} MST
        </p>
      </div>
    </div>
  `;
};

// Auto-response template for users
export const formatAutoResponseTemplate = (name: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 40px 0;">
        <h1 style="color: #00ff88; margin-bottom: 10px;">Thank You for Contacting Us!</h1>
        <p style="font-size: 18px; color: #666;">We've received your message</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
        <p style="font-size: 16px; line-height: 1.6;">
          Hi ${name},<br><br>
          Thank you for reaching out to Deep Sky Solutions. We've received your inquiry and our team will review it shortly.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          <strong>What happens next?</strong><br>
          • Our team will review your message within 24 hours<br>
          • You'll receive a personalized response from the appropriate department<br>
          • For urgent matters, feel free to call us at +1 (801) 555-0123
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #666; font-size: 14px;">
          Deep Sky Solutions<br>
          430 S Texas 6, Suite 206, Houston, TX 77079<br>
          <a href="https://deepskysolutions.com/" style="color: #00ff88;">www.deepskysolutions.com/</a>
        </p>
      </div>
    </div>
  `;
};

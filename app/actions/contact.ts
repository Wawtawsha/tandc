'use server';

import { Resend } from 'resend';
import { contactSchema, type ActionState } from '@/lib/validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Extract form fields
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
  };

  // Validate with Zod
  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Extract validated data
  const { name, email, phone, message } = validatedFields.data;

  // Send email via Resend
  try {
    const { error } = await resend.emails.send({
      from: 'Town & Country Website <onboarding@resend.dev>',
      to: [process.env.STORE_EMAIL || 'info@townandcountryfurniture.com'],
      replyTo: email,
      subject: `Contact Form: ${name}`,
      text: `
Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        message: 'Failed to send message. Please call us at (434) 223-8163.',
        errors: {},
        success: false,
      };
    }

    return {
      message: "Thank you! We'll get back to you within 24 hours.",
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error('Network error sending email:', error);
    return {
      message: 'Failed to send message. Please call us at (434) 223-8163.',
      errors: {},
      success: false,
    };
  }
}

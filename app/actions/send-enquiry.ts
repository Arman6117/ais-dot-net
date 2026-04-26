// app/actions/send-enquiry.ts
"use server";

import nodemailer from "nodemailer";

export async function sendEnquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !service || !message) {
    return {
      success: false,
      error: "Please fill in all required fields",
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address",
    };
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: `"AIS Solutions" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📬 New Enquiry from ${name} - AIS Solutions`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Enquiry</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A56DB, #3b7de8); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✨ New Enquiry Received</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">AIS Solutions - Client Inquiry</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; width: 120px; font-weight: 600; color: #1A56DB;">📋 Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A56DB;">📧 Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">
                    <a href="mailto:${email}" style="color: #1A56DB; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A56DB;">📞 Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A56DB;">🎯 Service</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #333;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: 600; color: #1A56DB; vertical-align: top;">💬 Message</td>
                  <td style="padding: 12px 0; color: #333;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This enquiry was submitted from the AIS Solutions website.<br>
                © ${new Date().getFullYear()} AIS Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: `"Dr. Prajyot Patil" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "🙏 Thank you for contacting AIS Solutions",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A56DB, #3b7de8); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Reaching Out! 🙏</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">AIS Solutions</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <p style="font-size: 16px; color: #333;">Dear ${name},</p>
              
              <p style="font-size: 16px; color: #333;">Thank you for contacting <strong style="color: #1A56DB;">AIS Solutions</strong>. We have received your enquiry regarding <strong style="color: #1A56DB;">${service}</strong>.</p>
              
              <div style="background: #f0f7ff; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #1A56DB;">
                <p style="margin: 0 0 8px; color: #333;">📌 <strong>What happens next?</strong></p>
                <p style="margin: 0; color: #555;">Our team will review your requirements and get back to you within <strong>24 hours</strong>.</p>
              </div>
              
              <p style="font-size: 16px; color: #333;">In the meantime, feel free to:</p>
              <ul style="color: #555;">
                <li>📚 Browse our website for more information</li>
                <li>⭐ Check out our client testimonials</li>
                <li>🔔 Follow us on social media for updates</li>
              </ul>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://aissolutions.com'}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #1A56DB, #3b7de8); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Our Website</a>
              </div>
              
              <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0; color: #333;">Best regards,<br>
                <strong style="color: #1A56DB;">Dr. Prajyot Patil</strong><br>
                Founder & Director<br>
                AIS Solutions</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                © ${new Date().getFullYear()} AIS Solutions. All rights reserved.<br>
                Pune, Maharashtra, India
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return {
      success: true,
      message: "Enquiry sent successfully! We'll contact you soon.",
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      success: false,
      error: "Unable to send enquiry. Please try again later or call us directly.",
    };
  }
}
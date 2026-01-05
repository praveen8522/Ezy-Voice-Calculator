import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const transporter = createTransporter();

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'guhanraj29@gmail.com', // Fixed recipient
    subject: `🎙️ EzyVoiceCalc Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e5e5e5;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #8b5cf6;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
          }
          .value {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
          }
          .message-box {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ec4899;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎙️ New Contact Form Submission</h1>
            <p>EzyVoiceCalc Support</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 From</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">📝 Subject</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="field">
              <div class="label">⏰ Received</div>
              <div class="value">${new Date().toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'long'
              })}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent from EzyVoiceCalc Contact Form</p>
            <p>© 2025 EzyVoiceCalc - Voice-Powered Calculator</p>
          </div>
        </div>
      </body>
      </html>
    `,
    // Plain text fallback
    text: `
      New Contact Form Submission
      
      From: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Received: ${new Date().toLocaleString()}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error('Failed to send email');
  }
};

// Send confirmation email to user
export const sendConfirmationEmail = async (userEmail, userName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '✅ Thank you for contacting EzyVoiceCalc',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .content {
            padding: 30px;
            text-align: center;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Thank You!</h1>
          </div>
          
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>Our team is excited to assist you with EzyVoiceCalc!</p>
            
            <a href="https://ezyvoicecalc.com" class="button">Visit Our Website</a>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              Best regards,<br>
              <strong>EzyVoiceCalc Team</strong>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('❌ Confirmation email error:', error);
    // Don't throw error - confirmation email is optional
  }
};
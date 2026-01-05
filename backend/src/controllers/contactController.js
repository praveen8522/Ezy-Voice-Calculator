import { sendContactEmail, sendConfirmationEmail } from '../utils/emailService.js';

// @route   POST /api/contact
// @desc    Submit contact form and send email
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Send email to admin
    await sendContactEmail({ name, email, subject, message });

    // Send confirmation email to user (optional - won't fail if it doesn't send)
    try {
      await sendConfirmationEmail(email, name);
    } catch (err) {
      console.log('Confirmation email failed, but continuing...');
    }

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
};
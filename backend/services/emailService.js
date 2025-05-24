const nodemailer = require('nodemailer');

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Send verification email
exports.sendVerificationEmail = async(to, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Email Verification - Legal Affairs Platform',
        html: `
      <h1>Email Verification</h1>
      <p>Thank you for registering with our Legal Affairs Platform. Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>If you did not create an account, please ignore this email.</p>
      <p>This link will expire in 24 hours.</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, error };
    }
};

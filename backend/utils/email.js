const SibApiV3Sdk = require('sib-api-v3-sdk');

const sendResetEmail = async (email, resetToken) => {
  const apiKey = process.env.BREVO_API_KEY; // Your Brevo API Key
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKeyInstance = defaultClient.authentications['api-key'];
  apiKeyInstance.apiKey = apiKey;

  const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const emailContent = `
    <p>Hi,</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <p><a href="${resetLink}">${resetLink}</a></p>
    <p>If you did not request this, please ignore this email.</p>
  `;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = 'Password Reset Request';
  sendSmtpEmail.htmlContent = emailContent;
  sendSmtpEmail.sender = { email: process.env.BREVO_EMAIL }; // Sender email
  sendSmtpEmail.to = [{ email }]; // Receiver email

  try {
    const response = await transEmailApi.sendTransacEmail(sendSmtpEmail);
    console.log('Password reset email sent successfully', response);
  } catch (error) {
    console.error('Error sending reset email:', error.message);
    throw new Error('Failed to send reset email. Please try again later.');
  }
};

module.exports = { sendResetEmail };

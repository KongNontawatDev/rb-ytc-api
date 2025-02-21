export function getPasswordResetEmailTemplate(resetUrl: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f4f4f4;">
      <div style="text-align: center; padding: 20px; background-color: #06213a; color: #ffffff; border-radius: 10px 10px 0 0;">
        <h2>🔐 Password Reset</h2>
      </div>
      <div style="padding: 20px; background-color: #ffffff; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #333;">
          You requested a password reset. Click the button below to reset your password.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetUrl}" 
            style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #cea96a; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #777;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `;
}

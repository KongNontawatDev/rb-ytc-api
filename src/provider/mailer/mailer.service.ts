import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { getPasswordResetEmailTemplate } from './templates/password-reset-email-template.js';
import { getLoginEmailTemplate } from './templates/login-email-template.js';
@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('mail.host'),
      port: this.configService.get('mail.port'),
      secure: true,
      auth: {
        user: this.configService.get('mail.user'),
        pass: this.configService.get('mail.password'),
      },
      tls: {
        rejectUnauthorized: false, // ข้ามการตรวจสอบ SSL Certificate
      },
    });

  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const emailTemplate = getPasswordResetEmailTemplate(resetUrl);
  
    await this.transporter.sendMail({
      from: `"No Reply" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: emailTemplate,
    });
  }

  async sendLoginEmail(email: string, token: string) {
    const loginUrl = `${process.env.FRONTEND_URL}/auth/login?token=${token}`;
    const emailTemplate = getLoginEmailTemplate(loginUrl);
  
    await this.transporter.sendMail({
      from: `"No Reply" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your Secure Login Link',
      html: emailTemplate,
    });
  }
}

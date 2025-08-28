// src/contact/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // ⚡ En mode dev, on utilise Ethereal
    this.init();
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   auth: {
    //     user: 'YOUR_ETHEREAL_USER', // sera généré
    //     pass: 'YOUR_ETHEREAL_PASS',
    //   },
    // });
  }

    async init() {
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
        user: testAccount.user,
        pass: testAccount.pass,
        },
    });

    console.log('📧 Ethereal SMTP prêt :', testAccount.user, testAccount.pass);
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    if (!this.transporter) {
      throw new Error('Transporter not initialized');
    }

    const info = await this.transporter.sendMail({
      from: '"Form Contact" <no-reply@example.com>',
      to,
      subject,
      text,
      html,
    });

    console.log('📩 Message envoyé : %s', info.messageId);
    console.log('🔗 Preview URL : %s', nodemailer.getTestMessageUrl(info));

    return info;
  }
}

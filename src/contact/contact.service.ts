// src/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmailService } from './email.service';

@Injectable()
export class ContactService {
  constructor(private readonly emailService: EmailService) {}

  async handleMessage(dto: CreateContactDto) {
    await this.emailService.sendMail(
      'ouattaratchonroloh@gmail.com',
      `Nouveau message: ${dto.subject}`,
      `De: ${dto.name} <${dto.email}>\n\n${dto.message}`,
      `<p><b>De:</b> ${dto.name} (${dto.email})</p><p>${dto.message}</p>`,
    );

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès !',
    };
  }
}

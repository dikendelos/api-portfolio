// src/contact/dto/create-contact.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'Le nom est requis.' })
  name: string;

  @IsNotEmpty({ message: 'L\'adresse email est requis.' })
  @IsEmail({}, { message: 'Adresse email invalide.' })
  email: string;

  @IsNotEmpty({ message: 'Le sujet est requis.' })
  subject: string;

  @IsNotEmpty({ message: 'Le message est requis.' })
  @MinLength(10, { message: 'Le message doit contenir au moins 10 caractères.' })
  message: string;
}

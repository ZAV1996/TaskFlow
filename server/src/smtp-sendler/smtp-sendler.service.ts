import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import * as nodemailer from 'nodemailer'
import { env } from 'process';

@Injectable()
export class SmtpSendlerService {
  constructor(private mailerService: MailerService) { }
  async sendUserConfirmation(user: User | null, token: string) {
    const url = `${env.ORIGIN}/confirm?email=${user?.email}&token=${token}`;
    await this.mailerService.sendMail({
      to: user?.email,
      from: 'TaskFlow@uuap.com',
      subject: 'Активация учетной записи',
      template: './confirmation',
      context: {
        name: `${user?.name + ' ' + user?.patronymic}`,
        url,
      },
    });
  }

  async sendForgotPasswordMail(user: User, token: string) {
    const url = `${env.ORIGIN}/set-new-password?email=${user?.email}&token=${token}`;
    await this.mailerService.sendMail({
      to: user?.email,
      from: 'prj@uuap.com',
      subject: 'Восстановление пароля от учетной записи',
      template: './forgot',
      context: {
        name: `${user?.name + ' ' + user?.patronymic}`,
        url,
      },
    });
  }
} 

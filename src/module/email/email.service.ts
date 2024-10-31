import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }


    async sendWelcomeEmail(email: string, name: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Our Service!',
            template: 'welcome',
            context: {
                name,
            },
        });
    }
}
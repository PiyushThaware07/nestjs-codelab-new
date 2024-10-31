import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from './email.service';



@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('MAIL_HOST'),
                    port: configService.get<number>('MAIL_PORT'),
                    secure: false, // false for TLS (port 587)
                    auth: {
                        user: configService.get<string>('MAIL_EMAIL_USER'),
                        pass: configService.get<string>('MAIL_EMAIL_PASS'),
                    },
                },
                defaults: {
                    from: configService.get<string>('MAIL_FROM'),
                },
            }),
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {
    constructor() {
        console.log("email module");
    }
}

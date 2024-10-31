import { Module } from "@nestjs/common";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { EmailModule } from "./module/email/email.module";

@Module({
    imports: [
        AuthModule,
        EmailModule,
        UserModule,
    ],
})


export class ModulesRegistery {
    constructor() { }
}
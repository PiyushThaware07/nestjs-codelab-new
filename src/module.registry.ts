import { Module } from "@nestjs/common";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { EmailModule } from "./module/email/email.module";
import { CoreMockDriveModule } from "./module/mock/core.mock.drive.module";
import { CoreQuizModule } from "./module/quiz/core.quiz.module";

@Module({
    imports: [
        AuthModule,
        EmailModule,
        UserModule,
        CoreMockDriveModule,
        CoreQuizModule,
    ],
})


export class ModulesRegistery {
    constructor() { }
}
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CustomJwtStartegy } from "./strategy/custom.jwt.strategy";
import { CustomGoogleStartegy } from "./strategy/custom.google.strategy";
import { EmailModule } from "../email/email.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({
            secret: "secret",
            signOptions: { expiresIn: "30d" }
        }),

        EmailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, CustomJwtStartegy,CustomGoogleStartegy],
    exports: [AuthService]
})

export class AuthModule {
    constructor() {
        console.log("auth module");
    }
}
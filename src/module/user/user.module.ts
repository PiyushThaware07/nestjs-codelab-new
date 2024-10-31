import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "./entities/user.entity";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService,UserResolver],
    exports: [UserService],
})


export class UserModule {
    constructor() {
        console.log("user module");
    }
}
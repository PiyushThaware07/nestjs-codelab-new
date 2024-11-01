import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizEntity } from "./entities/quiz.entity";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";
import { MockDriveEntity } from "src/module/mock/mock/entities/mock.drive.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuizEntity,MockDriveEntity])],
    controllers: [QuizController],
    providers: [QuizService],
    exports: [QuizService]
})


export class QuizModule {
    constructor() {
        console.log("quiz module");
    }
}
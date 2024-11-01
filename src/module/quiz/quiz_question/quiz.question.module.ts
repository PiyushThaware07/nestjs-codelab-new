import { Module } from "@nestjs/common";
import { QuizQuestionController } from "./quiz.question.controller";
import { QuizQuestionService } from "./quiz.question.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizQuestionEntity } from "./entities/quiz.question.entity";
import { QuizEntity } from "../quiz/entities/quiz.entity";
import { QuizQuestionBankEntity } from "../question_bank/entities/quiz.question.bank.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuizQuestionEntity,QuizEntity,QuizQuestionBankEntity])],
    controllers: [QuizQuestionController],
    providers: [QuizQuestionService],
    exports: [QuizQuestionService]
})

export class QuizQuestionModule {
    constructor() {
        console.log("quiz question module");
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizAttemptSummaryEntity } from "./entities/quiz.attempt.summary.entity";
import { QuizAttemptSummaryController } from "./quiz.attempt.summary.controller";
import { QuizAttemptSummaryService } from "./quiz.attempt.summary.service";
import { QuizQuestionEntity } from "../quiz_question/entities/quiz.question.entity";
import { QuizEntity } from "../quiz/entities/quiz.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuizAttemptSummaryEntity,QuizQuestionEntity,QuizEntity])],
    controllers: [QuizAttemptSummaryController],
    providers: [QuizAttemptSummaryService],
    exports: [QuizAttemptSummaryService]
})


export class QuizAttemptSummaryModule {
    constructor() {
        console.log("quiz attempt summary module");
    }
}
import { Module } from "@nestjs/common";
import { QuizUserReportController } from "./quiz.user.report.controller";
import { QuizUserReportService } from "./quiz.user.report.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizUserReportEntity } from "./entities/quiz.user.report.entity";
import { QuizQuestionEntity } from "../quiz_question/entities/quiz.question.entity";
import { QuizAttemptSummaryEntity } from "../quiz_attempt_summary/entities/quiz.attempt.summary.entity";
import { QuizEntity } from "../quiz/entities/quiz.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuizUserReportEntity,QuizQuestionEntity,QuizAttemptSummaryEntity,QuizEntity])],
    controllers: [QuizUserReportController],
    providers: [QuizUserReportService],
    exports: [QuizUserReportService],
})

export class QuizUserReportModule {
    constructor() {
        console.log("quiz user report module");
    }
}
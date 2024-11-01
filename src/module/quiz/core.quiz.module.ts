import { Module } from "@nestjs/common";
import { QuizCategoryModule } from "./category/quiz.category.module";
import { QuizQuestionBankModule } from "./question_bank/quiz.question.bank.module";
import { QuizModule } from "./quiz/quiz.module";
import { QuizQuestionModule } from "./quiz_question/quiz.question.module";
import { QuizAttemptSummaryModule } from "./quiz_attempt_summary/quiz.attempt.summary.module";
import { QuizUserReportModule } from "./quiz_user_report/quiz.user.report.module";

@Module({
    imports : [
        QuizCategoryModule,
        QuizQuestionBankModule,
        QuizModule,
        QuizQuestionModule,
        QuizAttemptSummaryModule,
        QuizUserReportModule,
    ],
    controllers : [],
    providers : [],
    exports : []
})


export class CoreQuizModule{
    constructor(){
        console.log("core quiz module");
    }
}
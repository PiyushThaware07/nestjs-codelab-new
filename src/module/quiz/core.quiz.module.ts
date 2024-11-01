import { Module } from "@nestjs/common";
import { QuizCategoryModule } from "./category/quiz.category.module";
import { QuizQuestionBankModule } from "./question_bank/quiz.question.bank.module";
import { QuizModule } from "./quiz/quiz.module";
import { QuizQuestionModule } from "./quiz_question/quiz.question.module";

@Module({
    imports : [QuizCategoryModule,QuizQuestionBankModule,QuizModule,QuizQuestionModule],
    controllers : [],
    providers : [],
    exports : []
})


export class CoreQuizModule{
    constructor(){
        console.log("core quiz module");
    }
}
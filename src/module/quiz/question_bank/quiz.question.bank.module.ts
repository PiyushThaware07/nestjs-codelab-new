import { Module } from "@nestjs/common";
import { QuizQuestionBankController } from "./quiz.question.bank.controller";
import { QuizQuestionBankService } from "./quiz.question.bank.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizQuestionBankEntity } from "./entities/quiz.question.bank.entity";

@Module({
    imports : [TypeOrmModule.forFeature([QuizQuestionBankEntity])],
    controllers : [QuizQuestionBankController],
    providers : [QuizQuestionBankService],
    exports  : [QuizQuestionBankService]
})


export class QuizQuestionBankModule{
    constructor(){
        console.log("quiz question bank module");
    }
}
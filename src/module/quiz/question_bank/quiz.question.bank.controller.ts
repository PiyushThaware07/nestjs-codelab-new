import { Body, Controller, Post, Get, Put, Delete, Param, Request } from "@nestjs/common";
import { QuizQuestionBankService } from "./quiz.question.bank.service";
import { CreateQuizQuestionBankDTO } from "./dto/create.quiz.question.bank.dto";
import { ApiTags } from "@nestjs/swagger";



@ApiTags("quiz question bank")
@Controller("quiz")
export class QuizQuestionBankController {
    constructor(private readonly quizQuestionBankService: QuizQuestionBankService) { }

    @Post("question-bank/create-bulk")
    async createQuestionBank(@Request() req, @Body() payload: Partial<CreateQuizQuestionBankDTO[]>) {
        return await this.quizQuestionBankService.createQuestionBank(req.user.id, payload);
    }


    @Delete("question-bank/:questionId")
    async deleteById(@Param("questionId") questionId: string): Promise<string> {
        return await this.quizQuestionBankService.deleteById(questionId);
    }


    @Put("question-bank/:questionId")
    async updatedById(@Param("questionId") questionId: string, @Body() payload: Partial<CreateQuizQuestionBankDTO>): Promise<string> {
        return await this.quizQuestionBankService.updateById(questionId, payload);
    }
}
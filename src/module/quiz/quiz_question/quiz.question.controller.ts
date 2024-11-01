import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Request } from "@nestjs/common";
import { QuizQuestionService } from "./quiz.question.service";
import { ApiTags } from "@nestjs/swagger";



@ApiTags("quiz question")
@Controller("quiz")
export class QuizQuestionController {
    constructor(private readonly quizQuestionService: QuizQuestionService) { }



    @Post(":quizId/question")
    async generateRandomQuestionByQuizId(@Request() req, @Param("quizId", new ParseUUIDPipe()) quizId: string) {
        return await this.quizQuestionService.generateRandomQuestionByQuizId(req.user.id, quizId);
    }


    @Get(":quizId/attempt/:attemptNumber/question")
    async getQuestionsByQuizIdAndAttemptNumber(@Param("quizId", new ParseUUIDPipe()) quizId: string, @Param("attemptNumber" , new ParseIntPipe()) attemptNumber: number) {
        return await this.quizQuestionService.getQuestionsByQuizIdAndAttemptNumber(quizId, attemptNumber);
    }
}
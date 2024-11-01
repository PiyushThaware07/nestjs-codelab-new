import { Controller, Post, Request, Body, Param, Get } from "@nestjs/common";
import { QuizAttemptSummaryService } from "./quiz.attempt.summary.service";
import { CreateQuizAttemptSummaryDTO } from "./dto/create.quiz.attempt.summary.dto";
import { ApiTags } from "@nestjs/swagger";



@ApiTags("quiz attempt summary")
@Controller("quiz")
export class QuizAttemptSummaryController {
    constructor(private readonly quizAttemptSummaryService: QuizAttemptSummaryService) { }


    @Post(":quizId/attempt/:attemptNumber/summary/save")
    async saveAttmptSummaryByQuizIdAndAttemptNumber(
        @Request() req,
        @Param("quizId") quizId: string,
        @Param("attemptNumber") attemptNumber: number,
        @Body() payload: Partial<CreateQuizAttemptSummaryDTO[]>) {
        return await this.quizAttemptSummaryService.saveAttmptSummaryByQuizIdAndAttemptNumber(req.user.id, quizId, attemptNumber, payload);
    }



    @Get(":quizId/attempt/:attemptNumber/summary/progress")
    async getAttemptSummaryByQuizIdAndAttemptNumber(
        @Request() req,
        @Param("quizId") quizId: string,
        @Param("attemptNumber") attemptNumber: number) {
        return await this.quizAttemptSummaryService.getAttemptSummaryByQuizIdAndAttemptNumber(req.user.id, quizId, attemptNumber);
    }
}
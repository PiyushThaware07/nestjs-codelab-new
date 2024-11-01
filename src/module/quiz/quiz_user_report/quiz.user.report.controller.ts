import { Controller, Param, ParseUUIDPipe, Post, Get, Request, ParseIntPipe, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuizUserReportService } from "./quiz.user.report.service";


@ApiTags("quiz user report")
@Controller("quiz")
export class QuizUserReportController {
    constructor(private readonly quizUserReportService: QuizUserReportService) { }



    @Post(":quizId/attempt/:attemptNumber/report/generate")
    async generateReportByQuizIdAndAttemptNumber(
        @Request() req,
        @Param("quizId", new ParseUUIDPipe()) quizId: string,
        @Param("attemptNumber", new ParseIntPipe()) attemptNumber: number) {
        return await this.quizUserReportService.generateReportByQuizIdAndAttemptNumber(req.user.id, quizId, attemptNumber);
    }

     @Get(":quizId/attempt/:attemptNumber/report")
    getReportByQuizIdAndAttemptNumber(
        @Param("quizId", new ParseUUIDPipe()) quizId: string,
        @Param("attemptNumber") attemptNumber: number,
        @Request() req,) {
        return this.quizUserReportService.getReportByQuizIdAndAttemptNumber(req.user.id, quizId, attemptNumber);
    }

    @Get(":quizId/attempt/:attemptNumber/report/all")
    getAllReportByQuizIdAndAttemptNumber(
        @Param("quizId", new ParseUUIDPipe()) quizId: string,
        @Request() req,) {
        return this.quizUserReportService.getAllReportByQuizIdAndAttemptNumber(req.user.id, quizId);
    }


    @Delete("report/:reportId")
    deleteReportById(@Param("reportId" , new ParseUUIDPipe()) reportId: string) {
        return this.quizUserReportService.deleteReportById(reportId);
    }

}
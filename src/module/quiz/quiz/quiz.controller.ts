import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuizService } from "./quiz.service";
import { CreateQuizDTO } from "./dto/create.quiz.dto";
import { QuizEntity } from "./entities/quiz.entity";

@ApiTags("quiz")
@Controller("quiz")
export class QuizController {
    constructor(private readonly quizService: QuizService) { }


    @Post("mock/:mockId/add")
    async createQuizByMockId(@Request() req, @Param("mockId", new ParseUUIDPipe()) mockId: string, @Body() payload: Partial<CreateQuizDTO>): Promise<QuizEntity> {
        return await this.quizService.createQuizByMockId(req.user.id, mockId, payload);
    }


    @Get()
    async getQuizs(): Promise<QuizEntity[]> {
        return await this.quizService.getQuizs();
    }


    @Get(":quizId")
    async getQuizById(@Param("quizId", new ParseUUIDPipe()) quizId: string): Promise<QuizEntity> {
        return await this.quizService.getQuizById(quizId);
    }


    @Put(":quizId")
    async updateQuizById(@Param("quizId", new ParseUUIDPipe()) quizId: string, @Body() payload: Partial<CreateQuizDTO>): Promise<string> {
        return await this.quizService.updateQuizById(quizId, payload);
    }



    @Delete(":quizId")
    async deleteQuizById(@Param("quizId", new ParseUUIDPipe()) quizId: string): Promise<string> {
        return await this.quizService.deleteQuizById(quizId);
    }




    @Patch(":quizId/publish")
    async publishQuizById(@Param("quizId", new ParseUUIDPipe()) quizId: string): Promise<string> {
        return await this.quizService.publishQuizByid(quizId);
    }

}
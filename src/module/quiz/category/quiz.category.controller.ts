import { Body, Controller, Post, Get, Put, Patch, Delete, Param, Request } from "@nestjs/common";
import { QuizCategoryService } from "./quiz.category.service";
import { CreateQuizCategoryDTO } from "./dto/create.quiz.category.dto";
import { QuizCategoryEntity } from "./entities/quiz.category.entity";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("quiz category")
@Controller("quiz")
export class QuizCategoryController {
    constructor(private readonly quizCategoryService: QuizCategoryService) { }


    @Post("category/add")
    async createCategory(@Request() req, @Body() payload: Partial<CreateQuizCategoryDTO>): Promise<string> {
        return await this.quizCategoryService.createCategory(req.user.id, payload);
    }


    @Get("categories")
    async getCategories(): Promise<QuizCategoryEntity[]> {
        return await this.quizCategoryService.getCategories();
    }


    @Get("category/:categoryId")
    async getCategoryById(@Param("categoryId") categoryId: string): Promise<QuizCategoryEntity> {
        return await this.quizCategoryService.getCategoryById(categoryId);
    }



    @Put("category/:categoryId")
    async updateCategoryById(@Param("categoryId") categoryId: string, @Body() payload: Partial<CreateQuizCategoryDTO>) {
        return await this.quizCategoryService.updateCategoryById(categoryId, payload);
    }



    @Patch("category/:categoryId/publish")
    async publishCategoryById(@Param("categoryId") categoryId: string) {
        return await this.quizCategoryService.publishCategoryById(categoryId);
    }


    @Delete("category/:categoryId")
    async deleteCategoryById(@Param("categoryId") categoryId: string) {
        return await this.quizCategoryService.deleteCategoryById(categoryId);
    }
}
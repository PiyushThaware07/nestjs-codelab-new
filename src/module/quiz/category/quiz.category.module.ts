import { Module } from "@nestjs/common";
import { QuizCategoryController } from "./quiz.category.controller";
import { QuizCategoryService } from "./quiz.category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizCategoryEntity } from "./entities/quiz.category.entity";

@Module({
    imports : [TypeOrmModule.forFeature([QuizCategoryEntity])],
    controllers : [QuizCategoryController],
    providers : [QuizCategoryService],
    exports : [QuizCategoryService],
})

export class QuizCategoryModule{
    constructor() {
        console.log("quiz category module");
    }
}
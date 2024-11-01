import { Module } from "@nestjs/common";
import { QuizCategoryModule } from "./category/quiz.category.module";

@Module({
    imports : [QuizCategoryModule],
    controllers : [],
    providers : [],
    exports : []
})


export class CoreQuizModule{
    constructor(){
        console.log("core quiz module");
    }
}
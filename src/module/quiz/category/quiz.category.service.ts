import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizCategoryEntity } from "./entities/quiz.category.entity";
import { Repository } from "typeorm";
import { CreateQuizCategoryDTO } from "./dto/create.quiz.category.dto";

@Injectable()
export class QuizCategoryService {
    constructor(
        @InjectRepository(QuizCategoryEntity)
        private readonly quizCategoryRepository: Repository<QuizCategoryEntity>,
    ) { }



    async createCategory(userId: string, payload: Partial<CreateQuizCategoryDTO>): Promise<string> {
        const existingCategory = await this.quizCategoryRepository.findOne({ where: { name: payload.name } });
        if (existingCategory) throw new HttpException("quiz category already exists", HttpStatus.CONFLICT);
        const newCategory = this.quizCategoryRepository.create({ ...payload, created_by: userId });
        const savedCategory = await this.quizCategoryRepository.save(newCategory);
        return `quiz category created successfully : ${savedCategory.name}`;
    }


    async getCategories(): Promise<QuizCategoryEntity[]> {
        const result = await this.quizCategoryRepository.find({ where: { is_active: true } });
        return result;
    }



    async getCategoryById(categoryId: string): Promise<QuizCategoryEntity> {
        const existingCategory = await this.quizCategoryRepository.findOne({ where: { id: categoryId } });
        if (!existingCategory) throw new HttpException("quiz category does not exists", HttpStatus.NOT_FOUND);
        return existingCategory;
    }



    async updateCategoryById(categoryId: string, payload: Partial<CreateQuizCategoryDTO>): Promise<string> {
        const existingCategory = await this.quizCategoryRepository.findOne({ where: { id: categoryId } });
        if (!existingCategory) throw new HttpException("quiz category does not exists", HttpStatus.NOT_FOUND);
        await this.quizCategoryRepository.update(existingCategory.id, payload);
        return `quiz category updated successfully : ${existingCategory.name}`;
    }



    async deleteCategoryById(categoryId: string): Promise<string> {
        const existingCategory = await this.quizCategoryRepository.findOne({ where: { id: categoryId } });
        if (!existingCategory) throw new HttpException("quiz category does not exists", HttpStatus.NOT_FOUND);
        await this.quizCategoryRepository.delete(existingCategory.id);
        return `quiz category deleted successfully : ${existingCategory.name}`;
    }


    async publishCategoryById(categoryId: string): Promise<string> {
        const existingCategory = await this.quizCategoryRepository.findOne({ where: { id: categoryId } });
        if (!existingCategory) throw new HttpException("quiz category does not exists", HttpStatus.NOT_FOUND);
        if(existingCategory.is_active) throw new HttpException("quiz category already published", HttpStatus.CONFLICT);
        await this.quizCategoryRepository.update(existingCategory.id, { is_active: true });
        return `quiz category published successfully : ${existingCategory.name}`;
    }
}
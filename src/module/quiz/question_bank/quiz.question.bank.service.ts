import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateQuizQuestionBankDTO } from "./dto/create.quiz.question.bank.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizQuestionBankEntity } from "./entities/quiz.question.bank.entity";
import { Repository } from "typeorm";

@Injectable()
export class QuizQuestionBankService {
    constructor(
        @InjectRepository(QuizQuestionBankEntity)
        private readonly quizQuestionBankRepository: Repository<QuizQuestionBankEntity>
    ) { }

    async createQuestionBank(userId: string, payload: Partial<CreateQuizQuestionBankDTO[]>): Promise<QuizQuestionBankEntity[]> {
        const newQuestionBank = payload.map((question) => {
            return this.quizQuestionBankRepository.create({
                ...question,
                created_by: userId
            })
        })
        return await this.quizQuestionBankRepository.save(newQuestionBank);
    }


    async deleteById(questionId: string): Promise<string> {
        const existingQuestion = await this.quizQuestionBankRepository.findOne({ where: { id: questionId } });
        if (!existingQuestion) throw new HttpException("question does not exists in question bank", HttpStatus.NOT_FOUND);
        await this.quizQuestionBankRepository.delete({ id: questionId });
        return `question from question bank deleted successfully! - ${existingQuestion.title}`;
    }


    async updateById(questionId: string, payload: Partial<CreateQuizQuestionBankDTO>): Promise<string> {
        const existingQuestion = await this.quizQuestionBankRepository.findOne({ where: { id: questionId } });
        if (!existingQuestion) throw new HttpException("question does not exists in question bank", HttpStatus.NOT_FOUND);
        await this.quizQuestionBankRepository.update(existingQuestion.id, payload);
        return `question updated successfully! - ${existingQuestion.title}`;
    }
}
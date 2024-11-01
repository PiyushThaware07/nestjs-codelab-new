import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizEntity } from "./entities/quiz.entity";
import { Repository } from "typeorm";
import { MockDriveEntity } from "src/module/mock/mock/entities/mock.drive.entity";
import { CreateQuizDTO } from "./dto/create.quiz.dto";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(QuizEntity)
        private readonly quizRepository: Repository<QuizEntity>,
        @InjectRepository(MockDriveEntity)
        private readonly mockDriveRepository: Repository<MockDriveEntity>,
    ) { }



    async getQuizs(): Promise<QuizEntity[]> {
        const result = await this.quizRepository.find({ where: { is_active: true } });
        return result
    }


    async getQuizById(quizId: string): Promise<QuizEntity> {
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        return existingQuiz;
    }


    async createQuizByMockId(userId: string, mockId: string, payload: Partial<CreateQuizDTO>): Promise<QuizEntity> {
        const exisitngDrive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!exisitngDrive) throw new HttpException("mock drive not found", HttpStatus.NOT_FOUND);
        const existingQuiz = await this.quizRepository.findOne({ where: { mock_drive_id: mockId } });
        if (existingQuiz) throw new HttpException("quiz already exists for this mock drive", HttpStatus.BAD_REQUEST);
        const newQuiz = this.quizRepository.create({ ...payload, created_by: userId, mock_drive_id: mockId });
        const savedQuiz = await this.quizRepository.save(newQuiz);
        return savedQuiz;
    }


    async updateQuizById(quizId: string, payload: Partial<CreateQuizDTO>): Promise<string> {
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        await this.quizRepository.update(existingQuiz.id, payload);
        return "quiz updated successfully";
    }


    async deleteQuizById(quizId: string): Promise<string> {
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        await this.quizRepository.delete(existingQuiz.id);
        return "quiz deleted successfully";
    }


    async publishQuizByid(quizId: string): Promise<string> {
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        if(existingQuiz.is_active) throw new HttpException("quiz already published", HttpStatus.BAD_REQUEST);
        await this.quizRepository.update(existingQuiz.id, { is_active: true });
        return "quiz published successfully";
    }
}
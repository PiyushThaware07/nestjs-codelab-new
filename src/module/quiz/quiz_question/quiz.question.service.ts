import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizQuestionEntity } from "./entities/quiz.question.entity";
import { Repository } from "typeorm";
import { QuizEntity } from "../quiz/entities/quiz.entity";
import { QuizQuestionBankEntity } from "../question_bank/entities/quiz.question.bank.entity";

@Injectable()
export class QuizQuestionService {
    constructor(
        @InjectRepository(QuizQuestionEntity)
        private readonly quizQuestionRepository: Repository<QuizQuestionEntity>,
        @InjectRepository(QuizEntity)
        private readonly quizRepository: Repository<QuizEntity>,
        @InjectRepository(QuizQuestionBankEntity)
        private readonly quizQuestionBankRepository: Repository<QuizQuestionBankEntity>
    ) { }


    async generateRandomQuestionByQuizId(userId: string, quizId: string) {
        // step 1 : get quiz details
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        // step 2 : calcuate total no of questions
        const totalQuestions = existingQuiz.total_questions * existingQuiz.total_attempts;
        // Step 3: Grab all questions from the question bank (without filtering by quizId)
        const allQuestions = await this.quizQuestionBankRepository.find();
        // Step 4: Check if there are sufficient questions available
        if (allQuestions.length < totalQuestions) throw new HttpException("Not enough questions available in the question bank", HttpStatus.BAD_REQUEST);
        // Step 5: Randomly select 'totalQuestions' from the question bank
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, totalQuestions);
        // Step 6: Determine how many questions to assign per attempt
        const attemptCount = existingQuiz.total_attempts;
        const questionsPerAttempt = Math.ceil(totalQuestions / attemptCount);
        // Step 7: Assign attempt numbers dynamically based on total counts
        const updatedQuestions = selectedQuestions.map((question, index) => {
            const attemptNumber = Math.floor(index / questionsPerAttempt) + 1;
            return { ...question, created_by: userId, attempt_number: attemptNumber, question_id: question.id, quiz_id: quizId };
        });
        // step 8: Insert to db
        const newQuestions = this.quizQuestionRepository.create(updatedQuestions);
        await this.quizQuestionRepository.save(newQuestions);
        return updatedQuestions;
    }




    async getQuestionsByQuizIdAndAttemptNumber(quizId: string, attemptNumber: number): Promise<QuizQuestionEntity[]> {
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not exists", HttpStatus.NOT_FOUND);
        if (attemptNumber <= 0 || attemptNumber > existingQuiz.total_attempts) throw new HttpException('Invalid attempt number', HttpStatus.BAD_REQUEST);
        const quiz_questions = await this.quizQuestionRepository.find({ where: { quiz_id: quizId, attempt_number: attemptNumber } });
        return quiz_questions;
    }
}
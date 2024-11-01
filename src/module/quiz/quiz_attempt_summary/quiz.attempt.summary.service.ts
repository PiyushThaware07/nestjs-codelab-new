import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizAttemptSummaryEntity } from "./entities/quiz.attempt.summary.entity";
import { Repository } from "typeorm";
import { CreateQuizAttemptSummaryDTO } from "./dto/create.quiz.attempt.summary.dto";
import { QuizEntity } from "../quiz/entities/quiz.entity";
import { QuizQuestionEntity } from "../quiz_question/entities/quiz.question.entity";
import { IsUUID } from "class-validator";

@Injectable()
export class QuizAttemptSummaryService {
    constructor(
        @InjectRepository(QuizAttemptSummaryEntity)
        private readonly quizAttemptSummaryRepository: Repository<QuizAttemptSummaryEntity>,
        @InjectRepository(QuizEntity)
        private readonly quizRepository: Repository<QuizEntity>,
        @InjectRepository(QuizQuestionEntity)
        private readonly quizQuestionRepository: Repository<QuizQuestionEntity>
    ) { }




    async saveAttmptSummaryByQuizIdAndAttemptNumber(userId: string, quizId: string, attemptNumber: number, payload: Partial<CreateQuizAttemptSummaryDTO[]>) {
        // 1. check quiz
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        // 2. check quiz attempt
        if (attemptNumber > existingQuiz.total_attempts || attemptNumber <= 0) throw new HttpException("invalid attempt number", HttpStatus.BAD_REQUEST);
        // 3. grab questions from quiz questions
        const quizQuestions = await this.quizQuestionRepository.find({ where: { quiz_id: quizId, attempt_number: attemptNumber } });
        // 4. validate questions
        for (const attemptedData of payload) {
            const { user_answer, question_id, time_taken_to_answer } = attemptedData;
            // validate question_id is a valid uuid
            if (!IsUUID(question_id)) continue;
            // check exist of question
            const question = quizQuestions.find(question => question.id === question_id);
            if (!question) continue;
            // check user answer is correct
            const isMarkedCorrect = question.correct_answer === user_answer;
            // check if record for marked question already exists
            const existingRecord = await this.quizAttemptSummaryRepository.findOne({
                where: { user_id: userId, question_id: question_id, quiz_id: quizId, attempt_number: attemptNumber }
            });
            if (existingRecord) {
                // update existing record
                existingRecord.user_answer = user_answer;
                existingRecord.time_taken_to_answer = time_taken_to_answer;
                existingRecord.is_answer_correct = isMarkedCorrect;
                await this.quizAttemptSummaryRepository.save(existingRecord);
            }
            else {
                // create new record
                const newRecord = this.quizAttemptSummaryRepository.create({
                    user_id: userId,
                    quiz_id: quizId,
                    question_id: question_id,
                    attempt_number: attemptNumber,
                    question_title: question.title,
                    question_topic: question.topic,
                    user_answer: user_answer,
                    correct_answer: question.correct_answer,
                    time_taken_to_answer: time_taken_to_answer,
                    is_answer_correct: isMarkedCorrect,
                });
                await this.quizAttemptSummaryRepository.save(newRecord);
            }
        }
    }



    async getAttemptSummaryByQuizIdAndAttemptNumber(userId:string,quizId:string,attemptNumber:number){
        // 1. check quiz
        const existingQuiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!existingQuiz) throw new HttpException("quiz not found", HttpStatus.NOT_FOUND);
        // 2. check quiz attempt
        if (attemptNumber > existingQuiz.total_attempts || attemptNumber <= 0) throw new HttpException("invalid attempt number", HttpStatus.BAD_REQUEST);
        const summary = await this.quizAttemptSummaryRepository.find({where:{user_id:userId,quiz_id:quizId,attempt_number:attemptNumber},select:["user_answer","question_id"]});
        return summary;
    }
}
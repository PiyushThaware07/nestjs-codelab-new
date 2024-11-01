import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuizUserReportEntity } from "./entities/quiz.user.report.entity";
import { Repository } from "typeorm";
import { QuizQuestionEntity } from "../quiz_question/entities/quiz.question.entity";
import { QuizAttemptSummaryEntity } from "../quiz_attempt_summary/entities/quiz.attempt.summary.entity";
import { QuizEntity } from "../quiz/entities/quiz.entity";
import { find } from "rxjs";

@Injectable()
export class QuizUserReportService {
    constructor(
        @InjectRepository(QuizUserReportEntity)
        private readonly quizUserReportRepository: Repository<QuizUserReportEntity>,
        @InjectRepository(QuizQuestionEntity)
        private readonly quizQuestionRepository: Repository<QuizQuestionEntity>,
        @InjectRepository(QuizAttemptSummaryEntity)
        private readonly quizAttemptSummaryRepository: Repository<QuizAttemptSummaryEntity>,
        @InjectRepository(QuizEntity)
        private readonly quizRepository : Repository<QuizEntity>,
    ) { }


    async generateReportByQuizIdAndAttemptNumber(userId:string,quizId:string,attemptNumber:number):Promise<any>{
        // check existing report
        const existingReport = await this.quizUserReportRepository.findOne({where:{user_id:userId,quiz_id:quizId,attempt_number:attemptNumber}});
        if(existingReport) throw new HttpException("report already exists",HttpStatus.CONFLICT);
        // get questions from quiz_questions
        const quizQuestions = await this.quizQuestionRepository.find({where:{quiz_id:quizId,attempt_number:attemptNumber}});
        const totalQuestions = quizQuestions.length;

        // get attempt questions from quiz_attempt_summary
        const quizAttemptSummary = await this.quizAttemptSummaryRepository.find({where:{user_id:userId,quiz_id:quizId,attempt_number:attemptNumber}});
        const attemptedQuestions = quizAttemptSummary.length;
        const unansweredQuestions = totalQuestions - attemptedQuestions;

        // calcuate other details
        let correctAnswer = 0
        let incorrectAnswer = 0
        for (const result of quizAttemptSummary){
            if(result.is_answer_correct) correctAnswer ++;
            else incorrectAnswer ++;
        }

        const percentage = (correctAnswer/totalQuestions) * 100;
        const existingQuiz = await this.quizRepository.findOne({where:{id:quizId},select:["total_marks"]});
        const totalMarks = Number(existingQuiz.total_marks);


        const obtainedMarks = (correctAnswer / totalQuestions) * totalMarks;
        const enrolledDate = new Date();
        const completionDate = new Date();

        const newReport = this.quizUserReportRepository.create({
            total_questions : totalQuestions,
            total_marks : totalMarks,
            obtained_marks : obtainedMarks,
            attempt_number : attemptNumber,
            unanswered_questions : unansweredQuestions,
            attempted_questions : attemptedQuestions,
            incorrect_answer : incorrectAnswer,
            correct_answer : correctAnswer,
            quiz_id : quizId,
            user_id : userId,
            enrolled_date : enrolledDate,
            completion_date : completionDate,
            percentage : percentage,
        })
        const savedReport = await this.quizUserReportRepository.save(newReport);
        return savedReport;
    }



    async getReportByQuizIdAndAttemptNumber(userId: string, quizId: string, attemptNumber: number) {
        const existingQuiz = await this.quizRepository.findOne({where:{id:quizId}});
        if(!existingQuiz) throw new HttpException("quiz not found",HttpStatus.NOT_FOUND);
        if(attemptNumber > existingQuiz.total_attempts && attemptNumber <= 0) throw new HttpException("invalid attempt number",HttpStatus.BAD_REQUEST);
        const report = await this.quizUserReportRepository.findOne({ where: { user_id: userId, quiz_id: quizId, attempt_number: attemptNumber } })
        if (!report) throw new HttpException("Report not found", HttpStatus.NOT_FOUND);
        return report;
    }

    async getAllReportByQuizIdAndAttemptNumber(userId: string, quizId: string) {
        const report = await this.quizUserReportRepository.find({ where: { user_id: userId, quiz_id: quizId } })
        if (!report) throw new HttpException("Report not found", HttpStatus.NOT_FOUND);
        return report;
    }


    async deleteReportById(reportId: string) {
        const report = await this.quizUserReportRepository.findOne({ where: { id: reportId } });
        if (!report) throw new HttpException("Report not found", HttpStatus.NOT_FOUND);
        await this.quizUserReportRepository.delete(reportId);
        return "Report deleted successfully";
    }
}
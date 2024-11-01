import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MockDriveResultEntity } from "./entities/mock.drive.result.entity";
import { Repository } from "typeorm";
import { MockDriveEntity } from "../mock/entities/mock.drive.entity";
import { MockDriveEnrollmentEntity } from "../enrollment/entities/mock.drive.enrollment.entity";
import { QuizUserReportEntity } from "src/module/quiz/quiz_user_report/entities/quiz.user.report.entity";

@Injectable()
export class MockDriveResultService {
    constructor(
        @InjectRepository(MockDriveResultEntity)
        private readonly mockDriveResultRepository: Repository<MockDriveResultEntity>,
        @InjectRepository(MockDriveEntity)
        private readonly mockDriveRepository:Repository<MockDriveEntity>,
        @InjectRepository(MockDriveEnrollmentEntity)
        private readonly mockDriveEnrollmentRepository:Repository<MockDriveEnrollmentEntity>,
        @InjectRepository(QuizUserReportEntity)
        private readonly quizUserReportRepository : Repository<QuizUserReportEntity>,
    ) { }


    async generateReportById(userId:string,mockId:string){
        const existingDrive = await this.mockDriveRepository.findOne({where:{id:mockId}});
        if(!existingDrive) throw new HttpException("mock drive not found",HttpStatus.NOT_FOUND);

        // get mock drive enrollment details
        const existingDriveEnrollment = await this.mockDriveEnrollmentRepository.findOne({where:{user_id:userId,mock_drive_id:mockId}});
        if(!existingDriveEnrollment) throw new HttpException("mock drive enrollment not found",HttpStatus.NOT_FOUND);

        const onlineTestDate = new Date();
        const codingTestDate = new Date();
        const interviewScheduleDate = new Date();

        // get quiz report details
        // const existingQuizReport = await this.quizUserReportRepository.find({where:{quiz_id:}})
        
    }
}
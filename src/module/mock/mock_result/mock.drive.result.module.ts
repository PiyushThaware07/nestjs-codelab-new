import { Module } from "@nestjs/common";
import { MockDriveResultController } from "./mock.drive.result.controller";
import { MockDriveResultService } from "./mock.drive.result.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MockDriveResultEntity } from "./entities/mock.drive.result.entity";
import { MockDriveEntity } from "../mock/entities/mock.drive.entity";
import { MockDriveEnrollmentEntity } from "../enrollment/entities/mock.drive.enrollment.entity";
import { QuizUserReportEntity } from "src/module/quiz/quiz_user_report/entities/quiz.user.report.entity";


@Module({
    imports: [TypeOrmModule.forFeature([MockDriveResultEntity,MockDriveEntity,MockDriveEnrollmentEntity,QuizUserReportEntity])],
    controllers: [MockDriveResultController],
    providers: [MockDriveResultService],
    exports: [MockDriveResultService]
})


export class MockDriveResultModule {
    constructor() {
        console.log("mock drive result");
    }
}
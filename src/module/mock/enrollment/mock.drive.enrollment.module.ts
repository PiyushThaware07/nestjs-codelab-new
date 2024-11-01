import { Module } from "@nestjs/common";
import { MockDriveEnrollmentController } from "./mock.drive.enrollment.controller";
import { MockDriveEnrollmentService } from "./mock.drive.enrollment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MockDriveEnrollmentEntity } from "./entities/mock.drive.enrollment.entity";
import { MockDriveEntity } from "../mock/entities/mock.drive.entity";
import { CustomCheckMockDriveEnrollmentGuard } from "src/common/guard/custom.check.mock.drive.enrollment.guard";

@Module({
    imports: [TypeOrmModule.forFeature([MockDriveEnrollmentEntity, MockDriveEntity])],
    controllers: [MockDriveEnrollmentController],
    providers: [MockDriveEnrollmentService, CustomCheckMockDriveEnrollmentGuard],
    exports: [MockDriveEnrollmentService],
})

export class MocKDriveEnrollmentModule {
    constructor() {
        console.log("mock drive enrollment module");
    }
}
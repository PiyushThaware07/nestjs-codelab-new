import { Module } from "@nestjs/common";
import { MockDriveModule } from "./mock/mock.drive.module";
import { MocKDriveEnrollmentModule } from "./enrollment/mock.drive.enrollment.module";
import { MockDriveResultModule } from "./mock_result/mock.drive.result.module";

@Module({
    imports: [
        MockDriveModule,
        MocKDriveEnrollmentModule,
        MockDriveResultModule,
    ],
    controllers: [],
    providers: []
})


export class CoreMockDriveModule {
    constructor() {
        console.log("core mock drive module");
    }
}
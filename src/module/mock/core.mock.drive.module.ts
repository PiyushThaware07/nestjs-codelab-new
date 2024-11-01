import { Module } from "@nestjs/common";
import { MockDriveModule } from "./mock/mock.drive.module";
import { MocKDriveEnrollmentModule } from "./enrollment/mock.drive.enrollment.module";

@Module({
    imports : [MockDriveModule,MocKDriveEnrollmentModule],
    controllers : [],
    providers : []
})


export class CoreMockDriveModule{
    constructor(){
        console.log("core mock drive module");
    }
}
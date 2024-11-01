import { Controller, Get, Param, ParseUUIDPipe, Post, Request } from "@nestjs/common";
import { MockDriveEnrollmentService } from "./mock.drive.enrollment.service";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("mock drive enrollment")
@Controller("mock-drive")
export class MockDriveEnrollmentController {
    constructor(private readonly mockDriveenrollmentService: MockDriveEnrollmentService) { }


    @Post(":mockId/enrollment")
    async createEnrollmentByMockId(@Request() req, @Param("mockId", new ParseUUIDPipe()) mockId: string) {
        return await this.mockDriveenrollmentService.createEnrollmentByMockId(req.user.id, mockId);
    }


    @Get(":mockId/enrollment")
    async getUserEnrollmentByMockId(@Request() req, @Param("mockId", new ParseUUIDPipe()) mockId: string) {
        return await this.mockDriveenrollmentService.getUserEnrollmentByMockId(req.user.id, mockId);
    }


    @Get("/enrollments/user")
    async getUserEnrollments(@Request() req) {
        return await this.mockDriveenrollmentService.getUserEnrollments(req.user.id);
    }
}
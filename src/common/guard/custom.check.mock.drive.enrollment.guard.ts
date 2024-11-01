import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MockDriveEnrollmentService } from "src/module/mock/enrollment/mock.drive.enrollment.service";

@Injectable()
export class CustomCheckMockDriveEnrollmentGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly mockDriveEnrollmentService: MockDriveEnrollmentService,
    ) {
    }



    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id;
        const mockId = request.params.mockId;
        

        // Check if user and mock id present or not
        if (!userId) throw new HttpException("userId is missing", HttpStatus.NOT_FOUND);
        if (!mockId) throw new HttpException("mockId is missing", HttpStatus.NOT_FOUND);

        // Check if enrollment exists
        await this.mockDriveEnrollmentService.getUserEnrollmentByMockId(userId, mockId);
        return true;
    }
}

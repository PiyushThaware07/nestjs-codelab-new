import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MockDriveService } from "./mock.drive.service";
import { MockDriveEntity } from "./entities/mock.drive.entity";
import { CreateMockDriveDTO } from "./dto/create.mock.drive.dto";


@ApiTags("mock drive")
@Controller("mock-drive")
export class MockDriveController {
    constructor(private readonly mockDriveService: MockDriveService) { }


    @Get()
    async getMockDrives(): Promise<MockDriveEntity[]> {
        return await this.mockDriveService.getMockDrives();
    }



    @Get(":mockId")
    async getMockDriveById(@Param("mockId", new ParseUUIDPipe()) mockId: string): Promise<MockDriveEntity | null> {
        return await this.mockDriveService.getMockDriveById(mockId);
    }



    @Post()
    async createMockDrive(
        @Body() payload: CreateMockDriveDTO, @Request() req): Promise<string> {
        return await this.mockDriveService.createMockDrive(req.user.id, payload);
    }




    @Put(":mockId")
    async updateMockDriveById(
        @Body() payload: CreateMockDriveDTO,
        @Param("mockId", new ParseUUIDPipe()) mockId: string): Promise<string> {
        return await this.mockDriveService.updateMockDriveById(mockId, payload);
    }



    @Delete(":mockId")
    async deletemockDriveById(@Param("mockId", new ParseUUIDPipe()) mockId: string): Promise<string> {
        return await this.mockDriveService.deleteMockDriveById(mockId);
    }




    @Patch(":mockId/publish")
    async publishMockDriveById(@Param("mockId", new ParseUUIDPipe()) mockId: string): Promise<string> {
        return await this.mockDriveService.publishMockDriveById(mockId);
    }
}
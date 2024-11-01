import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MockDriveEntity } from "./entities/mock.drive.entity";
import { Repository } from "typeorm";
import { CreateMockDriveDTO } from "./dto/create.mock.drive.dto";

@Injectable()
export class MockDriveService {
    constructor(
        @InjectRepository(MockDriveEntity)
        private readonly mockDriveRepository: Repository<MockDriveEntity>,
    ) { }




    async getMockDrives(): Promise<MockDriveEntity[]> {
        return await this.mockDriveRepository.find({ where: { is_active: true } });
    }




    async getMockDriveById(mockId: string): Promise<MockDriveEntity | null> {
        const drive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!drive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        return drive;
    }




    async createMockDrive(userId: string, payload: CreateMockDriveDTO): Promise<string> {
        const newDrive = this.mockDriveRepository.create({ ...payload, created_by: userId });
        const savedDrive = await this.mockDriveRepository.save(newDrive);
        return `mock drive created successfully - (${savedDrive.name})`;
    }




    async updateMockDriveById(mockId: string, payload: CreateMockDriveDTO): Promise<string> {
        const drive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!drive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        await this.mockDriveRepository.update(drive.id, payload);
        return `mock drive updated successfully`;
    }




    async deleteMockDriveById(mockId: string): Promise<string> {
        const drive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!drive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        this.mockDriveRepository.delete(drive.id);
        return `mock drive deleted successfully - (${drive.name})`;
    }




    async publishMockDriveById(mockId: string): Promise<string> {
        const drive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!drive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        if (drive.is_active) throw new HttpException("mock drive already published", HttpStatus.BAD_REQUEST);
        this.mockDriveRepository.update(drive.id, { is_active: true });
        return `mock drive published successfully - (${drive.name})`;
    }
}
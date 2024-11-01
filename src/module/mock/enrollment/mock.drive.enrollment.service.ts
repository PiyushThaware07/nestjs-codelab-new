import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MockDriveEnrollmentEntity } from "./entities/mock.drive.enrollment.entity";
import { Repository } from "typeorm";
import { MockDriveEntity } from "../mock/entities/mock.drive.entity";

@Injectable()
export class MockDriveEnrollmentService {
    constructor(
        @InjectRepository(MockDriveEnrollmentEntity)
        private readonly mockDriveEnrollmentRepository: Repository<MockDriveEnrollmentEntity>,
        @InjectRepository(MockDriveEntity)
        private readonly mockDriveRepository: Repository<MockDriveEntity>,
    ) { }


    async createEnrollmentByMockId(userId: string, mockId: string): Promise<string> {
        const existingDrive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!existingDrive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        const existingEnrollment = await this.mockDriveEnrollmentRepository.findOne({ where: { mock_drive_id: existingDrive.id, user_id: userId } });
        if (existingEnrollment) throw new HttpException(`enrollment for the mock drive (${existingDrive.name}) already exists`, HttpStatus.CONFLICT);

        const currentDate = new Date();
        const newEnrollment = this.mockDriveEnrollmentRepository.create({
            mock_drive_id: existingDrive.id,
            user_id: userId,
            enrollment_date: new Date().toString(),
            expiration_date: new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            total_price: existingDrive.total_price,
            coupon_code: "NOT SET",
            discount: "NOT SET",
            applied_price: "NOT SET",
        })
        const savedEnrollment = await this.mockDriveEnrollmentRepository.save(newEnrollment);
        return `mock drive enrollment created successfully - (${existingDrive.name})`;
    }


    async getUserEnrollmentByMockId(userId: string, mockId: string): Promise<MockDriveEnrollmentEntity | null> {
        const existingDrive = await this.mockDriveRepository.findOne({ where: { id: mockId } });
        if (!existingDrive) throw new HttpException("mock drive not exists", HttpStatus.NOT_FOUND);
        const existingEnrollment = await this.mockDriveEnrollmentRepository.findOne({ where: { user_id: userId, mock_drive_id: existingDrive.id } });
        if (!existingEnrollment) throw new HttpException("mock drive enrollment not exists", HttpStatus.NOT_FOUND);
        const currentDate = new Date();
        const expirationDate = new Date(existingEnrollment.expiration_date);
        await this.mockDriveEnrollmentRepository.update(existingEnrollment.id, { is_active: false });
        if (expirationDate < currentDate) throw new HttpException("Mock drive enrollment has expired", HttpStatus.FORBIDDEN);
        return existingEnrollment;
    }


    async getUserEnrollments(userId: string): Promise<MockDriveEnrollmentEntity[]> {
        const existingEnrollment = await this.mockDriveEnrollmentRepository.find({ where: { user_id: userId } });
        const currentDate = new Date();
        const updateEnrollments = await Promise.all(
            existingEnrollment.map(async (enrollment) => {
                const expirationDate = new Date(enrollment.expiration_date);
                if (expirationDate < currentDate && enrollment.is_active) {
                    enrollment.is_active = false;
                    await this.mockDriveEnrollmentRepository.save(enrollment);
                }
                return enrollment;
            })
        )
        return updateEnrollments;
    }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockDriveEntity } from './entities/mock.drive.entity';
import { MockDriveController } from './mock.drive.controller';
import { MockDriveService } from './mock.drive.service';


@Module({
    imports: [TypeOrmModule.forFeature([MockDriveEntity])],
    controllers: [MockDriveController],
    providers: [MockDriveService],
    exports: [MockDriveService]
})


export class MockDriveModule {
    constructor() {
        console.log("mock drive module");
    }
}

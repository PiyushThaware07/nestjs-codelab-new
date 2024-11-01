import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MockDriveEntity } from "../../mock/entities/mock.drive.entity";

@Entity("mock_drive_enrollment")
export class MockDriveEnrollmentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;




    @Column({ type: "uuid" })
    mock_drive_id: string;
    @ManyToOne(() => MockDriveEntity, mockDrive => mockDrive.enrollments,{onDelete:"CASCADE"})
    @JoinColumn({ name: "mock_drive_id" })
    mockDrive: MockDriveEntity;




    @Column({ type: "uuid", nullable: true })
    user_id: string;
    @ManyToOne(() => UserEntity, user => user.mockDriveEnrollments,{onDelete:"SET NULL"})
    @JoinColumn({ name: "user_id" })
    user: UserEntity;



    @Column({ type: "timestamp" })
    enrollment_date: string;




    @Column({ type: "timestamp" })
    expiration_date: string;



    @Column()
    total_price: string;



    @Column()
    coupon_code: string;




    @Column()
    discount: string;




    @Column()
    applied_price: string;




    @Column({ type: "uuid", nullable: true })
    created_by: string;
    @ManyToOne(() => UserEntity, user => user.mockDriveEnrollments)
    @JoinColumn({ name: "created_by" })



    @Column({ type: "boolean", default: true })
    is_active: boolean;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}

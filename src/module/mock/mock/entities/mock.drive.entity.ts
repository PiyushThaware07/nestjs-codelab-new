import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MockDriveEnrollmentEntity } from "../../enrollment/entities/mock.drive.enrollment.entity";
import { QuizEntity } from "src/module/quiz/quiz/entities/quiz.entity";


export enum MockDriveCategory {
    COMPANY_WISE = 'company',
    LANGUAGE_WISE = 'language',
    PRACTICE_WISE = 'practice',
}



@Entity("mock_drive")
export class MockDriveEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column({ type: "text" })
    name: string;


    @Column({ type: "text" })
    description: string;


    @Column({ type: 'enum', enum: MockDriveCategory })
    category: MockDriveCategory;


    @Column({ default: false })
    is_active: boolean;


    @Column()
    logo: string;


    @Column("text", { array: true })
    tags: string[];



    @Column({ type: 'jsonb' })
    details: Record<string, any>;


    @Column()
    thumbnail: string;



    @Column()
    total_price: string;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;



    @Column({ type: "uuid" })
    created_by: string;
    @ManyToOne(() => UserEntity, user => user.mockDrives, { onDelete: "CASCADE" })
    @JoinColumn({ name: "created_by" })
    user: UserEntity;



    @OneToMany(() => MockDriveEnrollmentEntity, mockDriveEnrollment => mockDriveEnrollment.mockDrive, { cascade: true })
    enrollments: MockDriveEnrollmentEntity[];


    @OneToOne(() => QuizEntity, quiz => quiz.mock_drive, { cascade: true })
    quiz: QuizEntity;
}
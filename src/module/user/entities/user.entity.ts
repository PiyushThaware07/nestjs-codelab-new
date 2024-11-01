import { MockDriveEnrollmentEntity } from "src/module/mock/enrollment/entities/mock.drive.enrollment.entity";
import { MockDriveEntity } from "src/module/mock/mock/entities/mock.drive.entity";
import { QuizCategoryEntity } from "src/module/quiz/category/entities/quiz.category.entity";
import { QuizEntity } from "src/module/quiz/quiz/entities/quiz.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";


@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column()
    first_name: string;



    @Column()
    last_name: string;



    @Column({ unique: true })
    email: string;



    @Column({ nullable: true })
    password: string;



    @Column({ nullable: true })
    phone_number: string;



    @Column({ nullable: true })
    image_url: string;



    @Column({ nullable: true })
    gender: string;


    @Column({ nullable: true })
    provider_id: string;


    @Column({ nullable: true, default: "local" })
    provider_type: string;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;



    @Column({ type: "uuid", nullable: true })
    created_by: string;



    @OneToMany(() => MockDriveEntity, mockDrive => mockDrive.user,{cascade:true})
    mockDrives: MockDriveEntity[];


    @OneToMany(() => MockDriveEnrollmentEntity, mockDriveEnrollment => mockDriveEnrollment.user,{cascade:true})
    mockDriveEnrollments: MockDriveEnrollmentEntity[];


    @OneToMany(() => QuizCategoryEntity, quizCategory => quizCategory.user, { cascade: true })
    quiz_categories: QuizCategoryEntity[];


    @OneToMany(() => QuizEntity, quiz => quiz.user, { cascade: true })
    quizs: QuizEntity[];
}
import { MockDriveEntity } from "src/module/mock/mock/entities/mock.drive.entity";
import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizQuestionEntity } from "../../quiz_question/entities/quiz.question.entity";

@Entity("quiz")
export class QuizEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    mock_drive_id: string;
    @OneToOne(()=>MockDriveEntity,mockDrive=>mockDrive.quiz,{onDelete:"CASCADE"})
    @JoinColumn({name:"mock_drive_id"})
    mock_drive: MockDriveEntity;



    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "varchar", length: 100 })
    category: string;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @Column({ type: "int" })
    total_questions: number;

    @Column({ type: "int" })
    total_durations: number;

    @Column({ type: "int" })
    total_attempts: number;

    @Column({ type: "boolean", default: false })
    negative_marking: boolean;

    @Column({ type: "jsonb", nullable: true })
    guidelines: Record<string, any>;

    @Column({ type: "float" })
    total_marks: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;


    @Column({ type: "uuid" })
    created_by: string;
    @ManyToOne(()=>UserEntity,user => user.quizs,{onDelete:"SET NULL"})
    @JoinColumn({name:"created_by"})
    user: UserEntity;




    @OneToMany(()=>QuizQuestionEntity,quizQuestion=>quizQuestion.quiz,{cascade:true})
    quizQuestions: QuizQuestionEntity[];
}

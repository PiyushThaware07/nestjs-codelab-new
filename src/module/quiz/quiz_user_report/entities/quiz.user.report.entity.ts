import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quiz_user_report')
export class QuizUserReportEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "uuid" })
    quiz_id: string;

    @Column({ type: "uuid" })
    user_id: string;

    @Column()
    total_questions: number;

    @Column()
    attempted_questions: number;

    @Column()
    unanswered_questions: number;

    @Column()
    correct_answer: number;

    @Column()
    incorrect_answer: number;

    @Column()
    total_marks: number;

    @Column()
    obtained_marks: number;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    percentage: number;

    @Column({ type: "timestamp" })
    enrolled_date: Date;

    @Column({ type: "timestamp", nullable: true })
    completion_date: Date;

    @Column()
    attempt_number: number;
}

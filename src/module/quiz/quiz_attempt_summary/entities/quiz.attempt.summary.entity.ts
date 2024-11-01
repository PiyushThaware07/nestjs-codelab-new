import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quiz_attempt_summary')
export class QuizAttemptSummaryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type:"uuid"})
    quiz_id: string;

    @Column({type:"uuid"})
    user_id: string;

    @Column({type:"uuid"})
    question_id: string;

    @Column({ type: "text" })
    question_title: string;

    @Column()
    question_topic: string;

    @Column({ type: "text" })
    user_answer: string;

    @Column({ type: "text" })
    correct_answer: string;

    @Column()
    time_taken_to_answer: number;

    @Column({ default: false })
    is_answer_correct: boolean;

    @Column()
    attempt_number: number;
}

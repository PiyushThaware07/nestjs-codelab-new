import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizEntity } from "../../quiz/entities/quiz.entity";
import { QuizQuestionBankEntity } from "../../question_bank/entities/quiz.question.bank.entity";

@Entity("quiz_question")
export class QuizQuestionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;



    @Column({ type: "uuid" })
    quiz_id: string;
    @ManyToOne(() => QuizEntity, quiz => quiz.quizQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "quiz_id" })
    quiz: QuizEntity;




    @Column({ type: "uuid" })
    question_id: string;
    @ManyToOne(() => QuizQuestionBankEntity, questionBank => questionBank.quizQuestions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "question_id" })
    questionBank: QuizQuestionBankEntity;



    @Column()
    attempt_number: number;



    @Column({ type: "text" })
    title: string;

    @Column()
    sub_title: string;


    @Column()
    topic: string;


    @Column()
    sub_topic: string;



    @Column()
    difficulty_level: string;


    @Column({ type: "text" })
    code_snippet: string;



    @Column({ type: "text" })
    option_1: string;


    @Column({ type: "text" })
    option_2: string;


    @Column({ type: "text" })
    option_3: string;


    @Column({ type: "text" })
    option_4: string;


    @Column({ type: "text" })
    correct_answer: string;


    @Column({ type: "text" })
    correct_answer_description: string;


    @Column({ type: "text" })
    question_image: string;


    @Column({ type: "boolean", default: true })
    is_active: boolean;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;



    @Column({ type: "uuid" })
    created_by: string;
    @ManyToOne(() => UserEntity, user => user.quizQuestions, { onDelete: "SET NULL" })
    @JoinColumn({ name: "created_by" })
    user: UserEntity;
}
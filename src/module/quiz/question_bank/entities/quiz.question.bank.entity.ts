import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { QuizQuestionEntity } from "../../quiz_question/entities/quiz.question.entity";

@Entity("quiz_question_bank")
export class QuizQuestionBankEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


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
    @ManyToOne(() => UserEntity, user => user.questionBank, { onDelete: "CASCADE" })
    @JoinColumn({ name: "created_by" })
    user: UserEntity;



    @OneToMany(() => QuizQuestionEntity, quizQuestion => quizQuestion.questionBank)
    quizQuestions: QuizQuestionEntity[];
}
import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("quiz_category")
export class QuizCategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column()
    name: string;



    @Column({ type: "text" })
    description: string;



    @Column({ type: "boolean", default:false })
    is_active: boolean;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;



    @Column({ type: "uuid" })
    created_by: string;
    @ManyToOne(() => UserEntity, user => user.quizCategories, { onDelete: "SET NULL" })
    @JoinColumn({ name: "created_by" })
    user: UserEntity;
}
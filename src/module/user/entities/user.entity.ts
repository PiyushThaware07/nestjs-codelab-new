import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@ObjectType()
@Entity("user")
export class UserEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Field()
    @Column()
    first_name: string;



    @Field()
    @Column()
    last_name: string;



    @Field()
    @Column({ unique: true })
    email: string;



    @Field({ nullable: true })
    @Column({ nullable: true })
    password: string;



    @Field({ nullable: true })
    @Column({ nullable: true })
    phone_number: string;



    @Field({ nullable: true })
    @Column({ nullable: true })
    image_url: string;



    @Field({ nullable: true })
    @Column({ nullable: true })
    gender: string;


    @Field({ nullable: true })
    @Column({ nullable: true })
    provider_id: string;


    @Field({ nullable: true })
    @Column({ nullable: true, default: "local" })
    provider_type: string;


    @Field()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;


    @Field()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;


    @Field({ nullable: true })
    @Column({ type: "uuid", nullable: true })
    created_by: string;
}
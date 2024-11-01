import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('mock_drive_result')
export class MockDriveResultEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;



    @Column({ type: "uuid" })
    mock_drive_id: string;


    @Column({ type: "uuid" })
    user_id: string;



    @Column({ type: "timestamp" })
    enrollment_date: Date;


    @Column({ type: "timestamp", nullable: true })
    online_test_date: Date;


    @Column({ type: "timestamp", nullable: true })
    coding_round_date: Date;


    @Column({ type: "timestamp", nullable: true })
    mock_interview_date: Date;


    @Column({ type: "varchar", length: 50 })
    online_test_result_status: string;


    @Column({ type: "varchar", length: 50 })
    coding_round_result_status: string;



    @Column({ type: "varchar", length: 50 })
    mock_interview_result_status: string;



    @Column({ type: "varchar", length: 50 })
    final_result_status: string;



    @Column({ type: "json", nullable: true })
    feedback: Record<string, any>;



    @Column({ type: "decimal", precision: 3, scale: 2, nullable: true })
    candidate_performance_rating: number;



    @Column({ default: true })
    is_active: boolean;



    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;



    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;



    @Column({ type: "uuid", nullable: true })
    created_by: string;
}

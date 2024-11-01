import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateQuizAttemptSummaryDTO {
    @IsString()
    user_answer: string;


    @IsString()
    time_taken_to_answer: number;


    @IsUUID()
    question_id: any;
}
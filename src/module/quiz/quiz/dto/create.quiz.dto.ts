import { IsBoolean, IsInt, IsString, IsNumber, IsJSON } from "class-validator";

export class CreateQuizDTO {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsBoolean()
    is_active: boolean;

    @IsInt()
    total_question: number;

    @IsInt()
    total_durations: number;

    @IsInt()
    total_attempts: number;

    @IsBoolean()
    negative_marking: boolean;

    @IsJSON()
    guidelines?: Record<string, any>;

    @IsNumber()
    total_marks: number;
}

import { IsBoolean, IsString } from "class-validator";

export class CreateQuizQuestionBankDTO {
    @IsString()
    title: string;

    @IsString()
    sub_title: string;

    @IsString()
    topic: string;

    @IsString()
    sub_topic: string;

    @IsString()
    difficulty_level: string;

    @IsString()
    code_snippet: string;

    @IsString()
    option_1: string;

    @IsString()
    option_2: string;

    @IsString()
    option_3: string;

    @IsString()
    option_4: string;

    @IsString()
    correct_answer: string;

    @IsString()
    correct_answer_description: string;

    @IsString()
    question_image: string;

    @IsBoolean()
    is_active: boolean;
}

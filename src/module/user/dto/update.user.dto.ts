import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsOptional } from "class-validator";


@InputType()
export class UpdateUserDTO {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    first_name: string;


    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    last_name: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    phone_number?: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    gender?: string;
}
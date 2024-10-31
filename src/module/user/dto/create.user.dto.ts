import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty } from "class-validator";



@InputType()
export class CreateUserDTO {
    @Field()
    @IsString()
    @IsNotEmpty()
    first_name: string;


    @Field()
    @IsString()
    @IsNotEmpty()
    last_name: string;


    @Field()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;



    @Field()
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    phone_number?: string;


    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    gender?: string;
}
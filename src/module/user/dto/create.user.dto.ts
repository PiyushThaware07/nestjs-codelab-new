import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty } from "class-validator";



export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    first_name: string;


    @IsString()
    @IsNotEmpty()
    last_name: string;


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;



    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;


    @IsOptional()
    @IsString()
    phone_number?: string;


    @IsOptional()
    @IsString()
    gender?: string;
}
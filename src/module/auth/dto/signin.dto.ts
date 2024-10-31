import { IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";


export class SigninDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;



    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}
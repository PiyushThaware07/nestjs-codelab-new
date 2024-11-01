import { IsString, IsOptional } from "class-validator";


export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    first_name: string;


    @IsString()
    @IsOptional()
    last_name: string;


    @IsOptional()
    @IsString()
    phone_number?: string;


    @IsOptional()
    @IsString()
    gender?: string;
}
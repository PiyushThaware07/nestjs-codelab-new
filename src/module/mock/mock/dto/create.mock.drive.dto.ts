import { IsArray, IsBoolean, IsObject, IsString } from "class-validator";
import { MockDriveCategory } from "../entities/mock.drive.entity";



export class CreateMockDriveDTO {
    @IsString()
    name: string;


    @IsString()
    description: string;


    @IsString()
    category: MockDriveCategory;


    @IsBoolean()
    is_active: boolean;


    @IsString()
    logo: string;


    @IsArray()
    @IsString({ each: true })
    tags: Array<string>;


    @IsObject()
    details: Record<string, any>;


    @IsString()
    thumbnail: string;



    @IsString()
    total_price: string;

}
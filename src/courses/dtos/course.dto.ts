import { IsEnum, IsOptional, IsString } from "class-validator"

 
 export class CourseDto{

    @IsString()
    title: string

    @IsString()
    description: string
    
    @IsOptional()
    @IsString()
    status: string

    @IsString()
    author: string
 }
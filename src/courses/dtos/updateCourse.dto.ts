import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsString } from "class-validator"
import { CourseDto } from "./course.dto"

 
 export class updateCourse extends PartialType(CourseDto){

    @IsString()
    title: string

    @IsString()
    description: string
    
    @IsString()
    status: string

    @IsString()
    author: string
 }
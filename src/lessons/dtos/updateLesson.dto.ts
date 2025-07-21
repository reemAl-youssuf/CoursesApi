import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { LessonDto } from "./lesson.dto";

export class UpdateLessonDto extends PartialType(LessonDto){
    
    @IsString()
    title: string

    @IsString()
    content: string
    
    @IsString()
    courseId: string

    @IsNumber()
    sequence: number
}
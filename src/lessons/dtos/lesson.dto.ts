import { IsNumber, IsString } from "class-validator";

export class LessonDto{
    
    @IsString()
    title: string

    @IsString()
    content: string

    @IsString()
    courseId: string
    
    @IsNumber()
    sequence: number

}
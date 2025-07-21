import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CourseStatus } from "../Enum/courseStatus.enum";

@Schema({timestamps:true})
export class Course extends Document{
    @Prop({required:true})
    title: string

    @Prop()
    description: string

    @Prop()
    lessons: string

    @Prop({enum:CourseStatus , default:'draft'})
    status: CourseStatus

    @Prop()
    author: string
}

export const CourseSchema = SchemaFactory.createForClass(Course)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, Document } from "mongoose";

@Schema({timestamps:true})
export class Lesson extends Document{
    @Prop({required:true})
    title: string

    @Prop({required:true})
    content: string

    @Prop({required:true ,type: SchemaTypes.ObjectId, ref:'Course'})
    courseId: Types.ObjectId

    @Prop({required:true, unique:true})
    sequence: number
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, Document } from "mongoose";

@Schema({timestamps:true})
export class Enrollment extends Document{
    @Prop({required:true ,type: SchemaTypes.ObjectId, ref:'User'})
    userId:Types.ObjectId

    @Prop({required:true ,type: SchemaTypes.ObjectId, ref: 'Course'})
    courseId: Types.ObjectId

    @Prop()
    status: string

}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment)
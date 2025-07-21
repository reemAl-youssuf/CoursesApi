import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes,Types } from "mongoose";


@Schema({timestamps:true , versionKey:false})
export class User extends Document{

    @Prop({required:true})
    name: string

    @Prop({required:true, unique:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop({required:false, type: SchemaTypes.ObjectId, ref:'Role'})
    roleId: Types.ObjectId

}       

export const UserSchema = SchemaFactory.createForClass(User)



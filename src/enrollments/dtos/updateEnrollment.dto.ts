import { PartialType } from "@nestjs/mapped-types"
import { IsString } from "class-validator"
import { Types } from "mongoose"
import { EnrollmentDto } from "./enrollment.dto"

 
 export class UpdateEnrollmentDto extends PartialType(EnrollmentDto){

   @IsString()
   userId:Types.ObjectId  

   @IsString()
   courseId: Types.ObjectId

   @IsString()
   status: string

 }
import { IsString } from "class-validator"
import { Types } from "mongoose"

 
 export class EnrollmentDto{

   @IsString()
   userId:Types.ObjectId  

   @IsString()
   courseId: Types.ObjectId

   @IsString()
   status: string

 }
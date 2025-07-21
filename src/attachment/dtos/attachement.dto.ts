
import { IsIn, IsString } from "class-validator"
 
 export class AttachmentDto{

    @IsString()
    @IsIn(['course', 'lesson'])
     entityType:string  

    @IsString()
     entityId: string

    @IsString()
     fileName: string
   
    @IsString()
     filePath: string
   
    @IsString()
     fileType: string

     @IsString()
     size: number
 }
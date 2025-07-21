import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Attachment extends Document{

  @Prop()
  entityType: string
  
  @Prop()
  originalName: string

  @Prop()
  entityId: string

  @Prop()
  fileName: string; 

  @Prop()
  size: number;

  @Prop()
  filePath: string; 

  @Prop()
  fileType: string; 

  @Prop()
  uploadedAt: Date;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment)
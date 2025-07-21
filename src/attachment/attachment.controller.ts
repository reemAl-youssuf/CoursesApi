import { Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post(':entityType/:entityId')
  @UseInterceptors(FilesInterceptor('files',20, multerConfig))
  async UploadFiles(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
    @UploadedFiles() files: Express.Multer.File[]
    )
  {
    return this.attachmentService.UploadAttachment(files, entityType, entityId)
  }


  @Get(':entityType/:entityId')
  async getAttachments(
    @Param('entityType') entityType:string,
    @Param('entityId') entityId: string
  ){
    return this.attachmentService.getAttachments(entityType, entityId)
  }
}

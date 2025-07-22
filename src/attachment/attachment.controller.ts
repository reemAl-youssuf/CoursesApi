import { Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { permissions } from 'src/decorators/permissions.decorator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enums';

@UseGuards(AuthenticationGuard, AuthorizationGuard)

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @permissions([
  {
    resource:Resource.attachments,
    actions:[Action.create]
  }
  ])
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

  @permissions([
  {
    resource:Resource.attachments,
    actions:[Action.read]
  }
  ])
  @Get(':entityType/:entityId')
  async getAttachments(
    @Param('entityType') entityType:string,
    @Param('entityId') entityId: string
  ){
    return this.attachmentService.getAttachments(entityType, entityId)
  }
}

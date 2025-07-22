import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MongooseModule } from '@nestjs/mongoose';
import { Attachment, AttachmentSchema } from './schemas/attachment.schema';
import { multerConfig } from './multer.config';
import { CoursesModule } from 'src/courses/courses.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => multerConfig
    }),

    MongooseModule.forFeature([
      {
        name:Attachment.name,
        schema: AttachmentSchema
      }
    ]),
    CoursesModule,
    LessonsModule,
    AuthModule
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}

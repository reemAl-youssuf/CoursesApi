import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Course } from 'src/courses/schemas/course.schema';
import { Lesson } from 'src/lessons/schemas/lesson.schema';
import { Attachment } from './schemas/attachment.schema';

@Injectable()
export class AttachmentService {
    constructor(
        @InjectModel(Attachment.name) private AttachmentModel:Model<Attachment>,
        @InjectModel(Course.name) private CourseModel:Model<Course>,
        @InjectModel(Lesson.name) private LessonModel:Model<Lesson>
    ){}

    async UploadAttachment(files: Express.Multer.File[], entityType: string, entityId:string){
    
        if (!isValidObjectId(entityId)) {
              throw new BadRequestException('Invalid entityId format');
}
        if(entityType === 'courses'){
            const course = await this.CourseModel.findOne({_id: entityId})
            if(!course){
                throw new NotFoundException('course not found')
            }
        }
        else if(entityType === 'lessons'){
            const lesson = await this.LessonModel.findOne({_id: entityId})
            if(!lesson){
                throw new NotFoundException('lesson not found')
            }
        }
        else{
            throw new NotFoundException('Invlaid entityType')
        }

      const attachments = await Promise.all(
        files.map((file) => 
        this.AttachmentModel.create({ 
            originalName: file.originalname,
            fileName: file.filename,
            fileType: file.mimetype,
            size: file.size,
            filePath: file.path,
            entityType,
            entityId,
      })
    )
  );

    return attachments;
    }

    async getAttachments(entityType: string, entityId:string){
        const files = await this.AttachmentModel.find({entityType, entityId})

        if(!files || files.length === 0){
            throw new NotFoundException(
                `No attachments found for ${entityType} with id ${entityId}`
            )
        }
        return files
    }
}

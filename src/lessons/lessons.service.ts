import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './schemas/lesson.schema';
import { isValidObjectId, Model } from 'mongoose';
import { LessonDto } from './dtos/lesson.dto';
import { UpdateLessonDto } from './dtos/updateLesson.dto';

@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(Lesson.name) private LessonModel:Model<Lesson>
    ){}

     async CreateLesson(lesson: LessonDto){
            const {title, content, courseId, sequence} = lesson
            await this.LessonModel.create({
                title,
                content,
                courseId,
                sequence
            })
            return {message: 'lesson created successfully'}
        }
    
        async GetAllLessons(){
           const lessons = await this.LessonModel.find()
           if(!lessons){
            throw new NotFoundException()
           }
           return lessons
        }
    
        async GetLesson(_id: string){
           const lesson = await this.LessonModel.findById({_id})
           if (!isValidObjectId(_id)) {
                throw new BadRequestException('Invalid lesson ID format');
        }
           if(!lesson){
            throw new NotFoundException(`lesson with ID ${_id} not found`)
           }
           return lesson
        }
    
        async UpdateLesson(_id: string, lesson: UpdateLessonDto){
             const {title, content, courseId, sequence} = lesson
    
             if (!isValidObjectId(_id)) {
                throw new BadRequestException('Invalid course ID format');
        }
             const updateLesson = await this.LessonModel.findByIdAndUpdate(
                _id ,
                {title, content, courseId, sequence},
                {new: true}
            )
             if(!updateLesson){
                throw new NotFoundException(`Lesson with ID ${_id} not found`)
             }
             return {updateLesson}
    
        }
    
        async DeleteLesson(_id: string){
            
            if (!isValidObjectId(_id)) {
                throw new BadRequestException('Invalid course ID format');
        }
    
            await this.LessonModel.findOneAndDelete({_id})
            return {delete: true ,message : 'Lesson deleted successfully'}
        }

        async getLessonsByCourse(courseId: string) {
            const lessons = await this.LessonModel.find({ courseId });
            if (!lessons || lessons.length === 0) {
                throw new NotFoundException('No lessons found for this course');
            }
            return lessons;
  }

}

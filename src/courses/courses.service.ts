import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CourseDto } from './dtos/course.dto';
import { updateCourse } from './dtos/updateCourse.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(Course.name) private CourseModel:Model<Course>
    ){}

    async CreateCourse(course: CourseDto){
        const {title, description, status, author} = course
        await this.CourseModel.create({
            title,
            description,
            author,
            status
        })
        return {message: 'Course created successfully'}
    }

    async GetAllCourses(){
       const courses = await this.CourseModel.find()
       if(!courses){
        throw new NotFoundException()
       }
       return courses
    }

    async GetCours(_id: string){
       const course = await this.CourseModel.findById({_id})
       if (!isValidObjectId(_id)) {
            throw new BadRequestException('Invalid course ID format');
    }
       if(!course){
        throw new NotFoundException(`Course with ID ${_id} not found`)
       }
       return course
    }

    async UpdateCourse(_id: string, course: updateCourse){
         const {title, description, status, author} = course

         if (!isValidObjectId(_id)) {
            throw new BadRequestException('Invalid course ID format');
    }
         const updateCourse = await this.CourseModel.findByIdAndUpdate(
            _id ,
            {title, description, status, author},
            {new: true}
        )
         if(!updateCourse){
            throw new NotFoundException(`Course with ID ${_id} not found`)
         }
         return {Course}

    }

    async DeleteCourse(_id: string){
        
        if (!isValidObjectId(_id)) {
            throw new BadRequestException('Invalid course ID format');
    }

        await this.CourseModel.findOneAndDelete({_id})
        return {delete: true ,message : 'Course deleted successfully'}
    }
}

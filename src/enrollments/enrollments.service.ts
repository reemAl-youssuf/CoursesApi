import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollment } from './schemas/enrollment.schema';
import { isValidObjectId, Model } from 'mongoose';
import { EnrollmentDto } from './dtos/enrollment.dto';
import { UpdateEnrollmentDto } from './dtos/updateEnrollment.dto';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectModel(Enrollment.name) private EnrollmentModel:Model<Enrollment>
    ){}

    async CreateEnrollment(enrollment: EnrollmentDto){
        const {userId, courseId, status} = enrollment
        const Enrollment = await this.EnrollmentModel.create({
            userId,
            courseId,
            status
        })
        return {Enrollment, message: 'Enrollment created successfully'}
    }

    async GatAllEnrollment(){
        const enrollment = await this.EnrollmentModel.find()
        if(!enrollment){
            throw new NotFoundException()
        }
        return enrollment
    }

    async GetEnrollment(_id: string){
        const enrollment = await this.EnrollmentModel.findById({_id})
        if(!enrollment){
            throw new NotFoundException()
        }
        return enrollment
    }

    async UpdateEnrollment(_id:string, updateEnrollment: UpdateEnrollmentDto){
        const {userId, courseId, status} = updateEnrollment
        if(!isValidObjectId(_id)){

        }
        const UpdateEnrollment = await this.EnrollmentModel.findByIdAndUpdate(
            _id,
            {userId, courseId, status},
            {new : true}
        )
        if(!UpdateEnrollment){
            throw new NotFoundException(`enrollment with ID ${_id} not found`)
        }
        return UpdateEnrollment
    }

    async DeleteEnrollment(_id: string) {
        await this.EnrollmentModel.findByIdAndDelete({_id})
        return {message: 'Delete successfuly'}
    }

    async getUserCourses(userId: string) {
        const enrollments = await this.EnrollmentModel
        .find({userId})
        .populate('courseId')
        return enrollments.map((e)=> e.courseId)

    }


}

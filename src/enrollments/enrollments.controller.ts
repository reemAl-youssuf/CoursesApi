import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentDto } from './dtos/enrollment.dto';
import { UpdateEnrollmentDto } from './dtos/updateEnrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  async creatEnrollment(@Body() enrollment:EnrollmentDto){
    return this.enrollmentsService.CreateEnrollment(enrollment)
  }

  @Get()
  async getAllEnrollment(){
    return this.enrollmentsService.GatAllEnrollment()
  }

  @Get(':id')
  async getEnrollment(@Param('id') id:string){
    return this.enrollmentsService.GetEnrollment(id)
  }

  @Patch(':id')
  async updateEnrollment(@Param('id') id: string ,@Body() enrollment: UpdateEnrollmentDto){
    return this.enrollmentsService.UpdateEnrollment(id, enrollment)
  }

  @Delete(':id')
  async deleteEnrollment(@Param('id') id: string){
    return this.enrollmentsService.DeleteEnrollment(id)
  }

  @Get(':userId/courses')
  getUserCourses(@Param('userId') userId: string) {
  return this.enrollmentsService.getUserCourses(userId);
}

}

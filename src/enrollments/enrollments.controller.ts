import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentDto } from './dtos/enrollment.dto';
import { UpdateEnrollmentDto } from './dtos/updateEnrollment.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { permissions } from 'src/decorators/permissions.decorator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enums';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}


  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.create]
  }])
  @Post()
  async creatEnrollment(@Body() enrollment:EnrollmentDto){
    return this.enrollmentsService.CreateEnrollment(enrollment)
  }

  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.read]
  }])
  @Get()
  async getAllEnrollment(){
    return this.enrollmentsService.GatAllEnrollment()
  }

  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.read]
  }])
  @Get(':id')
  async getEnrollment(@Param('id') id:string){
    return this.enrollmentsService.GetEnrollment(id)
  }

  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.update]
  }])
  @Patch(':id')
  async updateEnrollment(@Param('id') id: string ,@Body() enrollment: UpdateEnrollmentDto){
    return this.enrollmentsService.UpdateEnrollment(id, enrollment)
  }

  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.delete]
  }])
  @Delete(':id')
  async deleteEnrollment(@Param('id') id: string){
    return this.enrollmentsService.DeleteEnrollment(id)
  }

  @permissions([{
    resource:Resource.enrollments,
    actions: [Action.read]
  }])
  @Get(':userId/courses')
  getUserCourses(@Param('userId') userId: string) {
  return this.enrollmentsService.getUserCourses(userId);
}

}

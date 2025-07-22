import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dtos/course.dto';
import { updateCourse } from './dtos/updateCourse.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { permissions } from 'src/decorators/permissions.decorator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enums';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @permissions([
    {
      resource: Resource.courses,
      actions: [Action.create]
    }
  ])
  @Post()
  async creatCourse(@Body() course: CourseDto){
    return this.coursesService.CreateCourse(course)
  }

  @Get()
  async getAllCourses(){
    return this.coursesService.GetAllCourses()
  }

  @Get(':id')
  async getCourse(@Param('id') id: string){
    return this.coursesService.GetCours(id)
  }
  
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @permissions([
    {
      resource: Resource.courses,
      actions: [Action.update]
    }
  ])
  @Patch(':id')
  async updateCourse(@Param('id') id: string, @Body() updateCourse: updateCourse){
    return this.coursesService.UpdateCourse(id, updateCourse)
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @permissions([
    {
      resource: Resource.courses,
      actions: [Action.delete]
    }
  ])
  @Delete(':id')
  async deleteCourse(@Param('id') id: string){
    return this.coursesService.DeleteCourse(id)
  }
}

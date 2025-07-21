import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dtos/course.dto';
import { updateCourse } from './dtos/updateCourse.dto';


@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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
  
  @Patch(':id')
  async updateCourse(@Param('id') id: string, @Body() updateCourse: updateCourse){
    return this.coursesService.UpdateCourse(id, updateCourse)
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string){
    return this.coursesService.DeleteCourse(id)
  }
}

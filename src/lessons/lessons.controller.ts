import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonDto } from './dtos/lesson.dto';
import { UpdateLessonDto } from './dtos/updateLesson.dto';
import { permissions } from 'src/decorators/permissions.decorator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enums';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}


  
  @permissions([{
    resource:Resource.lessons,
    actions:[Action.create]
  }])
  @Post()
    async creatLesson(@Body() lesson: LessonDto){
      return this.lessonsService.CreateLesson(lesson)
    }
  
  @permissions([{
      resource:Resource.lessons,
      actions:[Action.read]
    }])

    @Get()
    async getAllLessons(){
      return this.lessonsService.GetAllLessons()
    }

    @permissions([{
      resource:Resource.lessons,
      actions:[Action.read]
    }])
    @Get(':id')
    async getLesson(@Param('id') id: string){
      return this.lessonsService.GetLesson(id)
    }

    @permissions([{
      resource:Resource.lessons,
      actions:[Action.update]
    }])
    @Patch(':id')
    async updateLesson(@Param('id') id: string, @Body() updateLesson: UpdateLessonDto){
      return this.lessonsService.UpdateLesson(id, updateLesson)
    }
  
    @permissions([{
      resource:Resource.lessons,
      actions:[Action.delete]
    }])

    @Delete(':id')
    async deleteLesson(@Param('id') id: string){
      return this.lessonsService.DeleteLesson(id)
    }

    @permissions([{
      resource:Resource.lessons,
      actions:[Action.read]
    }])
    @Get('course/:courseId')
    async getLessonsByCourse(@Param('courseId') courseId: string) {
      return this.lessonsService.getLessonsByCourse(courseId);
  }
}

import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema
      }
    ]),
    AuthModule
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports:[MongooseModule]
})
export class CoursesModule {}

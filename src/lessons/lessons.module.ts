import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: Lesson.name,
        schema: LessonSchema
      }
    ]),
    AuthModule
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports:[MongooseModule]
})
export class LessonsModule {}

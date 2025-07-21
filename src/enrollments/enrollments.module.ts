import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Enrollment, EnrollmentSchema } from './schemas/enrollment.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
     MongooseModule.forFeature([
      {
        name: Enrollment.name,
        schema: EnrollmentSchema
      }
    ]),
    AuthModule
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}

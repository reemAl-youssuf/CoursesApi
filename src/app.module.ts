import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { loggingMiddleware } from './middlewares/logging.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import  config  from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from './roles/roles.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentModule } from './attachment/attachment.module';



@Module({
  imports: [
        MulterModule.register(),
        ConfigModule.forRoot({
        isGlobal:true,
        cache:true,
        load:[config],
      }),

        JwtModule.registerAsync({
          imports:[ConfigModule],
          useFactory:async (config)=>({
            secret: config.get('jwt.secret')
          }),
          global:true,
          inject:[ConfigService]
        }),

        MongooseModule.forRootAsync({
          imports:[ConfigModule],
          useFactory: async (config)=>({
            uri: config.get('database.connectionString')
          }),
          inject:[ConfigService]
        }),
    AuthModule,
    RolesModule,
    CoursesModule,
    LessonsModule,
    EnrollmentsModule,
    AttachmentModule],
  providers:[Logger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggingMiddleware).forRoutes('*')
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-Filter/http-exception-Filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(Logger)
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

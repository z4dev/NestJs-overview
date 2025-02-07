import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // this line allows us to use the validation pipe globally , so we don't have to add it to every controller
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable cors to allow the Frontend side to make a request
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

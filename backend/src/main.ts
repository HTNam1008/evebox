// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000', // URL của Next.js frontend
    credentials: true,
  });
  
  await app.listen(3001);
}
bootstrap();

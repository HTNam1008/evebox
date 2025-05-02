import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Global configurations
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');

  app.use((req, res, next) => {
    console.log('Request URL:', req.url); // Kiểm tra middleware
    console.log('Middleware - Request exists?', !!req); // Kiểm tra middleware
    next();
  });
}
bootstrap();

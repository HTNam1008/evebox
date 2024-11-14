// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = YAML.load('../backend/src/swagger/openapi.yaml');

  // Set up Swagger
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // URL của Next.js frontend
    credentials: true,
  });
  
  await app.listen(3001);
}
bootstrap();

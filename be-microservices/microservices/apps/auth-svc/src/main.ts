import {
  INestApplication,
  INestMicroservice,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Tạo app HTTP
  const app: INestApplication = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Evebox API')
  .setDescription('The Evebox API description')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  // Kết nối microservice gRPC
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     url: '0.0.0.0:50051',
  //     package: protobufPackage,
  //     protoPath: join('node_modules/grpc-nest-proto/proto/auth.proto'),
  //   },
  // });

  // Cấu hình global cho cả HTTP và gRPC
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Bật CORS nếu cần
  app.enableCors();

  // Khởi động cả HTTP server và gRPC microservice
  // await app.startAllMicroservices();
  await app.listen(8001); // Port HTTP

  Logger.log(`HTTP server running on port 8001`);
  // Logger.log(`gRPC server running on port 50051`);
}

bootstrap();

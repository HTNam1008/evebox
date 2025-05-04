import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filter/http-Exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create HTTP app
  const app: INestApplication = await NestFactory.create(AppModule);
  
  const options = new DocumentBuilder()
  .setTitle('Evebox API')
  .setDescription('The Evebox API description')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.enableCors();

  // Connect Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'admin-service',
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9193').split(','),
        connectionTimeout: 10000,
        retry: {
          restartOnFailure: async (err) => {
            Logger.error(`Kafka connection error: ${err.message}`, 'KafkaConsumer');
            return true;
          },
          maxRetryTime: -1,
          retries: Infinity,
          initialRetryTime: 1000,
          factor: 2,
          multiplier: 1.5,
        },
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'admin-service-group',
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 8007, () => {
    Logger.log(`🚀 HTTP server listening on port ${process.env.PORT ?? 8007}`);
  });
}

bootstrap();

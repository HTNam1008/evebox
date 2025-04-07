import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-service-producer', 
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
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'notification-service-group',
        allowAutoTopicCreation: true,
        retry: {
          restartOnFailure: async (err) => {
            Logger.error(`Kafka consumer error: ${err.message}`, 'KafkaConsumer');
            return true;
          }, 
        }
      },
      subscribe: {
        fromBeginning: true, // Đọc message từ đầu nếu không có offset
      }
    },
  });

  await app.listen();
  Logger.log('Notification Service is listening... ');
}
bootstrap();
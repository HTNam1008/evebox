// src/infrastructure/messaging/kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { KafkaConsumer } from './kafka.consumer';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification-service-consumer',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'notification-group',
          },
        },
      },
    ]),
  ],
  providers: [KafkaConsumer],
  exports: [KafkaConsumer],
})
export class KafkaModule {}

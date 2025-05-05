import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID') ||  'auth-service-producer',
              brokers: configService.get<string>('KAFKA_BROKERS')?.split(',') || ['localhost:9193'],
              connectionTimeout: 10000,
                retry: {
                  initialRetryTime: 3000,
                  retries: 5,
                },
            },
            producer: {
              allowAutoTopicCreation: configService.get<boolean>('KAFKA_AUTO_TOPIC_CREATION') || true,
              retry: {
                retries: configService.get<number>('KAFKA_PRODUCER_RETRIES') || 3,
              },
            },
            consumer: {
              groupId: configService.get<string>(
                'KAFKA_CONSUMER_GROUP_ID',
                'admin-service-consumer',
              ),
            },
          },
        }),
        inject: [ConfigService], 
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
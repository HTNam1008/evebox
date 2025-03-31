import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'notification-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
    });
    this.consumer = kafka.consumer({ groupId: 'notification-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    // await this.subscribeToTopics();
    Logger.log('Kafka consumer connected.');
  }

  /* private async subscribeToTopics() {
    await this.consumer.subscribe({ topic: 'user_registered', fromBeginning: true });
    // Thêm các topic khác nếu cần
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        this.handleMessage(topic, message.value?.toString() || '');
      },
    });
  }

  private handleMessage(topic: string, message: string) {
    switch (topic) {
      case 'user_registered':
        // Chuyển message đến controller xử lý
        // (Sẽ triển khai ở bước 3)
      
        break;
      // Xử lý các topic khác
    }
  } */
}
import { Injectable } from '@nestjs/common';
import { UserChangeStatusDomainEvent } from '../user/user-change-status.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KafkaService } from 'src/infrastructure/adapters/kafka/kafka.service';

@Injectable()
@EventsHandler(UserChangeStatusDomainEvent)
export class UserChangeStatusHandler implements IEventHandler<UserChangeStatusDomainEvent> {

  constructor(private readonly kafkaService: KafkaService) {}
  async handle(event: UserChangeStatusDomainEvent): Promise<void> {
    const {user} = event;

    const userId =  user.id.value;
    const status = user.status;
    await this.kafkaService.emitUserChangeStatusEvent({
      userId: userId,
      status: status,
    })
  }
}
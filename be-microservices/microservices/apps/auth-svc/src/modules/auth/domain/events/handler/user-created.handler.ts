import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { KafkaService } from 'src/infrastructure/adapters/kafka/kafka.service';
import { UserCreatedDomainEvent } from '../user/user-created.domain-event';

@Injectable()
@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedHandler 
  implements IEventHandler<UserCreatedDomainEvent> {
  
  constructor(private readonly kafkaService: KafkaService) {}

  async handle(event: UserCreatedDomainEvent): Promise<void> {
    const { user_id, name, email, status, role_id} = event;

    await this.kafkaService.emitUserCreatedEvent({
        user_id: user_id,
        name: name,
        email: email,
        status: status.getValue().toString(),
        role_id: role_id,
    });
  }
}
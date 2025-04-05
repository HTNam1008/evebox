import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredDomainEvent } from '../user/user-registered.domain-event';
import { KafkaService } from 'src/infrastructure/adapters/kafka/kafka.service';

@EventsHandler(UserRegisteredDomainEvent)
export class SendWelcomeEmailHandler
  implements IEventHandler<UserRegisteredDomainEvent>
{
  constructor(private readonly kafkaService: KafkaService) {}

  async handle(event: UserRegisteredDomainEvent) {
    const user = event.user;
    const userData = {
      email: user.email.value,
    };
    this.kafkaService.emitUserRegisteredEvent(userData);
  }
}

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UserPasswordResetDomainEvent } from '../user/user-reset-password.domain-event';
import { KafkaService } from 'src/infrastructure/adapters/kafka/kafka.service';

@Injectable()
@EventsHandler(UserPasswordResetDomainEvent)
export class UserPasswordResetHandler 
  implements IEventHandler<UserPasswordResetDomainEvent> {
  
  constructor(private readonly kafkaService: KafkaService) {}

  async handle(event: UserPasswordResetDomainEvent): Promise<void> {
    const { user } = event;
    const userData = {
      email: user.email.value,
    }
    // Send password changed notification email
    await this.kafkaService.emitUserResetPasswordEvent(userData);
  }
}
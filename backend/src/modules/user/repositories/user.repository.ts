// user.repository.ts

import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.vo';
import { UserId } from '../domain/value-objects/user-id.vo';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Password } from '../domain/value-objects/password.vo';
import { Role } from '../domain/value-objects/role.vo';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async findByEmail(email: Email): Promise<User | null> {
    const userRecord = await this.prisma.users.findUnique({
      where: { email: email.value },
    });
    if (!userRecord) {
      return null;
    }
    return this.mapToDomain(userRecord);
  }

  async save(user: User): Promise<void> {
    const userOrmData = this.mapToOrmData(user);
    await this.prisma.users.upsert({
      where: { id: userOrmData.id },
      update: userOrmData,
      create: userOrmData,
    });
    
    // Phát hành các domain events
    const domainEvents = user.getDomainEvents();
    domainEvents.forEach(event => this.eventBus.publish(event));
    user.clearDomainEvents();
  }

  private mapToDomain(userRecord: any): User {
    const userId = UserId.create(userRecord.id);
    const email = Email.create(userRecord.email).unwrap();
    const password = Password.createHashed(userRecord.password);
    const role = Role.create(userRecord.role);

    return User.createExisting(userId, email, password, role);
  }

  private mapToOrmData(user: User): any {
    return {
      id: user.id.value,
      email: user.email.value,
      password: user.password.getHashedValue(),
      role: user.role.getValue(),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { IUserCreatedEvent } from '../domain/events/consumer/user/user-created.event';
import { AdminUser, Prisma, UserStatus } from '@prisma/client';
import { User } from '../domain/entities/user.entity';
import { UserId } from '../domain/value-objects/user-id.vo';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class AdminRepositoryImpl implements AdminRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}
  async createUser(event: IUserCreatedEvent): Promise<void> {
    await this.prisma.adminUser.create({
      data: {
        userId: event.user_id,
        name: event.name,
        email: event.email,
        status: event.status as UserStatus,
        role_id: event.role_id,
      },
    });
  }

  async getUsers(): Promise<AdminUser[]> {
    return this.prisma.adminUser.findMany({
      include: {
        role: {
          select: {
            role_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getUsersPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ users: AdminUser[]; total: number }> {
    const [total, users] = await Promise.all([
      this.prisma.adminUser.count(),
      this.prisma.adminUser.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { role: { select: { role_name: true } } },
        orderBy: { created_at: 'desc' },
      }),
    ]);

    return { users, total };
  }

  async updateUserStatus(userId: string, status: UserStatus): Promise<void> {
    const userData = await this.prisma.adminUser.findUnique({
      where: { userId },
      include: {
        role: true
      }
    });

    if (!userData) {
      throw new Error('User not found');
    }

    const user = this.mapToDomain(userData);
    
    await user.updateStatus(status);

    await this.prisma.adminUser.update({
      where: { userId },
      data: { status: status as UserStatus},
    });

    const domainEvents = user.getDomainEvents();
    for (const event of domainEvents) {
      await this.eventBus.publish(event);
    }
    user.clearDomainEvents();
  }

  private mapToDomain(
    userRecord: Prisma.AdminUserGetPayload<{
      include: {
        role: true;
      };
    }>,
  ): User {
    const userIdOrError = UserId.create(userRecord.userId);
    if (userIdOrError.isErr()) {
      throw new Error(userIdOrError.unwrapErr().message);
    }
    const userId = userIdOrError.unwrap();
    return User.createExisting(
      userId,
      userRecord.name,
      userRecord.email,
      userRecord.status,
      userRecord.role_id,
    ).unwrap();
  }
  
  // private async publishEvents(events: DomainEvent[]) {
  //   events.forEach((event) => this.eventBus.publish(event));
  // }
}

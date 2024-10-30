// user.repository.ts

import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.vo';
import { UserId } from '../domain/value-objects/user-id.vo';
import { UserOrmEntity } from 'src/infrastructure/database/orm/user.orm-entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from '../domain/value-objects/password.vo';
import { Role } from '../domain/value-objects/role.vo';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepository: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: Email): Promise<User | null> {
    const userOrmEntity = await this.ormRepository.findOne({
      where: { email: email.value },
    });
    if (!userOrmEntity) {
      return null;
    }
    return this.mapToDomain(userOrmEntity);
  }

  async save(user: User): Promise<void> {
    const userOrmEntity = this.mapToOrmEntity(user);
    await this.ormRepository.save(userOrmEntity);
  }

  private mapToDomain(userOrmEntity: UserOrmEntity): User {
    const userId = UserId.create(userOrmEntity.id);
    const email = Email.create(userOrmEntity.email).unwrap();
    const password = Password.createHashed(userOrmEntity.password);
    const role = Role.create(userOrmEntity.role);

    return User.createExisting(userId, email, password, role);
  }

  private mapToOrmEntity(user: User): UserOrmEntity {
    const userOrmEntity = new UserOrmEntity();
    userOrmEntity.id = user.id.value;
    userOrmEntity.email = user.email.value;
    userOrmEntity.password = user.password.getHashedValue();
    userOrmEntity.role = user.role.getValue();

    return userOrmEntity;
  }
}

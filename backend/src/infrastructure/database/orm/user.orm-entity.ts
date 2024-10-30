// user.orm-entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { UserRole } from '../../../modules/user/domain/enums/user-role.enum';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}

// src/modules/user/domain/value-objects/password.vo.ts

import { ValueObject } from "src/libs/ddd/value-object.base";
import { hash, compare } from 'bcryptjs';

interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static async create(plainPassword: string): Promise<Password> {
    // Validate password strength if necessary
    const hashedPassword = await hash(plainPassword, 10);
    return new Password({ value: hashedPassword });
  }

  public static createHashed(hashedPassword: string): Password {
    // Directly create Password object from hashed value
    return new Password({ value: hashedPassword });
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return await compare(plainPassword, this.props.value);
  }

  public getHashedValue(): string {
    return this.props.value;
  }
}

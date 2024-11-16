// src/modules/user/domain/value-objects/email.vo.ts

import { ValueObject } from '../../../../libs/ddd/value-object.base';
import { Result, Ok, Err } from 'oxide.ts';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Result<Email, Error> {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Err(new Error('Invalid email address'));
    }
    return Ok(new Email({ value: email }));
  }

  get value(): string {
    return this.props.value;
  }
}

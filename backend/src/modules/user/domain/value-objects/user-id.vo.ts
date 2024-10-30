// src/modules/user/domain/value-objects/user-id.vo.ts

import { Identifier } from '../../../../libs/ddd/identifier.base';
import { v4 as uuidv4 } from 'uuid';

export class UserId extends Identifier<string> {
  // Tạo ID mới
  public static generate(): UserId {
    return new UserId(uuidv4());
  }

  // Tạo ID từ giá trị đã có
  public static create(id: string): UserId {
    return new UserId(id);
  }
}

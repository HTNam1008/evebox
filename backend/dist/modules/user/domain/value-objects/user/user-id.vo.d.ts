import { Result } from 'oxide.ts';
import { Identifier } from '../../../../../libs/ddd/identifier.base';
export declare class UserId extends Identifier<string> {
    static generate(): UserId;
    static create(id: string): Result<UserId, Error>;
}

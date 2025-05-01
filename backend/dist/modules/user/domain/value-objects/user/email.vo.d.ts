import { ValueObject } from '../../../../../libs/ddd/value-object.base';
import { Result } from 'oxide.ts';
interface EmailProps {
    value: string;
}
export declare class Email extends ValueObject<EmailProps> {
    private constructor();
    static create(email: string): Result<Email, Error>;
    get value(): string;
}
export {};

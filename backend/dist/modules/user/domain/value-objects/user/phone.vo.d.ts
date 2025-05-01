import { ValueObject } from '../../../../../libs/ddd/value-object.base';
import { Result } from 'oxide.ts';
interface PhoneProps {
    value: string;
}
export declare class Phone extends ValueObject<PhoneProps> {
    private constructor();
    static create(phone: string): Result<Phone, Error>;
    get value(): string;
}
export {};

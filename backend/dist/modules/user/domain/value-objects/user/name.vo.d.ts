import { ValueObject } from '../../../../../libs/ddd/value-object.base';
import { Result } from 'oxide.ts';
interface NameProps {
    value: string;
}
export declare class Name extends ValueObject<NameProps> {
    private constructor();
    static create(name: string): Result<Name, Error>;
    get value(): string;
}
export {};

import { ValueObject } from "src/libs/ddd/value-object.base";
import { Result } from 'oxide.ts';
interface PasswordProps {
    value: string;
}
export declare class Password extends ValueObject<PasswordProps> {
    private constructor();
    static create(plainPassword: string): Promise<Result<Password, Error>>;
    static createHashed(hashedPassword: string): Result<Password, Error>;
    comparePassword(plainPassword: string): Promise<boolean>;
    getHashedValue(): string;
}
export {};

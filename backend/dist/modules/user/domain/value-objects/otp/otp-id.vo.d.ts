import { Identifier } from 'src/libs/ddd/identifier.base';
export declare class OTPId extends Identifier<string> {
    static generate(): OTPId;
}

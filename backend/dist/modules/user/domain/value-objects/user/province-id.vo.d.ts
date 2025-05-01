import { ValueObject } from "src/libs/ddd/value-object.base";
import { Result } from 'oxide.ts';
export declare class ProvinceId extends ValueObject<number> {
    private constructor();
    static create(id: number): Result<ProvinceId, Error>;
    static createList(ids?: number[]): Result<ProvinceId[], Error>;
    get value(): number;
}

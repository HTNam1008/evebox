export declare abstract class Identifier<T> {
    readonly value: T;
    constructor(value: T);
    equals(id?: Identifier<T>): boolean;
    toString(): string;
}

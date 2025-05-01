import { Identifier } from './identifier.base';
export declare abstract class Entity<ID extends Identifier<any>, Props> {
    readonly id: ID;
    protected props: Props;
    constructor(id: ID, props: Props);
    equals(entity?: Entity<ID, Props>): boolean;
}

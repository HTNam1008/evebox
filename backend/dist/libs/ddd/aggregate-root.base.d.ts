import { Entity } from './entity.base';
import { DomainEvent } from './domain-event.base';
import { Identifier } from './identifier.base';
export declare abstract class AggregateRoot<ID extends Identifier<any>, Props> extends Entity<ID, Props> {
    private domainEvents;
    protected addDomainEvent(event: DomainEvent): void;
    getDomainEvents(): DomainEvent[];
    clearDomainEvents(): void;
}

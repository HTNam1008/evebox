import { EventSearchRepository } from '../../repositories/event-search.repository';
import { Result } from 'oxide.ts';
import { EventSearchData } from '../../domain/entities/event.entity';
export declare class SearchService {
    private readonly eventSearchRepository;
    constructor(eventSearchRepository: EventSearchRepository);
    execute(title: string): Promise<Result<EventSearchData[], Error>>;
}

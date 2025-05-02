import { EventFrontDisplayRepository } from '../../repositories/event-frontdisplay.repository';
import { Result } from 'oxide.ts';
import { FrontDisplayData, EventFrontDisplay } from '../../domain/entities/event.entity';
export declare class FrontDisplayService {
    private readonly eventFrontDisplayRepository;
    constructor(eventFrontDisplayRepository: EventFrontDisplayRepository);
    execute(): Promise<Result<FrontDisplayData, Error>>;
    getRecommendedEvents(timeWindow: "week" | "month"): Promise<Result<EventFrontDisplay[], Error>>;
}

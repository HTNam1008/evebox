import { EventDetailRepository } from "../../repositories/event-detail.repository";
import { Result } from "oxide.ts";
import { EventData, EventFrontDisplay } from "../../domain/entities/event.entity";
export declare class EventDetailService {
    private readonly eventDetailRepository;
    constructor(eventDetailRepository: EventDetailRepository);
    execute(eventId: number): Promise<Result<EventData, Error>>;
    getRecommendedEventsInDetail(eventId: number, limit: string): Promise<Result<EventFrontDisplay[], Error>>;
    postClicks(eventId: number): Promise<Result<String, Error>>;
}

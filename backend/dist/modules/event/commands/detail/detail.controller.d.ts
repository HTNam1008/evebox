import { EventDetailService } from "./detail.service";
import { Response } from 'express';
export declare class EventDetailController {
    private readonly eventDetailService;
    constructor(eventDetailService: EventDetailService);
    getEventDetail(eventId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRecommendedEventsInDetail(eventId: string, limit: string, res: Response): Promise<Response<any, Record<string, any>>>;
    postClicks(eventId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

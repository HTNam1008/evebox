import { Response } from 'express';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './event.dto';
export declare class EventController {
    private readonly eventsService;
    constructor(eventsService: EventService);
    createEvent(createEventDto: CreateEventDto, files: Express.Multer.File[], res: Response): Promise<Response<any, Record<string, any>>>;
    updateEvent(id: string, updateEventDto: UpdateEventDto, files: Express.Multer.File[], res: Response): Promise<Response<any, Record<string, any>>>;
    deleteEvent(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

import { Result } from 'oxide.ts';
import { EventRepository } from '../../repositories/event.repository';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { ImagesService } from 'src/modules/images/commands/images/images.service';
import { EventData } from '../../domain/entities/event.entity';
import { LocationService } from 'src/modules/location/commands/location.service';
import { EventCategoriesRepository } from '../../repositories/event-categories.repository';
export declare class EventService {
    private readonly eventsRepository;
    private readonly imagesService;
    private readonly locationService;
    private readonly eventCategoriesRepository;
    constructor(eventsRepository: EventRepository, imagesService: ImagesService, locationService: LocationService, eventCategoriesRepository: EventCategoriesRepository);
    createEvent(createEventDto: CreateEventDto, files: Express.Multer.File[]): Promise<Result<EventData, Error>>;
    findAll(): Promise<Result<EventData[], Error>>;
    findOne(id: number): Promise<Result<EventData, Error>>;
    updateEvent(id: number, updateEventDto: UpdateEventDto, files: Express.Multer.File[]): Promise<Result<EventData, Error>>;
    deleteEvent(id: number): Promise<Result<void, Error>>;
}

import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { EventData } from '../domain/entities/event.entity';
import { CreateEventDto, UpdateEventDto } from '../commands/event/event.dto';
export declare class EventRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEventDto: CreateEventDto, imgLogoId: number | null, imgPosterId: number | null, locationId: number): Promise<EventData>;
    findAll(): Promise<EventData[]>;
    findOne(id: number): Promise<EventData | null>;
    update(id: number, updateEventDto: UpdateEventDto, imgLogoId?: number, imgPosterId?: number): Promise<EventData>;
    delete(id: number): Promise<void>;
}

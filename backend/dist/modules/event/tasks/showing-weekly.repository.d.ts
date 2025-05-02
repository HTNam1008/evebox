import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class ShowingWeeklyRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    private readonly eventWeeklyRepository;
    fetchShowingForEvent(eventId: number): Promise<any>;
    fetchShowingForEventNoShowing(eventId: number): Promise<any>;
    fetchSeatMapForShowing(showingId: string): Promise<void>;
    updateSection(data: any): Promise<void>;
    updateRow(data: any): Promise<void>;
    updateSeat(data: any, section: any, showingId: string): Promise<void>;
    fetchSeatMapForShowingTransaction(showingId: string): Promise<void>;
}

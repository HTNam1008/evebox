import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
export declare class UpdateWeeklyService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly logger;
    private readonly eventWeeklyRepository;
    private readonly frontDisplayWeeklyRepository;
    private readonly showingWeeklyRepository;
    handleMondayJob(): Promise<void>;
}

import { Result } from 'oxide.ts';
import { ShowingRepository } from '../../repositories/showing.repository';
import { ShowingData } from '../../domain/entities/showing.entity';
import { SeatMap } from '../../domain/entities/seatmap.entity';
export declare class ShowingService {
    private readonly showingRepository;
    constructor(showingRepository: ShowingRepository);
    execute(showingId: string): Promise<Result<ShowingData, Error>>;
    getSeatMap(showingId: string): Promise<Result<SeatMap, Error>>;
    getAllShowings(): Promise<Result<String[], Error>>;
}

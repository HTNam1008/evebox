import { Response } from 'express';
import { ShowingService } from './showing.service';
export declare class ShowingController {
    private readonly showingService;
    constructor(showingService: ShowingService);
    getShowing(showingId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getSeatMap(showingId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllShowings(res: Response): Promise<Response<any, Record<string, any>>>;
}

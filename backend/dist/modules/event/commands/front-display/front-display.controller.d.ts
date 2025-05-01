import { FrontDisplayService } from './front-display.service';
import { Response } from 'express';
export declare class FrontDisplayController {
    private readonly frontDisplayService;
    constructor(frontDisplayService: FrontDisplayService);
    getFrontDisplay(res: Response): Promise<Response<any, Record<string, any>>>;
    getRecommendedEvents(timeWindow: 'week' | 'month', res: Response): Promise<Response<any, Record<string, any>>>;
}

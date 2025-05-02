import { SearchService } from './search.service';
import { Response } from 'express';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(title: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

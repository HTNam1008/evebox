import { CategoriesService } from './categories.service';
import { Response } from 'express';
import { CreateCategoryDto } from './categories-response.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(categoriesDto: CreateCategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}

export declare class CreateCategoryDto {
    name: string;
}
export declare class CategoriesResponseDto {
    id: number;
    name: string;
    createdAt: Date;
}
export declare class CategoriesResponse {
    statusCode: number;
    message: string;
    data: CategoriesResponseDto[];
}

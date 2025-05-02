declare class ImageDto {
    id: number;
    imageUrl: string;
}
declare class CategoryDto {
    id: number;
    name: string;
}
export declare class EventSearchResponseDto {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    lastScore: string;
    Images_Events_imgLogoIdToImages: ImageDto;
    Images_Events_imgPosterIdToImages: ImageDto;
    categories: CategoryDto[];
}
export declare class EventSearchResponse {
    statusCode: number;
    message: string;
    data: EventSearchResponseDto[];
}
export {};

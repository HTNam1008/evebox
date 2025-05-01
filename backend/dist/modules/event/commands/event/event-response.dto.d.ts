import { ImagesResponseDto } from "src/modules/images/commands/images/images-response.dto";
export declare class EventDto {
    id: number;
    title: string;
    startDate: string;
    status: string;
    lastScore: string;
    Images_Events_imgLogoIdToImages: ImagesResponseDto;
    Images_Events_imgPosterIdToImages: ImagesResponseDto;
    totalClicks: number;
    weekClicks: number;
}
export declare class EventResponse {
    statusCode: number;
    message: string;
    data: EventDto[];
}

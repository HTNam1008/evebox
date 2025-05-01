import { EventDto } from "../event/event-response.dto";
import { CategoriesResponseDto } from "../categories/categories-response.dto";
declare class eventCategoriesSpectial {
    category: CategoriesResponseDto;
    events: EventDto[];
}
export declare class EventFrontDisplayDTO {
    specialEvents: EventDto[];
    trendingEvents: EventDto[];
    onlyOnEve: EventDto[];
    categorySpecial: eventCategoriesSpectial[];
}
export declare class FrontDisplayResponse {
    statusCode: number;
    message: string;
    data: EventFrontDisplayDTO;
}
export {};

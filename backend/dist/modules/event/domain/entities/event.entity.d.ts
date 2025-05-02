import { Decimal } from "@prisma/client/runtime/library";
import { ShowingFront } from "src/modules/showing/domain/entities/showing.entity";
import { Categories, EventCategorySpecial } from "./categories.entity";
import { Images } from "src/modules/images/domain/entities/images.entity";
export interface EventFrontDisplay {
    id: number;
    title: string;
    startDate: Date;
    lastScore: Decimal;
    Images_Events_imgLogoIdToImages: Images;
    Images_Events_imgPosterIdToImages: Images;
    totalClicks: number;
    weekClicks: number;
    minTicketPrice?: number;
}
export interface EventSearchData {
    id: number;
    title: string;
    categories: Categories[];
    startDate: Date;
    endDate: Date;
    lastScore: Decimal;
    minTicketPrice?: number;
    Images_Events_imgLogoIdToImages: Images;
    Images_Events_imgPosterIdToImages: Images;
}
export interface EventData {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    organizerId: string;
    status: string;
    locationId: number;
    venue: string;
    minTicketPrice?: number;
    Images_Events_imgLogoIdToImages?: Images;
    Images_Events_imgPosterIdToImages?: Images;
    createdAt: Date;
    locationsString?: string;
    lastScore: Decimal;
    isSpecial: boolean;
    isOnlyOnEve: boolean;
    categories?: Categories[];
    showing?: ShowingFront[];
}
export interface FrontDisplayData {
    specialEvents: EventFrontDisplay[];
    trendingEvents: EventFrontDisplay[];
    onlyOnEve: EventFrontDisplay[];
    categorySpecial: EventCategorySpecial[];
}

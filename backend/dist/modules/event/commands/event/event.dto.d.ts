export declare class CreateEventDto {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    organizerId?: string;
    status: string;
    provinceId: number;
    districtId: number;
    wardString: string;
    venue: string;
    locationString: string;
    categoryIds: number[];
}
export declare class UpdateEventDto {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    provinceId: number;
    districtId: number;
    wardString: string;
    locationString: string;
    imgLogoId?: number;
    imgPosterId?: number;
    categoryIds: number[];
}

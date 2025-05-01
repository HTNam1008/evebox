import { LocationRepository } from '../repositories/location.repository';
export declare class LocationService {
    private readonly locationRepository;
    constructor(locationRepository: LocationRepository);
    createLocation(street: string, ward: string, provinceId: number, districtId: number): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    getAllLocations(): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }[]>;
    getLocationById(id: number): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    updateLocation(id: number, data: Partial<{
        street: string;
        ward: string;
        districtId: number;
    }>): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
    deleteLocation(id: number): Promise<{
        id: number;
        createdAt: Date;
        street: string;
        ward: string;
        districtId: number;
    }>;
}

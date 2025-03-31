import { Injectable } from '@nestjs/common';
import { SearchEventRepository } from '../../repositories/searchEvent.repository';
import { Result, Ok, Err } from 'oxide.ts';
import { CreateEventRepository } from '../../repositories/createEvent.repository';
import { CreateEventDto } from './createEvent.dto';
import { ImagesService } from 'src/modules/images/commands/images/images.service';
import { LocationService } from 'src/modules/location/commands/location.service';
import { EventDto } from './createEvent-response.dto';

@Injectable()
export class CreateEventService {
  constructor(
    private readonly createEventRepository: CreateEventRepository,
    private readonly imagesService: ImagesService,
    private readonly locationService: LocationService,
  ) {}

  async execute(dto: CreateEventDto, organizerId: string, imgLogo: Express.Multer.File, imgPoster: Express.Multer.File): Promise<Result<EventDto, Error>> {
    try {
      const categories = dto.categoryIds;
      if (categories.length === 0) {
        return Err(new Error('Categories not found'));
      }



      const imgLogoResult = await this.imagesService.uploadImage(imgLogo.buffer, imgLogo.originalname, organizerId);
      if (imgLogoResult.isErr()) {
        return Err(new Error('Failed to upload logo image'));
      }
      
      const imgPosterResult = await this.imagesService.uploadImage(imgPoster.buffer, imgPoster.originalname, organizerId);
      if (imgPosterResult.isErr()) {
        return Err(new Error('Failed to upload poster image'));
      }

      let locationId : number;
      if (!dto.isOnline)
        {
        const location = await this.locationService.createLocation(dto.streetString, dto.wardString, dto.districtId);
        if (!location) {
          return Err(new Error('Failed to create location'));
        }
        locationId = location.id;
      }

      const imgLogoCreated = imgLogoResult.unwrap();
      const imgPosterCreated = imgPosterResult.unwrap();

      const eventResult = await this.createEventRepository.createEvent(dto, organizerId, imgLogoCreated.id, imgPosterCreated.id, locationId);
      if (eventResult.isErr()) {
        return Err(new Error('Failed to create event'));
      }

      const eventCategories = await this.createEventRepository.createEventCategory(eventResult.unwrap().id, dto.categoryIds);
      if (eventCategories.isErr()) {
        return Err(new Error('Failed to create event categories'));
      }

      return Ok(eventResult.unwrap());
      
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to create event'));
    }
  }
}
import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { UpdateEventRepository } from '../../repositories/updateEvent.repository';
import { UpdateEventDto } from './updateEvent.dto';
import { EventDto } from './updateEvent-response.dto';
import { ImagesService } from 'src/modules/images/commands/images/images.service';
import { LocationService } from 'src/modules/location/commands/location.service';

@Injectable()
export class UpdateEventService {
  constructor(
    private readonly updateEventRepository: UpdateEventRepository,
    private readonly imagesService: ImagesService,
    private readonly locationService: LocationService,
  ) {}

  async execute(dto: UpdateEventDto, organizerId: string, id: number): Promise<Result<EventDto, Error>> {
    try {
      const isAuthor = await this.updateEventRepository.checkAuthor(id, organizerId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }

      let imgLogoId: number | undefined;
      let imgPosterId: number | undefined;
      let locationId: number | undefined;

      if (dto.imgLogo) {
        const imgLogoResult = await this.imagesService.uploadImage(dto.imgLogo.buffer, dto.imgLogo.originalname, organizerId);
        if (imgLogoResult.isErr()) {
          return Err(new Error('Failed to upload logo image'));
        }
        imgLogoId = imgLogoResult.unwrap().id;
      }

      if (dto.imgPoster) {
        const imgPosterResult = await this.imagesService.uploadImage(dto.imgPoster.buffer, dto.imgPoster.originalname, organizerId);
        if (imgPosterResult.isErr()) {
          return Err(new Error('Failed to upload poster image'));
        }
        imgPosterId = imgPosterResult.unwrap().id;
      }

      // Update location if all address components are provided
      if (dto.streetString && dto.wardString && dto.districtId) {
        const location = await this.locationService.createLocation(dto.streetString, dto.wardString, dto.districtId);
        if (!location) {
          return Err(new Error('Failed to update location'));
        }
        locationId = location.id;
      }

      const eventResult = await this.updateEventRepository.updateEvent(dto, id, locationId, imgLogoId, imgPosterId);
      if (eventResult.isErr()) {
        return Err(new Error('Failed to update event'));
      }

      // Update event categories if provided
      if (dto.categoryIds && dto.categoryIds.length > 0) {
        const categoryResult = await this.updateEventRepository.updateEventCategory(id, dto.categoryIds);
        if (categoryResult.isErr()) {
          return Err(new Error('Failed to update event categories'));
        }
      }

      return Ok(eventResult.unwrap());
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to update event'));
    }
  }
}
import { Injectable } from '@nestjs/common';
import { Result, Ok, Err } from 'oxide.ts';
import { EventRepository } from '../../repositories/event.repository';
import { CreateEventDto, UpdateEventDto } from './event.dto';
import { ImagesService } from 'src/modules/images/commands/images/images.service';
import { EventData } from '../../domain/entities/event.entity';
import { LocationService } from 'src/modules/location/commands/location.service';
import { EventCategoriesRepository } from '../../repositories/event-categories.repository';

@Injectable()
export class EventService {
  constructor(
    private readonly eventsRepository: EventRepository,
    private readonly imagesService: ImagesService,
    private readonly locationService: LocationService,
    private readonly eventCategoriesRepository: EventCategoriesRepository
  ) {}

  async createEvent(createEventDto: CreateEventDto, files: Express.Multer.File[]): Promise<Result<EventData, Error>> {
    try {
      let imgLogoId: number | null = null;
      let imgPosterId: number | null = null;

      if (files.length > 1) {
        const uploadedImages = await Promise.all([
          this.imagesService.uploadImage(files[0].buffer, createEventDto.title + '_logo'),
          this.imagesService.uploadImage(files[1].buffer, createEventDto.title + '_poster'),
        ]);

        if (uploadedImages[0].isErr() || uploadedImages[1].isErr()) {
          return Err(new Error('Failed to upload images'));
        }

        imgLogoId = uploadedImages[0].unwrap().id;
        imgPosterId = uploadedImages[1].unwrap().id;
      }

      const location = await this.locationService.createLocation(createEventDto.locationString, createEventDto.wardString, createEventDto.provinceId, createEventDto.districtId);
      const newEvent = await this.eventsRepository.create(createEventDto, imgLogoId, imgPosterId, location.id);

      createEventDto.categoryIds.forEach(async categoryId => {
        await this.eventCategoriesRepository.create(newEvent.id, categoryId);
      });

      return Ok(newEvent);
    } catch (error) {
      return Err(new Error('Failed to create event'));
    }
  }

  async findAll(): Promise<Result<EventData[], Error>> {
    try {
      const events = await this.eventsRepository.findAll();
      return Ok(events);
    } catch (error) {
      return Err(new Error('Failed to retrieve events'));
    }
  }

  async findOne(id: number): Promise<Result<EventData, Error>> {
    try {
      const event = await this.eventsRepository.findOne(id);
      if (!event) return Err(new Error('Event not found'));
      return Ok(event);
    } catch (error) {
      return Err(new Error('Failed to retrieve event'));
    }
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto, files: Express.Multer.File[]): Promise<Result<EventData, Error>> {
    try {
      let imgLogoId: number | null = null;
      let imgPosterId: number | null = null;

      if (files.length > 1) {
        const uploadedImages = await Promise.all([
          this.imagesService.update(updateEventDto.imgLogoId, files[0].buffer, updateEventDto.title || '' + '_logo'),
          this.imagesService.update(updateEventDto.imgPosterId ,files[1].buffer, updateEventDto.title || '' + '_poster'),
        ]);

        if (uploadedImages[0].isErr() || uploadedImages[1].isErr()) {
          return Err(new Error('Failed to upload images'));
        }

        imgLogoId = uploadedImages[0].unwrap().id;
        imgPosterId = uploadedImages[1].unwrap().id;
      }

      const updatedEvent = await this.eventsRepository.update(id, updateEventDto, imgLogoId, imgPosterId);
      await this.eventCategoriesRepository.updateByEventId(id, updateEventDto.categoryIds);

      return Ok(updatedEvent);
    } catch (error) {
      return Err(new Error('Failed to update event'));
    }
  }

  async deleteEvent(id: number): Promise<Result<void, Error>> {
    try {
      await this.eventsRepository.delete(id);
      await this.eventCategoriesRepository.deleteByEventId(id);
      return Ok(undefined);
    } catch (error) {
      return Err(new Error('Failed to delete event'));
    }
  }
}

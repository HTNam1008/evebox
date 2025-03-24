import { Injectable } from '@nestjs/common';
import { Result, Err } from 'oxide.ts';
import { UpdateTicketTypeRepository } from '../../repositories/updateTicketType.repository';
import { UpdateTicketTypeDto } from './updateTicketType.dto';
import { ImagesService } from 'src/modules/images/commands/images/images.service';

@Injectable()
export class UpdateTicketTypeService {
  constructor(
    private readonly updateTicketTypeRepository: UpdateTicketTypeRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async updateTicketType(dto: UpdateTicketTypeDto, id: string, userId: string): Promise<Result<string, Error>> {
    try {
      const isAuthor = await this.updateTicketTypeRepository.checkAuthor(id, userId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }

      let imageUrl: string | undefined = undefined;
      if (dto.img) {
        const uploadResult = await this.imagesService.uploadImage(dto.img.buffer, dto.img.originalname, "ticketType" + id);
        if (uploadResult.isErr()) {
          return Err(new Error('Failed to upload ticket image'));
        }
        imageUrl = uploadResult.unwrap().imageUrl;
      }

      return await this.updateTicketTypeRepository.updateTicketType(dto, id, imageUrl);
    } catch (error) {
      return Err(new Error('Failed to update ticket type'));
    }
  }
}
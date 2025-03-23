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

  async updateTicketType(dto: UpdateTicketTypeDto): Promise<Result<string, Error>> {
    try {
      let imageUrl: string | undefined = undefined;
      if (dto.img) {
        const uploadResult = await this.imagesService.uploadImage(dto.img.buffer, dto.img.originalname, "ticketType" + dto.id);
        if (uploadResult.isErr()) {
          return Err(new Error('Failed to upload ticket image'));
        }
        imageUrl = uploadResult.unwrap().imageUrl;
      }

      return await this.updateTicketTypeRepository.updateTicketType(dto, imageUrl);
    } catch (error) {
      return Err(new Error('Failed to update ticket type'));
    }
  }
}
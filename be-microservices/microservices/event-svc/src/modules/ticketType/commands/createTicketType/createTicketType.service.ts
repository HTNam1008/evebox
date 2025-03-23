import { Injectable } from "@nestjs/common";
import { Err, Result } from "oxide.ts";
import { TicketTypeRepository } from "../../repositories/ticketType.repository";
import { ImagesService } from "src/modules/images/commands/images/images.service";

@Injectable()
export class CreateTicketTypeService {
  constructor(private readonly createTicketTypeRepository: TicketTypeRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async createTicketType(dto: any, showingId: string, imageFile:  Express.Multer.File): Promise<Result<string, Error>> {
    try {
      if (!showingId) {
        return Err(new Error('Showing not found'));
      }
      const imgLogoResult = await this.imagesService.uploadImage(imageFile.buffer, imageFile.originalname, "show" + showingId);
      if (imgLogoResult.isErr()) {
        return Err(new Error('Failed to upload logo image'));
      }
      const imageUrl = imgLogoResult.unwrap().imageUrl;

      const result = await this.createTicketTypeRepository.createTicketType(dto, showingId, imageUrl);
      if (result.isOk()) {
        return result;
      }
      return Err(result.unwrapErr());
    } catch (error) {
      return Err(new Error('Failed to create ticket type'));
    }
  }
}
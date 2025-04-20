import { Injectable } from "@nestjs/common";
import { ContentRepository } from "./content.repository";
import { ContentDto } from "./content.dto";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
  ) {}

  async createContent(dto: ContentDto) {
    return this.contentRepository.addContent(dto);
  }

  async getAllContent() {
    return this.contentRepository.getContentTree(1);
  }
}
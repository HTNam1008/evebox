import { Injectable } from "@nestjs/common";
import { PrismaAIService } from "src/infrastructure/database/prisma-ai/prisma.service";
import { ContentDto } from "./content.dto";


@Injectable()
export class ContentRepository {
  constructor(private readonly prisma: PrismaAIService) {}
  async addContent( dto: ContentDto){
    try {
      const content = await this.prisma.content.create({
        data: {
          context: dto.context,
          message: dto.message,
          rootId: dto.rootId,
        },
      });
      return content;
    } catch (error) {
      return null;
    }
  }

  async getAllContent() {
    try {
      const content = await this.prisma.content.findFirst({
        where: {
          id: 1,
        },
        select: {
          id: true,
          context: true,
          message: true,
          rootId: true,
          Child: {

          }
        }
      });
      return content;
    } catch (error) {
      return null;
    }
  }

  async getContentTree(id: number): Promise<any> {
    try {
      const content = await this.prisma.content.findUnique({
        where: { id },
        select: {
          id: true,
          context: true,
          message: true,
          rootId: true,
          Child: {
            select: { id: true } // chỉ lấy id, lát gọi đệ quy
          }
        }
      });
  
      if (!content) return null;
  
      // Gọi đệ quy cho từng đứa con
      const childData = await Promise.all(
        content.Child.map(child => this.getContentTree(child.id))
      );
  
      return {
        ...content,
        Child: childData,
      };
    } catch (err) {
      return null;
    }
  }
  
}
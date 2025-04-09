import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { DeleteFormDto } from "../commands/deleteForm/deleteForm.dto";

@Injectable()
export class DeleteFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteForm(dto: DeleteFormDto): Promise<Result<number, Error>> {
    try {
      const form = await this.prisma.form.findFirst({
        where: { id: dto.id, deleteAt: null },
      });
      if (!form) {
        return Err(new Error('Form not found or no permission to delete'));
      }
      await this.prisma.$transaction(async (tx) => {
        // Soft delete FormInput: cập nhật deleteAt cho tất cả các FormInput chưa bị xoá
        await tx.formInput.updateMany({
          where: { formId: dto.id, deleteAt: null },
          data: { deleteAt: new Date() },
        });
        // Soft delete Form: cập nhật deleteAt
        await tx.form.update({
          where: { id: dto.id },
          data: { deleteAt: new Date() },
        });
      });
      return Ok(dto.id);
    } catch (error) {
      return Err(new Error('Failed to delete form'));
    }
  }

  async checkAuthor(id: number, userId: string): Promise<Result<boolean, Error>> {
    try {
      const form = await this.prisma.form.findUnique({
        where: { id: id >> 0 },
        select: { createdBy: true }
      });

      if (form && form.createdBy === userId) {
        return Ok(true);
      }

      return Ok(false);
    } catch (error) {
      return Err(new Error('Failed to check author'));
    }
  }
}
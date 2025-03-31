import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ConnectFormDto } from '../commands/connectShowingToForm/connectShowingToForm.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class ConnectFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async connectForm(dto: ConnectFormDto): Promise<Result<boolean, Error>> {
    try {
      // Kiểm tra Form có tồn tại và chưa bị xóa
      const form = await this.prisma.form.findFirst({
        where: { id: dto.formId, deleteAt: null },
      });
      if (!form) {
        return Err(new Error('Form not found'));
      }
      // Cập nhật showing: gán formId cho showing
      await this.prisma.showing.update({
        where: { id: dto.showingId },
        data: { formId: dto.formId },
      });
      return Ok(true);
    } catch (error) {
      return Err(new Error('Failed to connect showing to form'));
    }
  }
}
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { DeleteFormDto } from "../commands/deleteForm/deleteForm.dto";

@Injectable()
export class DeleteFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteForm(id: number): Promise<Result<number, Error>> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.formInput.deleteMany({
          where: {
            formId: id
          }
        });

        await tx.form.delete({
          where: { id }
        });
      });

      return Ok(id);
    } catch (error) {
      return Err(new Error('Failed to delete form'));
    }
  }
}
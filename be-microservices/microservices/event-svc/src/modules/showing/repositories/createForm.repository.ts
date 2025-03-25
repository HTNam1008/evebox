import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { CreateFormDto } from "../commands/createForm/createForm.dto";

@Injectable()
export class CreateFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createForm(dto: CreateFormDto): Promise<Result<number, Error>> {
    try {
      const createdForm = await this.prisma.form.create({
        data: {
          name: dto.name,
          createdBy: dto.createdBy,
          FormInput: {
            create: dto.formInputs.map((input) => ({
              fieldName: input.fieldName,
              type: input.type,
              required: input.required,
              regex: input.regex,
              options: input.options
            }))
          }
        }
      });

      if (!createdForm) {
        return Err(new Error('Failed to create form'));
      }

      return Ok(createdForm.id);
    } catch (error) {
      return Err(new Error('Failed to create form'));
    }
  }
}
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Result, Ok, Err } from "oxide.ts";
import { UpdateFormDto, UpdateFormInputDto } from "../commands/updateForm/updateForm.dto";

@Injectable()
export class UpdateFormRepository {
  constructor(private readonly prisma: PrismaService) { }

  async updateForm(dto: UpdateFormDto & { id: number }): Promise<Result<number, Error>> {
    try {
      const existingForm = await this.prisma.form.findFirst({
        where: {
          id: dto.id,
          deleteAt: null,
          Showing: {
            some: {
              id: dto.showingId
            }
          }
        },
        include: {
          FormInput: true
        }
      });

      if (!existingForm) {
        return Err(new Error('Form not found or does not belong to the specified showing'));
      }

      const updatedData: any = {};
      if (dto.name !== undefined) {
        updatedData.name = dto.name;
      }

      // handle form inputs: classify inputs into create, update, and delete
      let formInputsToCreate: UpdateFormInputDto[] = [];
      let formInputsToUpdate: UpdateFormInputDto[] = [];
      let formInputIdsToDelete: number[] = [];

      if (dto.formInputs) {
        const existingFormInputIds = existingForm.FormInput
          .filter(input => input.deleteAt === null)
          .map((input) => input.id);
        const newInputIds = dto.formInputs.filter((fi) => fi.id).map((fi) => fi.id);

        // identify old inputs to delete
        formInputIdsToDelete = existingFormInputIds.filter((id) => !newInputIds.includes(id));

        // classify new inputs into create and update
        for (const input of dto.formInputs) {
          if (input.id && existingFormInputIds.includes(input.id)) {
            formInputsToUpdate.push(input);
          } else {
            formInputsToCreate.push(input);
          }
        }
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.form.update({
          where: { id: dto.id },
          data: updatedData
        });

        if (formInputIdsToDelete.length > 0) {
          await tx.formInput.updateMany({
            where: { id: { in: formInputIdsToDelete } },
            data: { deleteAt: new Date() }
          });
        }

        for (const input of formInputsToUpdate) {
          const updateObj: any = {};
          if (input.fieldName !== undefined) updateObj.fieldName = input.fieldName;
          if (input.type !== undefined) updateObj.type = input.type;
          if (input.required !== undefined) updateObj.required = input.required;
          if (input.regex !== undefined) updateObj.regex = input.regex;
          if (input.options !== undefined) updateObj.options = input.options;

          await tx.formInput.update({
            where: { id: input.id },
            data: updateObj
          });
        }

        if (formInputsToCreate.length > 0) {
          await tx.formInput.createMany({
            data: formInputsToCreate.map((input) => ({
              formId: dto.id,
              fieldName: input.fieldName,
              type: input.type,
              required: input.required,
              regex: input.regex,
              options: input.options,
            }))
          });
        }
      });

      return Ok(dto.id);
    } catch (error) {
      return Err(new Error('Failed to update form'));
    }
  }
}

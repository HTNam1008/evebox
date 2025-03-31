import { Inject, Injectable } from "@nestjs/common";
import { CreateFormRepository } from "../../repositories/createForm.repository";
import { CreateFormDto } from "./createForm.dto";
import { Result, Ok, Err } from "oxide.ts";

@Injectable()
export class CreateFormService {
  constructor(private readonly createFormRepository: CreateFormRepository) {}

  async execute (dto: CreateFormDto, userEmail: string): Promise<Result<number, Error>> {
    try {
      if (!userEmail || !userEmail.trim()) {
        return Err(new Error('User email is required.'));
      }

      if (!dto.name || dto.formInputs.length === 0) {
        return Err(new Error('Form name is required.'));
      }

      if (!dto.formInputs || dto.formInputs.length === 0) {
        return Err(new Error('At least one form input is required.'));
      }

      if (dto.formInputs.length > 20) {
        return Err(new Error('No more than 20 form inputs allowed.'));
      }

      for (const [index, input] of dto.formInputs.entries()) {
        if (!input.fieldName || !input.type || input.required === null) {
          return Err(new Error(`Form input at index ${index + 1} is required.`));
        }

        if (!input.type || !input.type || !input.type.trim()) {
          return Err(new Error(`Invalid type for form input at index ${index + 1}.`));
        }
      }

      const result = await this.createFormRepository.createForm(dto, userEmail);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to create form'));
    }
  }
}
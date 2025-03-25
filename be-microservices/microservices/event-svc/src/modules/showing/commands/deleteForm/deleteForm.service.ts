import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { DeleteFormRepository } from "../../repositories/deleteForm.repository";
import { DeleteFormDto } from "./deleteForm.dto";

@Injectable()
export class DeleteFormService {
  constructor(private readonly deleteFormRepository: DeleteFormRepository) {}

  async execute(dto: DeleteFormDto): Promise<Result<number, Error>> {
    try {
      if (!dto.id) {
        return Err(new Error('Form ID is required.'));
      }

      const result = await this.deleteFormRepository.deleteForm(dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }

      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to delete form.'));
    }
  }
}
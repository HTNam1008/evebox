import { Injectable } from '@nestjs/common';
import { UpdateFormRepository } from '../../repositories/updateForm.repository';
import { UpdateFormDto } from './updateForm.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class UpdateFormService {
  constructor(private readonly updateFormRepository: UpdateFormRepository) {}

  async execute(dto: UpdateFormDto & { id: number }): Promise<Result<number, Error>> {
    try {
      const result = await this.updateFormRepository.updateForm(dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to update form'));
    }
  }
}
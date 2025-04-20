import { Injectable } from '@nestjs/common';
import { UpdateFormRepository } from '../../repositories/updateForm.repository';
import { UpdateFormDto } from './updateForm.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class UpdateFormService {
  constructor(private readonly updateFormRepository: UpdateFormRepository) {}

  async execute(dto: UpdateFormDto & { id: number, organizerId: string }): Promise<Result<number, Error>> {
    try {
      const isAuthor = await this.updateFormRepository.checkAuthor(dto.id, dto.organizerId);
      if (isAuthor.isErr()) {
        return Err(new Error('Failed to check author'));
      }
      if (!isAuthor.unwrap()) {
        return Err(new Error('Unauthorized'));
      }
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
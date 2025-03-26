import { Injectable } from '@nestjs/common';
import { GetFormRepository } from '../../repositories/getForm.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetFormService {
  constructor(private readonly getFormRepository: GetFormRepository) {}

  async execute(id: number): Promise<Result<any, Error>> {
    try {
      const form = await this.getFormRepository.getFormById(id);
      if (!form) {
        return Err(new Error('Form not found'));
      }
      return Ok(form);
    } catch (error) {
      return Err(new Error('Failed to retrieve form'));
    }
  }
}
import { Injectable } from '@nestjs/common';
import { GetAllFormsRepository } from '../../repositories/getAllForms.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetAllFormsService {
  constructor(private readonly getAllFormsRepository: GetAllFormsRepository) {}

  async execute(organizerEmail: string): Promise<Result<any, Error>> {
    try {
      const forms = await this.getAllFormsRepository.getAllForms(organizerEmail);
      return Ok(forms);
    } catch (error) {
      return Err(new Error('Failed to retrieve forms'));
    }
  }
}
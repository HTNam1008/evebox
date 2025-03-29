import { Injectable } from '@nestjs/common';
import { ConnectFormRepository } from '../../repositories/connectShowingToForm.repository';
import { ConnectFormDto } from './connectShowingToForm.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class ConnectFormService {
  constructor(private readonly connectFormRepository: ConnectFormRepository) {}

  async execute(dto: ConnectFormDto): Promise<Result<boolean, Error>> {
    try {
      const result = await this.connectFormRepository.connectForm(dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(true);
    } catch (error) {
      return Err(new Error('Failed to connect form'));
    }
  }
}
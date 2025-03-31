import { Injectable } from '@nestjs/common';
import { DeleteOrgPaymentInfoRepository } from '../../repositories/deleteOrgPaymentInfo.repository';
import { DeleteOrgPaymentInfoDto } from './deleteOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteOrgPaymentInfoService {
  constructor(private readonly deleteOrgPaymentInfoRepository: DeleteOrgPaymentInfoRepository) {}

  async execute(dto: DeleteOrgPaymentInfoDto): Promise<Result<string, Error>> {
    try {
      const result = await this.deleteOrgPaymentInfoRepository.deleteOrgPaymentInfo(dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to delete OrgPaymentInfo'));
    }
  }
}
import { Injectable } from '@nestjs/common';
import { DeleteOrgPaymentInfoRepository } from '../../repositories/deleteOrgPaymentInfo.repository';
import { DeleteOrgPaymentInfoDtoV2 } from './deleteOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class DeleteOrgPaymentInfoServiceV2 {
  constructor(private readonly deleteOrgPaymentInfoRepository: DeleteOrgPaymentInfoRepository) {}

  async execute(dto: DeleteOrgPaymentInfoDtoV2): Promise<Result<string, Error>> {
    try {
      const result = await this.deleteOrgPaymentInfoRepository.deleteOrgPaymentInfoV2(dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to delete OrgPaymentInfo'));
    }
  }
}
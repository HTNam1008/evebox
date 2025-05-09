import { Injectable } from '@nestjs/common';
import { UpdateOrgPaymentInfoRepository } from '../../repositories/updateOrgPaymentInfo.repository';
import { UpdateOrgPaymentInfoDtoV2 } from './updateOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class UpdateOrgPaymentInfoServiceV2 {
  constructor(private readonly updateOrgPaymentInfoRepository: UpdateOrgPaymentInfoRepository) {}

  async execute(id: string, dto: UpdateOrgPaymentInfoDtoV2): Promise<Result<string, Error>> {
    try {
      const result = await this.updateOrgPaymentInfoRepository.updateOrgPaymentInfoV2(id, dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to update OrgPaymentInfo'));
    }
  }
}
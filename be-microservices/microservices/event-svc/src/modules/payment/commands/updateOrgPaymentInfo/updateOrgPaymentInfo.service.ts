import { Injectable } from '@nestjs/common';
import { UpdateOrgPaymentInfoRepository } from '../../repositories/updateOrgPaymentInfo.repository';
import { UpdateOrgPaymentInfoDto } from './updateOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class UpdateOrgPaymentInfoService {
  constructor(private readonly updateOrgPaymentInfoRepository: UpdateOrgPaymentInfoRepository) {}

  async execute(id: string, dto: UpdateOrgPaymentInfoDto): Promise<Result<string, Error>> {
    try {
      const result = await this.updateOrgPaymentInfoRepository.updateOrgPaymentInfo(id, dto);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to update OrgPaymentInfo'));
    }
  }
}
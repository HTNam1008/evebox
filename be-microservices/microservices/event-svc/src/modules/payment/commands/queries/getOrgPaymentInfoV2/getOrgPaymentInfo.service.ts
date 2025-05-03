import { Injectable } from '@nestjs/common';
import { GetOrgPaymentInfoRepository } from '../../../repositories/getOrgPaymentInfo.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetOrgPaymentInfoServiceV2 {
  constructor(private readonly getOrgPaymentInfoRepository: GetOrgPaymentInfoRepository) {}

  async execute(organizerId: string): Promise<Result<any, Error>> {
    try {
      const info = await this.getOrgPaymentInfoRepository.getOrgPaymentInfoByOrganizer(organizerId);
      if (!info) {
        return Err(new Error('OrgPaymentInfo not found'));
      }
      return Ok(info);
    } catch (error) {
      return Err(new Error('Failed to retrieve OrgPaymentInfo'));
    }
  }
}
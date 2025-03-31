import { Injectable } from '@nestjs/common';
import { GetOrgPaymentInfoRepository } from '../../../repositories/getOrgPaymentInfo.repository';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class GetOrgPaymentInfoService {
  constructor(private readonly getOrgPaymentInfoRepository: GetOrgPaymentInfoRepository) {}

  async execute(organizerId: string, eventId: number): Promise<Result<any, Error>> {
    try {
      const info = await this.getOrgPaymentInfoRepository.getOrgPaymentInfoByOrganizerAndEvent(organizerId, eventId);
      if (!info) {
        return Err(new Error('OrgPaymentInfo not found'));
      }
      return Ok(info);
    } catch (error) {
      return Err(new Error('Failed to retrieve OrgPaymentInfo'));
    }
  }
}
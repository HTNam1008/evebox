import { Injectable } from '@nestjs/common';
import { CreateOrgPaymentInfoRepository } from '../../repositories/createOrgPaymentInfo.repository';
import { CreateOrgPaymentInfoDtoV2 } from './createOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class CreateOrgPaymentInfoServiceV2 {
  constructor(private readonly createOrgPaymentInfoRepository: CreateOrgPaymentInfoRepository) {}

  async execute(dto: CreateOrgPaymentInfoDtoV2, organizerId: string): Promise<Result<string, Error>> {
    try {
      if (!organizerId.trim()) {
        return Err(new Error('Organizer ID is required.'));
      }
      if (!dto.accountName.trim() || !dto.accountNumber.trim() || !dto.bankName.trim() || !dto.branch.trim()) {
        return Err(new Error('Bank account information is required.'));
      }
      if (!dto.fullName || !dto.address || !dto.taxCode) {
        return Err(new Error('FullName, Address, and Tax code are required.'));
      }

      const existing = await this.createOrgPaymentInfoRepository.findByOrganizerId(organizerId);
      if (existing) {
        return Err(new Error('A payment record for this organizer already exists.'));
      }
      
      const result = await this.createOrgPaymentInfoRepository.createOrgPaymentInfoCopy(dto, organizerId);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to create OrgPaymentInfo'));
    }
  }
}
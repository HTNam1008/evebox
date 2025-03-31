import { Injectable } from '@nestjs/common';
import { CreateOrgPaymentInfoRepository } from '../../repositories/createOrgPaymentInfo.repository';
import { CreateOrgPaymentInfoDto } from './createOrgPaymentInfo.dto';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class CreateOrgPaymentInfoService {
  constructor(private readonly createOrgPaymentInfoRepository: CreateOrgPaymentInfoRepository) {}

  async execute(dto: CreateOrgPaymentInfoDto, organizerId: string): Promise<Result<string, Error>> {
    try {
      if (!dto.eventId || dto.eventId === 0) {
        return Err(new Error('Event ID is required.'));
      }
      if (!organizerId.trim()) {
        return Err(new Error('Organizer ID is required.'));
      }
      if (!dto.accountName.trim() || !dto.accountNumber.trim() || !dto.bankName.trim() || !dto.branch.trim()) {
        return Err(new Error('Bank account information is required.'));
      }
      if (dto.businessType === 2) {
        if (!dto.fullName || !dto.address || !dto.taxCode) {
          return Err(new Error('For business/organizer: fullName, address, and taxCode are required.'));
        }
      }
      else {
        dto.fullName = '';
        dto.address = '';
        dto.taxCode = '';
      }
      const result = await this.createOrgPaymentInfoRepository.createOrgPaymentInfo(dto, organizerId);
      if (result.isErr()) {
        return Err(result.unwrapErr());
      }
      return Ok(result.unwrap());
    } catch (error) {
      return Err(new Error('Failed to create OrgPaymentInfo'));
    }
  }
}
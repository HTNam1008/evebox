import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { ProvinceRevenueData } from "./getOrgRevenueByProvince-response.dto";
import { GetOrgRevenueByProvinceRepository } from "../../repositories/getOrgRevenueByProvince.repository";

@Injectable()
export class GetOrgRevenueByProvinceService {
  constructor(private readonly getOrgRevenueByProvinceRepository: GetOrgRevenueByProvinceRepository) {}

  async execute(email: string): Promise<Result<ProvinceRevenueData[], Error>> {
    try {
      const result = await this.getOrgRevenueByProvinceRepository.findAll(email);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      console.error('Failed to get organizer revenue by province: ', error);
      return Err(new Error('Failed to get organizer revenue by province'));
    }
  }
}
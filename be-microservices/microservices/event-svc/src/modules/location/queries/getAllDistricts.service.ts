import { Injectable } from "@nestjs/common";
import { DistrictsRepository } from "../repositories/districts.repository";
import { Err, Ok, Result } from "oxide.ts";
import { Province } from "./getAllDistricts-response.dto";


@Injectable()
export class GetAllDistrictsService {
  constructor(private readonly districtsRepository: DistrictsRepository) {}

  async getAllDistricts() : Promise<Result<Province[], Error>> {
    try{
      const districts = await this.districtsRepository.getAllDistricts();
      return Ok(districts);
    }
    catch (error) {
      return Err(new Error('Failed to retrieve districts'));
    }
  }
}
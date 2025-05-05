import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { RevenueByTicketPriceData } from "./getRevenueByTicketPrice-response.dto";
import { GetRevenueByTicketPriceRepository } from "../../repositories/getRevenueByTicketPrice.repository";

@Injectable()
export class GetRevenueByTicketPriceService {
  constructor(private readonly getRevenueByTicketPriceRepository: GetRevenueByTicketPriceRepository) {}

  async execute(email: string): Promise<Result<RevenueByTicketPriceData[], Error>> {
    try {
      const result = await this.getRevenueByTicketPriceRepository.getRevenueByTicketPrice(email);

      if (result.isErr()) {
        return Err(new Error(result.unwrapErr().message));
      }

      return Ok(result.unwrap());
    } catch (error) {
      console.error('Failed to get revenue by ticket price: ', error);
      return Err(new Error('Failed to get revenue by ticket price'));
    }
  }
}
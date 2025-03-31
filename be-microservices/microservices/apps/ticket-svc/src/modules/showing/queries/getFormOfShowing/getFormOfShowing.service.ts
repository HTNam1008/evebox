import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "oxide.ts";
import { getFormOfShowingRepository } from "../../repositories/getFormOfShowing.repository";
import { Form } from "../../domain/entities/showing.entity";

@Injectable()
export class getFormOfShowingService {
  constructor (private readonly getFormOfShowingRepository: getFormOfShowingRepository) {}

  async execute(showingId: string): Promise<Result<Form, Error>> {
    try {
      const form = await this.getFormOfShowingRepository.getFormOfShowing(showingId);
      if (!form) {
        return Err(new Error('Form not found.'));
      }
      return Ok(form);
    } catch (error) {
      console.error(error);
      return Err(new Error('Failed to fetch form data.'));
    }
  }
}
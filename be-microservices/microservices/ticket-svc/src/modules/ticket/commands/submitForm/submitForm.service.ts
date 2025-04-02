import { Injectable } from '@nestjs/common';
import { SubmitFormDto } from './submitForm.dto';
import { SubmitFormResponseData, FormAnswerResponseDto } from './submitForm-response.dto';
import { SubmitFormRepository } from '../../repositories/submitForm.repository';
import { Ok, Err, Result } from 'oxide.ts';

@Injectable()
export class SubmitFormService {
  constructor(private readonly submitFormRepository: SubmitFormRepository) {}

  async submitForm(submitFormDto: SubmitFormDto, userId: string): Promise<Result<SubmitFormResponseData, Error>> {
    try{
      const formValidCheck = await this.submitFormRepository.checkValidForm(submitFormDto);
      if (!formValidCheck) {
        return Err(new Error('Invalid form data'));
      }
      const formResponse = await this.submitFormRepository.submitForm(submitFormDto, userId);
      if (!formResponse) {
        return Err(new Error('Failed to submit form'));
      }
      const formResponseData = {
        formResponseId: formResponse.id,
        answers: formResponse.FormAnswer.map((answer: FormAnswerResponseDto) => ({
          id: answer.id,
          formInputId: answer.formInputId,
          value: answer.value,
        })),
      }
      return Ok(formResponseData);
    }
    catch(error){
      return Err(new Error('Internal server error'));
    }
  }
}

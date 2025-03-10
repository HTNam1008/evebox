import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { SubmitFormDto } from '../commands/submitForm/submitForm.dto';

@Injectable()
export class SubmitFormRepository {
  constructor(private readonly prisma: PrismaService) {}

  async submitForm(submitFormDto: SubmitFormDto, userId: string) {
    try{
      const existsForm = await this.prisma.formResponse.findFirst({
        where: {
          userId: userId,
          formId: submitFormDto.formId,
          showingId: submitFormDto.showingId,
          Ticket: {
            none: {}, // Không có ticket nào liên kết với FormResponse này
          },
        },
        include: {
          answers: true,
        },
      });
      

      if (existsForm) {
        // Xóa các câu trả lời cũ trước khi cập nhật mới
        await this.prisma.formAnswer.deleteMany({
          where: {
            formResponseId: existsForm.id,
          },
        });

        // Cập nhật lại dữ liệu
        return await this.prisma.formResponse.update({
          where: { id: existsForm.id },
          data: {
            answers: {
              create: submitFormDto.answers.map((answer) => ({
                formInputId: answer.formInputId,
                value: answer.value,
              })),
            },
          },
          include: {
            answers: true, // Lấy luôn danh sách câu trả lời sau khi cập nhật
          },
        });
      }

      // Nếu chưa có dữ liệu, tạo mới
      return await this.prisma.formResponse.create({
        data: {
          userId: userId,
          formId: submitFormDto.formId,
          showingId: submitFormDto.showingId,
          answers: {
            create: submitFormDto.answers.map((answer) => ({
              formInputId: answer.formInputId,
              value: answer.value,
            })),
          },
        },
        include: {
          answers: true, // Lấy luôn danh sách câu trả lời sau khi tạo
        },
      });
    }
    catch(error){
      console.error(error);
      return;
    }
  }

  async checkValidForm(submitFormDto) {
    try{
      const form = await this.prisma.form.findFirst({
        where: {
          id: submitFormDto.formId,
        },
      });

      if (!form) {
        return false;
      }

      const formInputs = await this.prisma.formInput.findMany({
        where: {
          formId: form.id,
        },
      });

      for (const answer of submitFormDto.answers) {
        const formInput = formInputs.find((input) => input.id === answer.formInputId);
        if (!formInput) {
          return false;
        }
        const regex = new RegExp(formInput.regex);

        if ( formInput.regex && !regex.test(answer.value)) {
          return false;
        }

        if (formInput.required && !answer.value) {
          return false;
        }
      }

      return true;
     }
     catch(error){
       console.error(error);
       return;
    }
  }
}

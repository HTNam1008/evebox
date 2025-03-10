import { Controller, Post, Body, Request, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { SubmitFormDto } from './submitForm.dto';
import { SubmitFormService } from './submitForm.service';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';

@Controller('api/ticket')
export class SubmitFormController {
  constructor(private readonly submitFormService: SubmitFormService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/submitForm')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true
  })
  @ApiOperation({ summary: 'Submit form responses' })
  @ApiBody({ type: SubmitFormDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Form submitted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid form data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async submitForm(
    @Request() req,
    @Body() submitFormDto: SubmitFormDto, 
    @Res() res: Response) {
    try {
      const user = req.user;
      const result = await this.submitFormService.submitForm(submitFormDto, user.email);

      if (result.isErr()) {
        const error = result.unwrapErr();
        const status = error.message === 'Invalid form data' ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json(ErrorHandler.badRequest(error.message));
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Form submitted successfully',
        data: result.unwrap(),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorHandler.internalServerError('An unexpected error occurred'));
    }
  }
}

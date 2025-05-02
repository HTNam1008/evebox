import { Controller, Delete, Param, Res, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";
import { DeleteFormService } from "./deleteForm.service";
import { DeleteFormResponseDto } from "./deleteForm-response.dto";
import { DeleteFormDto } from "./deleteForm.dto";
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class DeleteFormController {
  constructor(private readonly deleteFormService: DeleteFormService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('form/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Soft delete a form' })
  @ApiParam({ name: 'id', type: Number, description: 'Form ID to delete' })
  @ApiResponse({ status: 200, description: 'Form deleted successfully', type: DeleteFormResponseDto })
  async deleteForm(@Param('id') id: string, @Res() res: Response, @Request() req: any) {
    const numberId = Number(id);
    const dto: DeleteFormDto = { id: numberId };
    const user = req.user;
    console.log("🚀 ~ DeleteFormController ~ deleteForm ~ dto:", dto)
    console.log("🚀 ~ DeleteFormController ~ deleteForm ~ user:", user)
    const result = await this.deleteFormService.execute(dto, user?.email);
    if (result.isErr()) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: result.unwrapErr().message,
      });
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Form deleted successfully',
      data: { formId: result.unwrap() },
    });
  }
}
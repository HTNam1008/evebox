import { Controller, Delete, Param, Res, HttpStatus, Request } from "@nestjs/common";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiHeader } from "@nestjs/swagger";
import { DeleteFormService } from "./deleteForm.service";
import { DeleteFormResponseDto } from "./deleteForm-response.dto";
import { DeleteFormDto } from "./deleteForm.dto";

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class DeleteFormController {
  constructor(private readonly deleteFormService: DeleteFormService) {}

  @Delete('form/:id')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authorization (`Bearer <token>`)',
    required: true,
  })
  @ApiOperation({ summary: 'Soft delete a form' })
  @ApiParam({ name: 'id', type: Number, description: 'Form ID to delete' })
  @ApiResponse({ status: 200, description: 'Form deleted successfully', type: DeleteFormResponseDto })
  async deleteForm(@Param('id') id: string, @Res() res: Response, @Request() req) {
    const numberId = Number(id);
    const dto: DeleteFormDto = { id: numberId };
    const user = req.user;
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
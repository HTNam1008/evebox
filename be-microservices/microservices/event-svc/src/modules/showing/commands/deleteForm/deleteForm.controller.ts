import { Controller, Delete, Param, Res, HttpStatus, Query } from "@nestjs/common";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from "@nestjs/swagger";
import { DeleteFormService } from "./deleteForm.service";
import { DeleteFormResponseDto } from "./deleteForm-response.dto";
import { DeleteFormDto } from "./deleteForm.dto";

@ApiTags('Org - Showing')
@Controller('api/org/showing')
export class DeleteFormController {
  constructor(private readonly deleteFormService: DeleteFormService) {}

  @Delete('form/:id')
  @ApiOperation({ summary: 'Soft delete a form' })
  @ApiParam({ name: 'id', type: Number, description: 'Form ID to delete' })
  @ApiQuery({ name: 'createdBy', type: String, description: 'Organizer email (creator of the form)' })
  @ApiResponse({ status: 200, description: 'Form deleted successfully', type: DeleteFormResponseDto })
  async deleteForm(@Param('id') id: string, @Query('createdBy') createdBy: string, @Res() res: Response) {
    const numberId = Number(id);
    const dto: DeleteFormDto = { id: numberId, createdBy };
    const result = await this.deleteFormService.execute(dto);
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
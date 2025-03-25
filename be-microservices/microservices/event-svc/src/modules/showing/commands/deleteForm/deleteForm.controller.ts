import { Controller, Delete, Param, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";
import { DeleteFormService } from "./deleteForm.service";
import { DeleteFormResponseDto } from "./deleteForm-response.dto";

@ApiTags('Org - Event')
@Controller('api/org/event')
export class DeleteFormController {
  constructor(private readonly deleteFormService: DeleteFormService) {}

  @Delete('form/:id')
  @ApiOperation({ summary: 'Delete form of a showing' })
  @ApiResponse({ status: 200, description: 'Form deleted successfully', type: DeleteFormResponseDto })
  async deleteForm(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.deleteFormService.execute({ id: Number(id) });
      if (result.isErr()) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: result.unwrapErr().message,
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Form deleted successfully',
        formId: result.unwrap(),
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
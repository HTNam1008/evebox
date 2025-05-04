import { Controller, Post, Body, Request, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiBody, ApiHeader, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorHandler } from 'src/shared/exceptions/error.handler';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.guard';
import { PayOSCheckoutService } from './payOSCheckout.service';
import { PayOSCheckoutDto } from './payOSCheckout.dto';

@ApiTags('Payment')
@Controller('api/payment')
export class PayOSCheckoutController {
  constructor(private readonly payOSCheckoutService: PayOSCheckoutService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/payos-checkout')
    @ApiBearerAuth('access-token')

  @ApiOperation({ summary: 'Checkout with PayOS' })
  @ApiBody({ type: PayOSCheckoutDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'PayOs checkout successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid seat or ticket type',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Time remaining has expired',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'PaymentMethod not available',
  })
  async selectSeat(
    @Request() req,
    @Body() selectSeatDto: PayOSCheckoutDto, 
    @Res() res: Response) {
    const user = req.user;
    const result = await this.payOSCheckoutService.execute(selectSeatDto, user.email);
    if (result.isErr()) {
      const error = result.unwrapErr();
      switch (error.message) {
        case 'Invalid seat or ticket type':
          return res.status(HttpStatus.NOT_FOUND).json(ErrorHandler.notFound(error.message));
        case 'Database Error.':
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorHandler.internalServerError(error.message));
        case 'PaymentMethod not available.':
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ErrorHandler.internalServerError(error.message));
        case 'Time remaining has expired':
          return res.status(HttpStatus.BAD_REQUEST).json(ErrorHandler.badRequest(error.message));
        default:
          return res.status(HttpStatus.BAD_REQUEST).json(ErrorHandler.badRequest(error.message));
      }
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Seats successfully selected',
      data: result.unwrap(),
    });
  }
}

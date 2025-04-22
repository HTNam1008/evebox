import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { BaseResponse } from 'src/shared/constants/baseResponse';


export class FormInput {
  @ApiProperty({ example: 'Full Name', description: 'Field name of the form input' })
  fieldName: string;

  @ApiProperty({ example: '', description: 'Options available for the input field', required: false })
  options?: JsonValue;
}

export class FormAnswer {
  @ApiProperty({ example: 'John Doe', description: 'Answer value submitted by the user' })
  value: string;

  @ApiProperty({ type: FormInput, description: 'Corresponding input field for the answer' })
  FormInput: FormInput;
}

export class FormResponse {
  @ApiProperty({ type: [FormAnswer], description: 'All answers submitted in the form' })
  FormAnswer: FormAnswer[];
}

export class OrderInfo {
  @ApiProperty({ example: 1, description: 'Ticket type ID' })
  ticketTypeId: string;

  @ApiProperty({ example: 2, description: 'Quantity of tickets in this order item' })
  quantity: number;

  @ApiProperty({ example: 'A12', description: 'Seat ID (if available)', required: false })
  seatId: number[];

  @ApiProperty({ example: 'completed', description: 'Order status' })
  status: number;
}

export class PaymentInfo {
  @ApiProperty({ example: 1032, description: 'Payment info ID' })
  id: number;

  @ApiProperty({ example: '2024-12-28T14:00:00.000Z', description: 'Timestamp of payment', required: false })
  paidAt?: Date;

  @ApiProperty({ type: OrderInfo, description: 'Details of the ordered tickets' })
  OrderInfo: OrderInfo;
}

export class TicketOrderData {
  @ApiProperty({ example: 'tk_9as823js92', description: 'Ticket ID' })
  id: string;

  @ApiProperty({ example: 'completed', description: 'Ticket status' })
  status: number;

  @ApiProperty({ example: 250000, description: 'Ticket price' })
  price: number;

  @ApiProperty({ example: 'general', description: 'Ticket type' })
  type: string;

  @ApiProperty({ example: true, description: 'Whether the ticket confirmation mail was sent' })
  mailSent: boolean;

  @ApiProperty({ example: '1041811243642', description: 'Showing ID' })
  showingId: string;

  @ApiProperty({ type: FormResponse, description: 'Form responses attached to the ticket', required: false })
  FormResponse?: FormResponse;

  @ApiProperty({ type: PaymentInfo, description: 'Payment information associated with the ticket', required: false })
  PaymentInfo?: PaymentInfo;
}

export class GetOrdersResponse extends BaseResponse {
  @ApiProperty({ type: [TicketOrderData], description: 'List of all tickets/orders of the showing' })
  data: TicketOrderData[];
}

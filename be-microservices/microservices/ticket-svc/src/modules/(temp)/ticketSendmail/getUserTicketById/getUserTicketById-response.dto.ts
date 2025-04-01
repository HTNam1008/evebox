import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

class ImagesResponseData {
  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;
}

class UserEventDto {
  @ApiProperty( {example: 'The Batman', description: 'The title of the event' })
  title: string;

  @ApiProperty( {example: 'Nhà hát kịch Idecaf', description: 'The venue of the event' })
  venue: string;

  @ApiProperty( {type: ImagesResponseData, description: 'The image of the event' })
  Images_Events_imgPosterIdToImages: ImagesResponseData;

  @ApiProperty( {example: '130 Nguyen Dinh Chieu, Da Kao Ward, District 1, Ho Chi Minh City', description: 'The address of the event' })
  locationsString: string;
}

class UserShowingDto {
  @ApiProperty( {example: '2021-10-10T10:00:00Z', description: 'The start time of the showing' })
  startTime: Date;

  @ApiProperty( {example: '2021-10-10T12:00:00Z', description: 'The end time of the showing' })
  endTime: Date;

  @ApiProperty( {type: UserEventDto, description: 'The event of the showing' })
  Events: UserEventDto;
}

class UserFormInputDto {
  @ApiProperty( {example: 'name', description: 'The field name of the form input' })
  fieldName: string;
}

class UserFormAnserDto {
  @ApiProperty( {type: UserFormInputDto, description: 'The form input of the form answer' })
  FormInput: UserFormInputDto;

  @ApiProperty( {example: 'Duong Ngoc Thai Bao', description: 'The value of the form answer' })
  value: string;
}

class UserFormResponseDto {
  @ApiProperty( {type: UserFormAnserDto, description: 'The answers of the form response' })
  FormAnswer: UserFormAnserDto[];
}

class PaymentInfoDto {
  @ApiProperty( {example: '2021-10-10T10:00:00Z', description: 'The paid time of the ticket' })
  paidAt: Date;

  @ApiProperty( {example: PaymentMethod.PAYOS, description: 'The payment method of the ticket', enum: PaymentMethod })
  method: PaymentMethod;
}

class TicketQRCodeDto {
  @ApiProperty( {example: '9090909090900qq8qqw7d', description: 'The qr code of the ticket' })
  qrCode: string;

  @ApiProperty( {example: '1321', description: 'The ticket type id of the ticket' })
  ticketTypeId: string;

  @ApiProperty( {example: 78, description: 'The seat id of the ticket' })
  seatId?: number;
}

class TicketTypeDto {
  @ApiProperty( {example: 'Ve thuong', description: 'The type of the ticket' })
  name: string;

  @ApiProperty( {example: 540000, description: 'The price of the ticket' })
  price: number;
}

class SectionDto {
  @ApiProperty( {example: 'A1', description: 'The section name' })
  name: string;

  @ApiProperty( {example: 1, description: 'The id of the section' })
  id: number;
}

class RowDto {
  @ApiProperty( {example: 1, description: 'The id of the row' })
  id: number;

  @ApiProperty( {example: 'A', description: 'The name of the row' })
  name: string;

  @ApiProperty( {type: SectionDto, description: 'The section of the row' })
  Section: SectionDto;
}

class SeatDto {
  @ApiProperty( {example: 1, description: 'The id of the seat' })
  id: number;

  @ApiProperty( {example: 'A1', description: 'The name of the seat' })
  name: string;

  @ApiProperty( {type: RowDto, description: 'The row of the seat' })
  Row: RowDto;
}

export class UserTicketByIdDto {
  @ApiProperty( {example: '3671d719-4f12-486d-9b6c-b8343b4c64de', description: 'The id of the ticket' })
  id: string;

  @ApiProperty( {example: '169898227', description: 'The showing id of the ticket' })
  showingId: string;

  @ApiProperty( {example: 1, description: 'The status of the ticket' })
  status: number;

  @ApiProperty( {example: "Ve dien tu", description: 'Type of ticket' })
  type: string;

  @ApiProperty( {example: 540000, description: 'The price of the ticket' })
  price: number;

  @ApiProperty( {type: PaymentInfoDto, description: 'The payment info of the ticket' })
  PaymentInfo?: PaymentInfoDto;

  @ApiProperty( {type: [TicketQRCodeDto], description: 'The qr code of the ticket' })
  TicketQRCode?: TicketQRCodeDto[];

  @ApiProperty( {type: UserShowingDto, description: 'The showing of the ticket' })
  Showing?: UserShowingDto;

  @ApiProperty( {type: UserFormResponseDto, description: 'The form response of the ticket' })
  FormResponse: UserFormResponseDto;

  @ApiProperty( {type: TicketTypeDto, description: 'The ticket type of the ticket' })
  ticketType: TicketTypeDto;

  @ApiProperty( {type: [SeatDto], description: 'The seats of the ticket' })
  seats: SeatDto[];

  @ApiProperty( {example: 2, description: 'The number of tickets' })
  count: number;
}

export class GetUserTicketByIdResponseDto {
  @ApiProperty({ example: 200, description: 'status code' })
  statusCode: number;

  @ApiProperty({ example: 'Get redis seat successfully', description: 'message' })
  message: string;

  @ApiProperty({ type: [UserTicketByIdDto], description: 'The ticket data' })
  data: UserTicketByIdDto[];
}
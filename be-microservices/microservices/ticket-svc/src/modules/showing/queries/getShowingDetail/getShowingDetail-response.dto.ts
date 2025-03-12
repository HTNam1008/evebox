import { ApiProperty } from '@nestjs/swagger';

export class TicketTypeDto {
  @ApiProperty({ example: '1027771', description: 'Ticket ID' })
  id: string;

  @ApiProperty({ example: 'ĐÀO KÉP', description: 'Ticket name' })
  name: string;

  @ApiProperty({ example: '', description: 'Ticket description' })
  description: string;

  @ApiProperty({ example: '#c0fd71', description: 'Ticket color code' })
  color: string;

  @ApiProperty({ example: false, description: 'Is ticket free' })
  isFree: boolean;

  @ApiProperty({ example: 1500000, description: 'Ticket price' })
  price: number;

  @ApiProperty({ example: 1500000, description: 'Original ticket price' })
  originalPrice: number;

  @ApiProperty({ example: 10, description: 'Maximum quantity per order' })
  maxQtyPerOrder: number;

  @ApiProperty({ example: 1, description: 'Minimum quantity per order' })
  minQtyPerOrder: number;

  @ApiProperty({
    example: '2024-10-10T06:28:00.000Z',
    description: 'Effective start date in ISO format',
  })
  effectiveFrom: string;

  @ApiProperty({
    example: '2024-12-21T13:00:00.000Z',
    description: 'Effective end date in ISO format',
  })
  effectiveTo: string;

  @ApiProperty({ example: 1, description: 'Position in list' })
  position: number;

  @ApiProperty({ example: 'sold_out', description: 'Ticket status' })
  status: string;

  @ApiProperty({ example: '', description: 'Ticket image URL' })
  imageUrl: string;

  @ApiProperty({ example: false, description: 'Is ticket hidden' })
  isHidden: boolean;
}

class ImagesResponseData {
  @ApiProperty({
    description: 'Image ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;
}

class EventDto {
  @ApiProperty({ example: 22911, description: 'Event ID' })
  id: number;

  @ApiProperty({
    example: 'SÂN KHẤU / ĐOÀN CẢI LƯƠNG THIÊN LONG - CAO QUÂN BẢO ĐẠI CHIẾN DƯ HỒNG (LƯU KIM ĐÍNH)',
    description: 'Event title',
  })
  title: string;

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Event start date in ISO format',
  })
  startDate: string;

  @ApiProperty({ example: 'select_showing', description: 'Event status' })
  status: string;

  @ApiProperty({ example: '50', description: 'Last score' })
  lastScore: string;

  @ApiProperty({ type: ImagesResponseData, description: 'Event logo image' })
  Images_Events_imgLogoIdToImages: ImagesResponseData;

  @ApiProperty({ type: ImagesResponseData, description: 'Event poster image' })
  Images_Events_imgPosterIdToImages: ImagesResponseData;

  @ApiProperty({ example: 601, description: 'Total clicks' })
  totalClicks: number;

  @ApiProperty({ example: 300, description: 'Weekly clicks' })
  weekClicks: number;
}

class FormInputDto {
  @ApiProperty({ example: 1, description: 'Input ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'Form ID' })
  formId: number;

  @ApiProperty({ example: 'name', description: 'Field name' })
  fieldName: string;

  @ApiProperty({ example: 'text', description: 'Field type' })
  type: string;

  @ApiProperty({ example: true, description: 'Is field required' })
  required: boolean;

  @ApiProperty({ example: '^[a-zA-Z]+$', description: 'Field regex' })
  regex: string;
}

class FormDto {

  @ApiProperty({ example: 1, description: 'Form ID' })
  id: number;

  @ApiProperty({ example: 'booking', description: 'Form name' })
  name: string;

  @ApiProperty({ type: [FormInputDto], description: 'List of form inputs' })
  inputs: FormInputDto[];
}

class ShowingDataDto {
  @ApiProperty({ example: '16962844867169', description: 'Showing ID' })
  id: string;

  @ApiProperty({ example: 22911, description: 'Event ID' })
  eventId: number;

  @ApiProperty({ example: 'book_now', description: 'Showing status' })
  status: string;

  @ApiProperty({ example: false, description: 'Is the event free' })
  isFree: boolean;

  @ApiProperty({ example: true, description: 'Is ticket salable' })
  isSalable: boolean;

  @ApiProperty({ example: false, description: 'Is presale available' })
  isPresale: boolean;

  @ApiProperty({ example: 180, description: 'Seat map ID' })
  seatMapId: number;

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Start time of the showing in ISO format',
  })
  startTime: string;

  @ApiProperty({
    example: '2024-12-28T16:00:00.000Z',
    description: 'End time of the showing in ISO format',
  })
  endTime: string;

  @ApiProperty({ example: false, description: 'Is queue waiting enabled' })
  isEnabledQueueWaiting: boolean;

  @ApiProperty({ example: true, description: 'Show all seats' })
  showAllSeats: boolean;

  @ApiProperty({ type: EventDto, description: 'Event details' })
  Events: EventDto;

  @ApiProperty({ type: [TicketTypeDto], description: 'List of available ticket types' })
  TicketType: TicketTypeDto[];

  @ApiProperty({ type: FormDto, description: 'Booking form' })
  Form: FormDto;
}

export class ShowingResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Showing data retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ type: ShowingDataDto, description: 'Showing data' })
  data: ShowingDataDto;
}
// import { ApiProperty } from '@nestjs/swagger';

// export class TicketTypeDto {
//   @ApiProperty({ example: '1027771', description: 'Ticket ID' })
//   id: string;

//   @ApiProperty({ example: 'ĐÀO KÉP', description: 'Ticket name' })
//   name: string;

//   @ApiProperty({ example: '', description: 'Ticket description' })
//   description: string;

//   @ApiProperty({ example: '#c0fd71', description: 'Ticket color code' })
//   color: string;

//   @ApiProperty({ example: false, description: 'Is ticket free' })
//   isFree: boolean;

//   @ApiProperty({ example: 1500000, description: 'Ticket price' })
//   price: number;

//   @ApiProperty({ example: 1500000, description: 'Original ticket price' })
//   originalPrice: number;

//   @ApiProperty({ example: 10, description: 'Maximum quantity per order' })
//   maxQtyPerOrder: number;

//   @ApiProperty({ example: 1, description: 'Minimum quantity per order' })
//   minQtyPerOrder: number;

//   @ApiProperty({
//     example: '2024-10-10T06:28:00.000Z',
//     description: 'Effective start date in ISO format',
//   })
//   effectiveFrom: string;

//   @ApiProperty({
//     example: '2024-12-21T13:00:00.000Z',
//     description: 'Effective end date in ISO format',
//   })
//   effectiveTo: string;

//   @ApiProperty({ example: 1, description: 'Position in list' })
//   position: number;

//   @ApiProperty({ example: 'sold_out', description: 'Ticket status' })
//   status: string;

//   @ApiProperty({ example: '', description: 'Ticket image URL' })
//   imageUrl: string;

//   @ApiProperty({ example: false, description: 'Is ticket hidden' })
//   isHidden: boolean;
// }

// export class TicketTypeResponseDto {
//   @ApiProperty({ example: 201, description: 'Response status code' })
//   statusCode: number;

//   @ApiProperty({ example: 'Ticket types created successfully', description: 'Response message' })
//   message: string;

//   @ApiProperty({ type: [TicketTypeDto], description: 'Ticket types' })
//   data: TicketTypeDto[];
// }
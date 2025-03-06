import { ApiProperty } from '@nestjs/swagger';
import { EventDto } from 'src/modules/event/commands/event/event-response.dto';
import { TicketTypeDto } from '../tickettype/tickettype-response.dto';

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

export class AllShowingsResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Showing data retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({
    example: '16962844867169,16962844867170',
    description: 'Comma-separated string of Showing IDs',
  })
  data: {
    showingIds: string[];
  };
}

import { JsonValue } from 'type-fest';

class SeatDto {
  @ApiProperty({ example: 219546, description: 'Seat ID' })
  id: number;

  @ApiProperty({ example: '2', description: 'Seat name' })
  name: string;

  @ApiProperty({ example: 16951, description: 'Row ID' })
  rowId: number;

  @ApiProperty({ example: 0, description: 'Seat position' })
  position: number;

  @ApiProperty({ example: { '0': 201.73 }, description: 'X position of the seat' })
  positionX: JsonValue;

  @ApiProperty({ example: { '0': 84.84 }, description: 'Y position of the seat' })
  positionY: JsonValue;

  @ApiProperty({
    example: '2024-12-17T10:06:33.889Z',
    description: 'Seat creation date in ISO format',
  })
  createdAt: string;

  @ApiProperty({ example: 2, description: 'Seat status' })
  status: number;
}

class RowDto {
  @ApiProperty({ example: 16951, description: 'Row ID' })
  id: number;

  @ApiProperty({ example: 'B', description: 'Row name' })
  name: string;

  @ApiProperty({ example: 2000, description: 'Section ID' })
  sectionId: number;

  @ApiProperty({
    example: '2024-12-17T10:06:32.777Z',
    description: 'Row creation date in ISO format',
  })
  createdAt: string;

  @ApiProperty({ type: [SeatDto], description: 'List of seats in the row' })
  Seat: SeatDto[];
}

class SectionDto {
  @ApiProperty({ example: 2000, description: 'Section ID' })
  id: number;

  @ApiProperty({ example: 'SUPER_VIP', description: 'Section name' })
  name: string;

  @ApiProperty({ example: 180, description: 'Seatmap ID' })
  seatmapId: number;

  @ApiProperty({
    example: '2024-12-17T10:06:31.718Z',
    description: 'Section creation date in ISO format',
  })
  createdAt: string;

  @ApiProperty({ example: false, description: 'Is this section the stage' })
  isStage: boolean;

  @ApiProperty({
    example: [
      {
        x: 0,
        y: 0,
        data: 'M268.96 62.26 99.02 62.26 97.72 62.26 68.26 62.26 68.26 73.85 68.26 78.7 97.72 78.7 99.03 78.7 128.52 78.7 128.52 92.89 238.22 92.89 238.22 78.7 268.96 78.7 300.27 78.7 300.27 73.85 300.27 62.26 268.96 62.26z',
        fill: 'rgba(196, 196, 207, 1)',
        type: 'path',
      },
    ],
    description: 'SVG path elements for the section',
  })
  element?: JsonValue;

  @ApiProperty({
    example: {
      x: 68.26,
      y: 62.26,
      width: 232.01,
      height: 30.63,
      rotate: 0,
      scaleX: 0,
      scaleY: 0,
    },
    description: 'Section attributes including position and dimensions',
  })
  attribute: JsonValue;

  @ApiProperty({ example: '1027771', description: 'Associated ticket type ID' })
  ticketTypeId?: string;

  @ApiProperty({ type: [RowDto], description: 'List of rows in the section' })
  Row?: RowDto[];
}

class SeatMapDto {
  @ApiProperty({ example: 180, description: 'Seatmap ID' })
  id: number;

  @ApiProperty({ example: 'SK Hồng Liên Q6 V3.svg', description: 'Seatmap name' })
  name: string;

  @ApiProperty({
    example: '2024-12-17T08:54:35.564Z',
    description: 'Seatmap creation date in ISO format',
  })
  createdAt: string;

  @ApiProperty({
    example: '0 0 368.69 359.88',
    description: 'SVG viewBox attribute defining the seatmap coordinate system',
  })
  viewBox: string;

  @ApiProperty({ example: 0, description: 'Seatmap status' })
  status: number;

  @ApiProperty({ type: [SectionDto], description: 'List of sections in the seatmap' })
  Section: SectionDto[];
}

export class SeatMapResponseDto {
  @ApiProperty({ example: 200, description: 'Response status code' })
  statusCode: number;

  @ApiProperty({
    example: 'Seat map retrieved successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ type: SeatMapDto, description: 'Seat map data' })
  data: SeatMapDto;
}

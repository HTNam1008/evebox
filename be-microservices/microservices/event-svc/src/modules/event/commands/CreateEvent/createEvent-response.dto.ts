import { ApiProperty } from "@nestjs/swagger";
import { ImagesResponseDto } from "src/modules/images/commands/images/images-response.dto";

export class EventDto {
  @ApiProperty({ example: 22911, description: 'Event ID' })
  id: number;

  @ApiProperty({
    example: 'SÂN KHẤU / ĐOÀN CẢI LƯƠNG THIÊN LONG - CAO QUÂN BẢO ĐẠI CHIẾN DƯ HỒNG (LƯU KIM ĐÍNH)',
    description: 'Event title',
  })
  title: string;

  @ApiProperty({
    example: 'Su kien ca nhac',
    description: 'Event description',
  })
  description: string;

  @ApiProperty({
    example: 'dattruong01082@gmail.com',
    description: 'Organizer email',
  })
  organizerId: string;

  @ApiProperty({
    example: 1,
    description: 'Location ID',
  })
  locationId: number;

  @ApiProperty({
    example: 1,
    description: 'Logo image ID',
  })
  imgLogoId: number;

  @ApiProperty({
    example: 1,
    description: 'Poster image ID',
  })
  imgPosterId: number;

  @ApiProperty({
    example: '2024-12-28T13:00:00.000Z',
    description: 'Event createAt in ISO format',
  })
  createAt: Date;

  @ApiProperty({
    example: false,
    description: 'Is only on eve',
  })
  isOnlyOnEve: boolean;

  @ApiProperty({
    example: false,
    description: 'Is special',
  })
  isSpecial: boolean;

  @ApiProperty({
    example: 50,
    description: 'Last score',
  })
  lastScore: number;

  @ApiProperty({
    example: 601,
    description: 'Total clicks',
  })
  totalClicks: number;

  @ApiProperty({
    example: 300,
    description: 'Weekly clicks',
  })
  weekClicks: number;

  @ApiProperty({
    example: 'Nha hat kick Idecaf',
    description: 'Venue',
  })
  venue: string;

  @ApiProperty({
    example: 'false',
    description: 'Is approved',
  })
  isApproved: boolean;

  @ApiProperty({
    example: 'Nha hat kich Sai Gon',
    description: 'Organizer Name',
  })
  orgDescription: string;

  @ApiProperty({
    example: 'Nha hat kich Sai Gon',
    description: 'Organizer Description',
  })
  orgName: string;

}

export class EventResponse{
  @ApiProperty({ example: 201, description: 'Status code' })
  statusCode: number;

  @ApiProperty({ example: 'Events created successfully', description: 'Message' })
  message: string;

  @ApiProperty({ type: [EventDto], description: 'Events data list' })
  data: EventDto[];
}
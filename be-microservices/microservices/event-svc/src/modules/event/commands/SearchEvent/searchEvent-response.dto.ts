import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

class ImageDto {
  @ApiProperty({ example: 132 })
  id: number;

  @ApiProperty({
    example: 'https://salt.tkbcdn.com/ts/ds/09/3e/43/696d99e34b89bfcf0c0f6a61195efd4c.jpg',
  })
  imageUrl: string;
}

class CategoryDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 'theatersandart' })
  name: string;
}

export class SearchEventResponseDto {
  @ApiProperty({ example: 22957 })
  id: number;

  @ApiProperty({ example: 'SÂN KHẤU THIÊN ĐĂNG : CHUYẾN ĐÒ ĐỊNH MỆNH' })
  title: string;

  @ApiProperty({ example: '2024-12-21T12:30:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: 50 })
  lastScore: Decimal;

  @ApiProperty({ example: 599999})
  minTicketPrice: number;

  @ApiProperty({ example: "book_now"})
  status: string;

  @ApiProperty({ type: ImageDto })
  Images_Events_imgLogoIdToImages: ImageDto;

  @ApiProperty({ type: ImageDto })
  Images_Events_imgPosterIdToImages: ImageDto;

  @ApiProperty({ type: [CategoryDto] })
  categories: CategoryDto[];
}

export class SearchEventResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Events found successfully' })
  message: string;

  @ApiProperty({ type: [SearchEventResponseDto] })
  data: SearchEventResponseDto[];
}

import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/shared/constants/baseResponse";

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

export class EventSpecialData {
  @ApiProperty({ example: 22691 })
  id: number;

  @ApiProperty({ example: 'SÂN KHẤU THIÊN ĐĂNG : NHỮNG CON MA NHÀ HÁT' })
  title: string;

  @ApiProperty({ type: ImageDto })
  Images_Events_imgPosterIdToImages: ImageDto;

  @ApiProperty({ example: true, description: 'Is event special?' })
  isSpecial: boolean;

  @ApiProperty({ example: true, description: 'Is event only on Evebox?' })
  isOnlyOnEve: boolean;

  @ApiProperty({ type: [CategoryDto], description: 'Is special in category?' })
  categoryIds: CategoryDto[];
}

export class EventSpecialRepsonseDto extends BaseResponse {
  @ApiProperty({ type: [EventSpecialData], description: 'Special events data' })
  data: EventSpecialData[]
}
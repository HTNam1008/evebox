import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({
    description: 'Location ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Street name',
    example: '123 Lê Lợi',
  })
  street: string;

  @ApiProperty({
    description: 'Ward',
    example: 'Phường 7',
  })
  ward: string;

  @ApiProperty({
    description: 'District name',
    example: 'Quận Gò Vấp',
  })
  district: string;

  @ApiProperty({
    description: 'Province name',
    example: 'Thành phố Hồ Chí Minh',
  })
  province: string;
}

export class GetAllLocationsResponseDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({
    example: 'Locations fetched successfully',
    description: 'Message about the fetch status',
  })
  message: string;

  @ApiProperty({
    type: [Location],
    description: 'List of locations with district and province names',
  })
  data: Location[];
}

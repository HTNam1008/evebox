import { ApiProperty } from '@nestjs/swagger';

class ImageDto {
  @ApiProperty({ example: 203 })
  id: number;

  @ApiProperty({ example: 'https://salt.tkbcdn.com/ts/ds/09/3e/43/f49f47a91a829333bec0e34298e54dae.jpg' })
  imageUrl: string;
}

class CategoryDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 'theatersandart' })
  name: string;
}

class provinceDto{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Hồ Chí Minh' })
  name: string;
}

class districtDto{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Quận 1' })
  name: string;

  @ApiProperty({ type: provinceDto })
  province: provinceDto;
}

class locationDto{
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '12 duong 3/2' })
  street: string;

  @ApiProperty({ example: 'Phường 12' })
  ward: string;

  @ApiProperty({ type: districtDto })
  districts: districtDto;
}

export class EventOrgDetailResponseDto {
  @ApiProperty({ example: 22691 })
  id: number;

  @ApiProperty({ example: 'SÂN KHẤU THIÊN ĐĂNG : NHỮNG CON MA NHÀ HÁT' })
  title: string;

  @ApiProperty({ example: '<p><strong>&#34;NHỮNG CON MA NHÀ HÁT&#34;</strong></p>...' })
  description: string;

  @ApiProperty({ example: 'Sân khấu Thien Dang' })
  venue: string;

  @ApiProperty({ type: ImageDto })
  Images_Events_imgLogoIdToImages: ImageDto;

  @ApiProperty({ type: ImageDto })
  Images_Events_imgPosterIdToImages: ImageDto;

  @ApiProperty({ example: '2024-12-17T07:57:23.528Z' })
  createdAt: Date;

  @ApiProperty({ type: [CategoryDto] })
  EventCategories: CategoryDto[];

  @ApiProperty({ example: false, description: 'Is approved' })
  isApproved: boolean;

  @ApiProperty({ example: "Nha hat kich Idecaf", description: 'Organizer name' })
  orgName: string;

  @ApiProperty({ example: 'Nha hat kich Idecaf', description: 'Organizer description' })
  orgDescription: string;

  @ApiProperty({ example: '2024-12-17T07:57:23.528Z' })
  deleteAt: Date;

  @ApiProperty({ type: locationDto })
  locations: locationDto;
}

export class EventOrgDetailResponse{
  @ApiProperty({example: 200, description: 'Status code'})
  statusCode: number;

  @ApiProperty({example: 'Event details retrieved successfully', description: 'Message'})
  message: string;

  @ApiProperty({type: EventOrgDetailResponseDto, description: 'Event details'})
  data: EventOrgDetailResponseDto;
}
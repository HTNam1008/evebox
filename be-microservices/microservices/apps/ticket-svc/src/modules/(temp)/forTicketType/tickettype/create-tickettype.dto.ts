// import { IsString, IsBoolean, IsInt, IsOptional, IsDate } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateTicketTypeDto {
//   @ApiProperty({ example: 'showing-123', description: 'ID của sự kiện liên kết' })
//   @IsString()
//   showingId: string;

//   @ApiProperty({ example: 'VIP', description: 'Tên loại vé' })
//   @IsString()
//   name: string;

//   @ApiProperty({ example: 'Ghế VIP khu vực A', description: 'Mô tả loại vé' })
//   @IsString()
//   description: string;

//   @ApiProperty({ example: '#FF5733', description: 'Mã màu đại diện loại vé' })
//   @IsString()
//   color: string;

//   @ApiProperty({ example: false, description: 'Vé có miễn phí không?' })
//   @IsBoolean()
//   isFree: boolean;

//   @ApiProperty({ example: 500000, description: 'Giá vé (VND)' })
//   @IsInt()
//   price: number;

//   @ApiProperty({ example: 600000, description: 'Giá vé gốc (nếu có khuyến mãi)' })
//   @IsInt()
//   originalPrice: number;

//   @ApiProperty({ example: 5, description: 'Số lượng tối đa mỗi đơn' })
//   @IsInt()
//   maxQtyPerOrder: number;

//   @ApiProperty({ example: 1, description: 'Số lượng tối thiểu mỗi đơn' })
//   @IsInt()
//   minQtyPerOrder: number;

//   @ApiProperty({ example: '2024-06-01T00:00:00.000Z', description: 'Thời gian bắt đầu hiệu lực' })
//   @IsDate()
//   effectiveFrom: Date;

//   @ApiProperty({ example: '2024-06-30T23:59:59.999Z', description: 'Thời gian kết thúc hiệu lực', required: false })
//   @IsOptional()
//   @IsDate()
//   effectiveTo?: Date;

//   @ApiProperty({ example: 1, description: 'Vị trí ưu tiên hiển thị' })
//   @IsInt()
//   position: number;

//   @ApiProperty({ example: 'active', description: 'Trạng thái loại vé' })
//   @IsString()
//   status: string;

//   @ApiProperty({ example: 'https://example.com/ticket-image.png', description: 'Hình ảnh loại vé', required: false })
//   @IsString()
//   imageUrl: string;

//   @ApiProperty({ example: false, description: 'Ẩn loại vé khỏi danh sách hiển thị', required: false })
//   @IsBoolean()
//   @IsOptional()
//   isHidden?: boolean;
// }
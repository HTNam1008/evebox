// import { PartialType } from '@nestjs/mapped-types';
// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { CreateTicketTypeDto } from './create-tickettype.dto';

// export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {
//   @ApiPropertyOptional({ example: 'showing-123', description: 'ID của sự kiện liên kết' })
//   showingId?: string;

//   @ApiPropertyOptional({ example: 'VIP', description: 'Tên loại vé' })
//   name?: string;

//   @ApiPropertyOptional({ example: 'Ghế VIP khu vực A', description: 'Mô tả loại vé' })
//   description?: string;

//   @ApiPropertyOptional({ example: '#FF5733', description: 'Mã màu đại diện loại vé' })
//   color?: string;

//   @ApiPropertyOptional({ example: false, description: 'Vé có miễn phí không?' })
//   isFree?: boolean;

//   @ApiPropertyOptional({ example: 500000, description: 'Giá vé (VND)' })
//   price?: number;

//   @ApiPropertyOptional({ example: 600000, description: 'Giá vé gốc (nếu có khuyến mãi)' })
//   originalPrice?: number;

//   @ApiPropertyOptional({ example: 5, description: 'Số lượng tối đa mỗi đơn' })
//   maxQtyPerOrder?: number;

//   @ApiPropertyOptional({ example: 1, description: 'Số lượng tối thiểu mỗi đơn' })
//   minQtyPerOrder?: number;

//   @ApiPropertyOptional({ example: '2024-06-01T00:00:00.000Z', description: 'Thời gian bắt đầu hiệu lực' })
//   effectiveFrom?: Date;

//   @ApiPropertyOptional({ example: '2024-06-30T23:59:59.999Z', description: 'Thời gian kết thúc hiệu lực' })
//   effectiveTo?: Date;

//   @ApiPropertyOptional({ example: 1, description: 'Vị trí ưu tiên hiển thị' })
//   position?: number;

//   @ApiPropertyOptional({ example: 'active', description: 'Trạng thái loại vé' })
//   status?: string;

//   @ApiPropertyOptional({ example: 'https://example.com/ticket-image.png', description: 'Hình ảnh loại vé' })
//   imageUrl?: string;

//   @ApiPropertyOptional({ example: false, description: 'Ẩn loại vé khỏi danh sách hiển thị' })
//   isHidden?: boolean;
// }
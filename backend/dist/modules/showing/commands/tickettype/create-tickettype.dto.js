"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTicketTypeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTicketTypeDto {
}
exports.CreateTicketTypeDto = CreateTicketTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'showing-123', description: 'ID của sự kiện liên kết' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "showingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'VIP', description: 'Tên loại vé' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ghế VIP khu vực A', description: 'Mô tả loại vé' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#FF5733', description: 'Mã màu đại diện loại vé' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Vé có miễn phí không?' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTicketTypeDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500000, description: 'Giá vé (VND)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTicketTypeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 600000, description: 'Giá vé gốc (nếu có khuyến mãi)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTicketTypeDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Số lượng tối đa mỗi đơn' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTicketTypeDto.prototype, "maxQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Số lượng tối thiểu mỗi đơn' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTicketTypeDto.prototype, "minQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-06-01T00:00:00.000Z', description: 'Thời gian bắt đầu hiệu lực' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateTicketTypeDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-06-30T23:59:59.999Z', description: 'Thời gian kết thúc hiệu lực', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateTicketTypeDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Vị trí ưu tiên hiển thị' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTicketTypeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active', description: 'Trạng thái loại vé' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/ticket-image.png', description: 'Hình ảnh loại vé', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTicketTypeDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Ẩn loại vé khỏi danh sách hiển thị', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTicketTypeDto.prototype, "isHidden", void 0);
//# sourceMappingURL=create-tickettype.dto.js.map
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
exports.UpdateTicketTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const create_tickettype_dto_1 = require("./create-tickettype.dto");
class UpdateTicketTypeDto extends (0, mapped_types_1.PartialType)(create_tickettype_dto_1.CreateTicketTypeDto) {
}
exports.UpdateTicketTypeDto = UpdateTicketTypeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'showing-123', description: 'ID của sự kiện liên kết' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "showingId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VIP', description: 'Tên loại vé' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ghế VIP khu vực A', description: 'Mô tả loại vé' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#FF5733', description: 'Mã màu đại diện loại vé' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Vé có miễn phí không?' }),
    __metadata("design:type", Boolean)
], UpdateTicketTypeDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500000, description: 'Giá vé (VND)' }),
    __metadata("design:type", Number)
], UpdateTicketTypeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 600000, description: 'Giá vé gốc (nếu có khuyến mãi)' }),
    __metadata("design:type", Number)
], UpdateTicketTypeDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Số lượng tối đa mỗi đơn' }),
    __metadata("design:type", Number)
], UpdateTicketTypeDto.prototype, "maxQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Số lượng tối thiểu mỗi đơn' }),
    __metadata("design:type", Number)
], UpdateTicketTypeDto.prototype, "minQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-06-01T00:00:00.000Z', description: 'Thời gian bắt đầu hiệu lực' }),
    __metadata("design:type", Date)
], UpdateTicketTypeDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-06-30T23:59:59.999Z', description: 'Thời gian kết thúc hiệu lực' }),
    __metadata("design:type", Date)
], UpdateTicketTypeDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Vị trí ưu tiên hiển thị' }),
    __metadata("design:type", Number)
], UpdateTicketTypeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'active', description: 'Trạng thái loại vé' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/ticket-image.png', description: 'Hình ảnh loại vé' }),
    __metadata("design:type", String)
], UpdateTicketTypeDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Ẩn loại vé khỏi danh sách hiển thị' }),
    __metadata("design:type", Boolean)
], UpdateTicketTypeDto.prototype, "isHidden", void 0);
//# sourceMappingURL=update-tickettype.dto.js.map
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
exports.TicketTypeResponseDto = exports.TicketTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TicketTypeDto {
}
exports.TicketTypeDto = TicketTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1027771', description: 'Ticket ID' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ĐÀO KÉP', description: 'Ticket name' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: 'Ticket description' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#c0fd71', description: 'Ticket color code' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is ticket free' }),
    __metadata("design:type", Boolean)
], TicketTypeDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500000, description: 'Ticket price' }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500000, description: 'Original ticket price' }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Maximum quantity per order' }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "maxQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Minimum quantity per order' }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "minQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-10-10T06:28:00.000Z',
        description: 'Effective start date in ISO format',
    }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-21T13:00:00.000Z',
        description: 'Effective end date in ISO format',
    }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Position in list' }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sold_out', description: 'Ticket status' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: 'Ticket image URL' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is ticket hidden' }),
    __metadata("design:type", Boolean)
], TicketTypeDto.prototype, "isHidden", void 0);
class TicketTypeResponseDto {
}
exports.TicketTypeResponseDto = TicketTypeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 201, description: 'Response status code' }),
    __metadata("design:type", Number)
], TicketTypeResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ticket types created successfully', description: 'Response message' }),
    __metadata("design:type", String)
], TicketTypeResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TicketTypeDto], description: 'Ticket types' }),
    __metadata("design:type", Array)
], TicketTypeResponseDto.prototype, "data", void 0);
//# sourceMappingURL=tickettype-response.dto.js.map
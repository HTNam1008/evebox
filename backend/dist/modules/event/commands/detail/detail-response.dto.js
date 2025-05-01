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
exports.EventDetailResponse = exports.EventDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 203 }),
    __metadata("design:type", Number)
], ImageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://salt.tkbcdn.com/ts/ds/09/3e/43/f49f47a91a829333bec0e34298e54dae.jpg' }),
    __metadata("design:type", String)
], ImageDto.prototype, "imageUrl", void 0);
class TicketTypeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1030527' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'THƯỜNG' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: 'Description of the ticket type' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#86f0ff' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TicketTypeDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 330000 }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 330000 }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "maxQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "minQtyPerOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-14T03:00:00.000Z' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "effectiveFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-27T12:30:00.000Z' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "effectiveTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], TicketTypeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'book_now' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    __metadata("design:type", String)
], TicketTypeDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], TicketTypeDto.prototype, "isHidden", void 0);
class ShowingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '97930557637546' }),
    __metadata("design:type", String)
], ShowingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22691 }),
    __metadata("design:type", Number)
], ShowingDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'book_now' }),
    __metadata("design:type", String)
], ShowingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ShowingDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ShowingDto.prototype, "isSalable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ShowingDto.prototype, "isPresale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 39 }),
    __metadata("design:type", Number)
], ShowingDto.prototype, "seatMapId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-27T12:30:00.000Z' }),
    __metadata("design:type", String)
], ShowingDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-27T15:30:00.000Z' }),
    __metadata("design:type", String)
], ShowingDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], ShowingDto.prototype, "isEnabledQueueWaiting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ShowingDto.prototype, "showAllSeats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TicketTypeDto] }),
    __metadata("design:type", Array)
], ShowingDto.prototype, "TicketType", void 0);
class CategoryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], CategoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'theatersandart' }),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
class EventDetailResponseDto {
}
exports.EventDetailResponseDto = EventDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22691 }),
    __metadata("design:type", Number)
], EventDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SÂN KHẤU THIÊN ĐĂNG : NHỮNG CON MA NHÀ HÁT' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '<p><strong>&#34;NHỮNG CON MA NHÀ HÁT&#34;</strong></p>...' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-27T12:30:00.000Z' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-27T12:30:00.000Z' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Number)
], EventDetailResponseDto.prototype, "organizerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'book_now' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], EventDetailResponseDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sân khấu Thien Dang' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ImageDto }),
    __metadata("design:type", ImageDto)
], EventDetailResponseDto.prototype, "Images_Events_imgLogoIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ImageDto }),
    __metadata("design:type", ImageDto)
], EventDetailResponseDto.prototype, "Images_Events_imgPosterIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-17T07:57:23.528Z' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '62 Trần Quang Khải, Tan Dinh Ward, 1 District, Ho Chi Minh City' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "locationsString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50' }),
    __metadata("design:type", String)
], EventDetailResponseDto.prototype, "lastScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], EventDetailResponseDto.prototype, "isSpecial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], EventDetailResponseDto.prototype, "isOnlyOnEve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CategoryDto] }),
    __metadata("design:type", Array)
], EventDetailResponseDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ShowingDto] }),
    __metadata("design:type", Array)
], EventDetailResponseDto.prototype, "showing", void 0);
class EventDetailResponse {
}
exports.EventDetailResponse = EventDetailResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Status code' }),
    __metadata("design:type", Number)
], EventDetailResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Event details retrieved successfully', description: 'Message' }),
    __metadata("design:type", String)
], EventDetailResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: EventDetailResponseDto, description: 'Event details' }),
    __metadata("design:type", EventDetailResponseDto)
], EventDetailResponse.prototype, "data", void 0);
//# sourceMappingURL=detail-response.dto.js.map
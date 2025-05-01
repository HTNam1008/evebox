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
exports.EventSearchResponse = exports.EventSearchResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 132 }),
    __metadata("design:type", Number)
], ImageDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://salt.tkbcdn.com/ts/ds/09/3e/43/696d99e34b89bfcf0c0f6a61195efd4c.jpg',
    }),
    __metadata("design:type", String)
], ImageDto.prototype, "imageUrl", void 0);
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
class EventSearchResponseDto {
}
exports.EventSearchResponseDto = EventSearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22957 }),
    __metadata("design:type", Number)
], EventSearchResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SÂN KHẤU THIÊN ĐĂNG : CHUYẾN ĐÒ ĐỊNH MỆNH' }),
    __metadata("design:type", String)
], EventSearchResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-21T12:30:00.000Z' }),
    __metadata("design:type", String)
], EventSearchResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-21T12:30:00.000Z' }),
    __metadata("design:type", String)
], EventSearchResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50' }),
    __metadata("design:type", String)
], EventSearchResponseDto.prototype, "lastScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ImageDto }),
    __metadata("design:type", ImageDto)
], EventSearchResponseDto.prototype, "Images_Events_imgLogoIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ImageDto }),
    __metadata("design:type", ImageDto)
], EventSearchResponseDto.prototype, "Images_Events_imgPosterIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CategoryDto] }),
    __metadata("design:type", Array)
], EventSearchResponseDto.prototype, "categories", void 0);
class EventSearchResponse {
}
exports.EventSearchResponse = EventSearchResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], EventSearchResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Events found successfully' }),
    __metadata("design:type", String)
], EventSearchResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EventSearchResponseDto] }),
    __metadata("design:type", Array)
], EventSearchResponse.prototype, "data", void 0);
//# sourceMappingURL=search-response.dto.js.map
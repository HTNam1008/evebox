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
exports.ImagesResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImagesResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], ImagesResponseData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image URL',
        example: 'https://example.com/image.jpg',
    }),
    __metadata("design:type", String)
], ImagesResponseData.prototype, "imageUrl", void 0);
class ImagesResponseDto {
}
exports.ImagesResponseDto = ImagesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], ImagesResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Image operation successful',
        description: 'Success message',
    }),
    __metadata("design:type", String)
], ImagesResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ImagesResponseData,
    }),
    __metadata("design:type", ImagesResponseData)
], ImagesResponseDto.prototype, "data", void 0);
//# sourceMappingURL=images-response.dto.js.map
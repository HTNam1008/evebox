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
exports.CategoriesResponse = exports.CategoriesResponseDto = exports.CreateCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Electronics',
        description: 'The name of the category to be created',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
class CategoriesResponseDto {
}
exports.CategoriesResponseDto = CategoriesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'The ID of the category' }),
    __metadata("design:type", Number)
], CategoriesResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nature', description: 'The name of the category' }),
    __metadata("design:type", String)
], CategoriesResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-09-01T00:00:00.000Z', description: 'The date the category was created' }),
    __metadata("design:type", Date)
], CategoriesResponseDto.prototype, "createdAt", void 0);
class CategoriesResponse {
}
exports.CategoriesResponse = CategoriesResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'The status code of the response' }),
    __metadata("design:type", Number)
], CategoriesResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Categories retrieved successfully', description: 'The status message of the response' }),
    __metadata("design:type", String)
], CategoriesResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CategoriesResponseDto], description: 'The data of the response' }),
    __metadata("design:type", Array)
], CategoriesResponse.prototype, "data", void 0);
//# sourceMappingURL=categories-response.dto.js.map
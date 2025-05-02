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
exports.GoogleLoginResponse = exports.GoogleLoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GoogleLoginDto {
}
exports.GoogleLoginDto = GoogleLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'User\'s full name from Google'
    }),
    __metadata("design:type", String)
], GoogleLoginDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'johndoe',
        description: 'Username from Google'
    }),
    __metadata("design:type", String)
], GoogleLoginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@gmail.com',
        description: 'User\'s email from Google'
    }),
    __metadata("design:type", String)
], GoogleLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://lh3.googleusercontent.com/a/avatar',
        description: 'Google profile avatar URL'
    }),
    __metadata("design:type", String)
], GoogleLoginDto.prototype, "avatar", void 0);
class GoogleLoginResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], GoogleLoginResponseData.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], GoogleLoginResponseData.prototype, "refresh_token", void 0);
class GoogleLoginResponse {
}
exports.GoogleLoginResponse = GoogleLoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], GoogleLoginResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'User logged in successfully',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], GoogleLoginResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: GoogleLoginResponseData
    }),
    __metadata("design:type", GoogleLoginResponseData)
], GoogleLoginResponse.prototype, "data", void 0);
//# sourceMappingURL=google-login.dto.js.map
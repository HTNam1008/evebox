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
exports.LoginResponse = exports.LoginUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'User email address'
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'User password (min 6 characters)'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
class LoginResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT access token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], LoginResponseData.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], LoginResponseData.prototype, "refresh_token", void 0);
class LoginResponse {
}
exports.LoginResponse = LoginResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], LoginResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Login successful',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: LoginResponseData
    }),
    __metadata("design:type", LoginResponseData)
], LoginResponse.prototype, "data", void 0);
//# sourceMappingURL=login-user.dto.js.map
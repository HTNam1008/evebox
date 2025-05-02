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
exports.RegisterResponse = exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterUserDto {
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'User full name'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john@example.com',
        description: 'User email address'
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'User password (min 6 characters)'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'password123',
        description: 'Confirm password'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "re_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0123456789',
        description: 'Phone number (10 digits)'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 10),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'User role ID'
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RegisterUserDto.prototype, "role_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
        description: 'Array of province IDs',
        required: false,
        type: [Number]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], RegisterUserDto.prototype, "province_id", void 0);
class RegisterResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Request token for OTP verification',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], RegisterResponseData.prototype, "request_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of remaining OTP attempts',
        example: 3
    }),
    __metadata("design:type", Number)
], RegisterResponseData.prototype, "remaining_attempts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time until next OTP resend allowed (seconds)',
        example: 300
    }),
    __metadata("design:type", Number)
], RegisterResponseData.prototype, "resend_allowed_in", void 0);
class RegisterResponse {
}
exports.RegisterResponse = RegisterResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], RegisterResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OTP has been sent to your email',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], RegisterResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: RegisterResponseData
    }),
    __metadata("design:type", RegisterResponseData)
], RegisterResponse.prototype, "data", void 0);
//# sourceMappingURL=register-user.dto.js.map
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
exports.VerifyOTPResponse = exports.VerifyOTPDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const otp_type_enum_1 = require("../../../domain/enums/otp-type.enum");
class VerifyOTPDto {
}
exports.VerifyOTPDto = VerifyOTPDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'User email address',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'OTP code (6 digits)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: otp_type_enum_1.OTPType,
        example: otp_type_enum_1.OTPType.FORGOT_PASSWORD,
        description: 'Type of OTP verification',
    }),
    (0, class_validator_1.IsEnum)(otp_type_enum_1.OTPType),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'token',
        description: 'Request token',
    }),
    __metadata("design:type", String)
], VerifyOTPDto.prototype, "request_token", void 0);
class VerifyOTPResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Verification token or user ID depending on OTP type',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        required: false,
        nullable: true
    }),
    __metadata("design:type", String)
], VerifyOTPResponseData.prototype, "token", void 0);
class VerifyOTPResponse {
}
exports.VerifyOTPResponse = VerifyOTPResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], VerifyOTPResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Email verified successfully. You can now complete registration',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], VerifyOTPResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: VerifyOTPResponseData
    }),
    __metadata("design:type", VerifyOTPResponseData)
], VerifyOTPResponse.prototype, "data", void 0);
//# sourceMappingURL=verify-otp.dto.js.map
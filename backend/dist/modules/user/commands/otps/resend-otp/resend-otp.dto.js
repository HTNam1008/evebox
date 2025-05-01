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
exports.ResendOTPResponse = exports.ResendOTPDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const otp_type_enum_1 = require("../../../domain/enums/otp-type.enum");
class ResendOTPDto {
}
exports.ResendOTPDto = ResendOTPDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResendOTPDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: otp_type_enum_1.OTPType }),
    (0, class_validator_1.IsEnum)(otp_type_enum_1.OTPType),
    __metadata("design:type", String)
], ResendOTPDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'token123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResendOTPDto.prototype, "request_token", void 0);
class ResendOTPResponse {
}
exports.ResendOTPResponse = ResendOTPResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], ResendOTPResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OTP resent successfully',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], ResendOTPResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            remaining_attempts: 3,
            resend_allowed_in: 300
        },
        description: 'OTP details'
    }),
    __metadata("design:type", Object)
], ResendOTPResponse.prototype, "data", void 0);
//# sourceMappingURL=resend-otp.dto.js.map
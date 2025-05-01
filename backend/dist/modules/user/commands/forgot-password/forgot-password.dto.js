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
exports.ForgotPasswordResponse = exports.ForgotPasswordUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ForgotPasswordUserDto {
}
exports.ForgotPasswordUserDto = ForgotPasswordUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'Email address for password reset'
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ForgotPasswordUserDto.prototype, "email", void 0);
class ForgotPasswordResponseData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Request token for OTP verification',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }),
    __metadata("design:type", String)
], ForgotPasswordResponseData.prototype, "request_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of attempts remaining',
        example: 5
    }),
    __metadata("design:type", Number)
], ForgotPasswordResponseData.prototype, "remaining_attempts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time remaining until next resend allowed (in seconds)',
        example: 60
    }),
    __metadata("design:type", Number)
], ForgotPasswordResponseData.prototype, "resend_allowed_in", void 0);
class ForgotPasswordResponse {
}
exports.ForgotPasswordResponse = ForgotPasswordResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], ForgotPasswordResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OTP has been sent to your email',
        description: 'Success message'
    }),
    __metadata("design:type", String)
], ForgotPasswordResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: ForgotPasswordResponseData
    }),
    __metadata("design:type", ForgotPasswordResponseData)
], ForgotPasswordResponse.prototype, "data", void 0);
//# sourceMappingURL=forgot-password.dto.js.map
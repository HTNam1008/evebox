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
exports.UserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'User unique identifier',
    }),
    __metadata("design:type", String)
], UserData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'John Doe',
        description: 'User full name',
    }),
    __metadata("design:type", String)
], UserData.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'john@example.com',
        description: 'User email address',
    }),
    __metadata("design:type", String)
], UserData.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 2,
        description: 'User role ID',
    }),
    __metadata("design:type", Number)
], UserData.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '0123456789',
        description: 'User phone number',
    }),
    __metadata("design:type", String)
], UserData.prototype, "phone", void 0);
class UserResponse {
}
exports.UserResponse = UserResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], UserResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'User details fetched successfully',
        description: 'Success message',
    }),
    __metadata("design:type", String)
], UserResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => UserData,
    }),
    __metadata("design:type", UserData)
], UserResponse.prototype, "data", void 0);
//# sourceMappingURL=get-user.dto.js.map
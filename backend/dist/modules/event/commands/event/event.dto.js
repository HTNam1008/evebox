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
exports.UpdateEventDto = exports.CreateEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tech Conference 2025', description: 'Title of the event' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A technology conference for developers', description: 'Event description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01T09:00:00.000Z', description: 'Event start date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-03T18:00:00.000Z', description: 'Event end date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateEventDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Organizer ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "organizerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active', description: 'Status of the event' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Province ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'District ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Phuong 3", description: 'Ward String' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "wardString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "San khau Thien Dang", description: 'Venue String' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10 To Hien Thanh", description: 'Location String' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "locationString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], description: 'Array of category IDs', required: true }),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateEventDto.prototype, "categoryIds", void 0);
class UpdateEventDto {
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Conference Title', description: 'Updated event title', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated event description', description: 'Updated event description', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-07-01T10:00:00.000Z', description: 'Updated event start date', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-07-03T20:00:00.000Z', description: 'Updated event end date', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateEventDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'canceled', description: 'Updated status of the event', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Province ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'District ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Phuong 3", description: 'Ward String' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "wardString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "10 To Hien Thanh", description: 'Location String' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "locationString", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 110, description: 'Updated logo image ID', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "imgLogoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120, description: 'Updated poster image ID', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateEventDto.prototype, "imgPosterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2], description: 'Array of category IDs', required: true }),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], UpdateEventDto.prototype, "categoryIds", void 0);
//# sourceMappingURL=event.dto.js.map
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
exports.EventResponse = exports.EventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const images_response_dto_1 = require("../../../images/commands/images/images-response.dto");
class EventDto {
}
exports.EventDto = EventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22911, description: 'Event ID' }),
    __metadata("design:type", Number)
], EventDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SÂN KHẤU / ĐOÀN CẢI LƯƠNG THIÊN LONG - CAO QUÂN BẢO ĐẠI CHIẾN DƯ HỒNG (LƯU KIM ĐÍNH)',
        description: 'Event title',
    }),
    __metadata("design:type", String)
], EventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-28T13:00:00.000Z',
        description: 'Event start date in ISO format',
    }),
    __metadata("design:type", String)
], EventDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'select_showing', description: 'Event status' }),
    __metadata("design:type", String)
], EventDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50', description: 'Last score' }),
    __metadata("design:type", String)
], EventDto.prototype, "lastScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: images_response_dto_1.ImagesResponseDto, description: 'Event logo image' }),
    __metadata("design:type", images_response_dto_1.ImagesResponseDto)
], EventDto.prototype, "Images_Events_imgLogoIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: images_response_dto_1.ImagesResponseDto, description: 'Event poster image' }),
    __metadata("design:type", images_response_dto_1.ImagesResponseDto)
], EventDto.prototype, "Images_Events_imgPosterIdToImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 601, description: 'Total clicks' }),
    __metadata("design:type", Number)
], EventDto.prototype, "totalClicks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300, description: 'Weekly clicks' }),
    __metadata("design:type", Number)
], EventDto.prototype, "weekClicks", void 0);
class EventResponse {
}
exports.EventResponse = EventResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Status code' }),
    __metadata("design:type", Number)
], EventResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Events retrieved successfully', description: 'Message' }),
    __metadata("design:type", String)
], EventResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EventDto], description: 'Events data list' }),
    __metadata("design:type", Array)
], EventResponse.prototype, "data", void 0);
//# sourceMappingURL=event-response.dto.js.map
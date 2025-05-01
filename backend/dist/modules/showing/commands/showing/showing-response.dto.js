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
exports.SeatMapResponseDto = exports.AllShowingsResponseDto = exports.ShowingResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const event_response_dto_1 = require("../../../event/commands/event/event-response.dto");
const tickettype_response_dto_1 = require("../tickettype/tickettype-response.dto");
class ShowingDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '16962844867169', description: 'Showing ID' }),
    __metadata("design:type", String)
], ShowingDataDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22911, description: 'Event ID' }),
    __metadata("design:type", Number)
], ShowingDataDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'book_now', description: 'Showing status' }),
    __metadata("design:type", String)
], ShowingDataDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is the event free' }),
    __metadata("design:type", Boolean)
], ShowingDataDto.prototype, "isFree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is ticket salable' }),
    __metadata("design:type", Boolean)
], ShowingDataDto.prototype, "isSalable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is presale available' }),
    __metadata("design:type", Boolean)
], ShowingDataDto.prototype, "isPresale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'Seat map ID' }),
    __metadata("design:type", Number)
], ShowingDataDto.prototype, "seatMapId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-28T13:00:00.000Z',
        description: 'Start time of the showing in ISO format',
    }),
    __metadata("design:type", String)
], ShowingDataDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-28T16:00:00.000Z',
        description: 'End time of the showing in ISO format',
    }),
    __metadata("design:type", String)
], ShowingDataDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is queue waiting enabled' }),
    __metadata("design:type", Boolean)
], ShowingDataDto.prototype, "isEnabledQueueWaiting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Show all seats' }),
    __metadata("design:type", Boolean)
], ShowingDataDto.prototype, "showAllSeats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: event_response_dto_1.EventDto, description: 'Event details' }),
    __metadata("design:type", event_response_dto_1.EventDto)
], ShowingDataDto.prototype, "Events", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [tickettype_response_dto_1.TicketTypeDto], description: 'List of available ticket types' }),
    __metadata("design:type", Array)
], ShowingDataDto.prototype, "TicketType", void 0);
class ShowingResponseDto {
}
exports.ShowingResponseDto = ShowingResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Response status code' }),
    __metadata("design:type", Number)
], ShowingResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Showing data retrieved successfully',
        description: 'Response message',
    }),
    __metadata("design:type", String)
], ShowingResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShowingDataDto, description: 'Showing data' }),
    __metadata("design:type", ShowingDataDto)
], ShowingResponseDto.prototype, "data", void 0);
class AllShowingsResponseDto {
}
exports.AllShowingsResponseDto = AllShowingsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Response status code' }),
    __metadata("design:type", Number)
], AllShowingsResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Showing data retrieved successfully',
        description: 'Response message',
    }),
    __metadata("design:type", String)
], AllShowingsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '16962844867169,16962844867170',
        description: 'Comma-separated string of Showing IDs',
    }),
    __metadata("design:type", Object)
], AllShowingsResponseDto.prototype, "data", void 0);
class SeatDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 219546, description: 'Seat ID' }),
    __metadata("design:type", Number)
], SeatDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'Seat name' }),
    __metadata("design:type", String)
], SeatDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16951, description: 'Row ID' }),
    __metadata("design:type", Number)
], SeatDto.prototype, "rowId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Seat position' }),
    __metadata("design:type", Number)
], SeatDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { '0': 201.73 }, description: 'X position of the seat' }),
    __metadata("design:type", Object)
], SeatDto.prototype, "positionX", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { '0': 84.84 }, description: 'Y position of the seat' }),
    __metadata("design:type", Object)
], SeatDto.prototype, "positionY", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-17T10:06:33.889Z',
        description: 'Seat creation date in ISO format',
    }),
    __metadata("design:type", String)
], SeatDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Seat status' }),
    __metadata("design:type", Number)
], SeatDto.prototype, "status", void 0);
class RowDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16951, description: 'Row ID' }),
    __metadata("design:type", Number)
], RowDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'B', description: 'Row name' }),
    __metadata("design:type", String)
], RowDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000, description: 'Section ID' }),
    __metadata("design:type", Number)
], RowDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-17T10:06:32.777Z',
        description: 'Row creation date in ISO format',
    }),
    __metadata("design:type", String)
], RowDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SeatDto], description: 'List of seats in the row' }),
    __metadata("design:type", Array)
], RowDto.prototype, "Seat", void 0);
class SectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2000, description: 'Section ID' }),
    __metadata("design:type", Number)
], SectionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUPER_VIP', description: 'Section name' }),
    __metadata("design:type", String)
], SectionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'Seatmap ID' }),
    __metadata("design:type", Number)
], SectionDto.prototype, "seatmapId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-17T10:06:31.718Z',
        description: 'Section creation date in ISO format',
    }),
    __metadata("design:type", String)
], SectionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Is this section the stage' }),
    __metadata("design:type", Boolean)
], SectionDto.prototype, "isStage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                x: 0,
                y: 0,
                data: 'M268.96 62.26 99.02 62.26 97.72 62.26 68.26 62.26 68.26 73.85 68.26 78.7 97.72 78.7 99.03 78.7 128.52 78.7 128.52 92.89 238.22 92.89 238.22 78.7 268.96 78.7 300.27 78.7 300.27 73.85 300.27 62.26 268.96 62.26z',
                fill: 'rgba(196, 196, 207, 1)',
                type: 'path',
            },
        ],
        description: 'SVG path elements for the section',
    }),
    __metadata("design:type", Object)
], SectionDto.prototype, "element", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            x: 68.26,
            y: 62.26,
            width: 232.01,
            height: 30.63,
            rotate: 0,
            scaleX: 0,
            scaleY: 0,
        },
        description: 'Section attributes including position and dimensions',
    }),
    __metadata("design:type", Object)
], SectionDto.prototype, "attribute", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1027771', description: 'Associated ticket type ID' }),
    __metadata("design:type", String)
], SectionDto.prototype, "ticketTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RowDto], description: 'List of rows in the section' }),
    __metadata("design:type", Array)
], SectionDto.prototype, "Row", void 0);
class SeatMapDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180, description: 'Seatmap ID' }),
    __metadata("design:type", Number)
], SeatMapDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SK Hồng Liên Q6 V3.svg', description: 'Seatmap name' }),
    __metadata("design:type", String)
], SeatMapDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-17T08:54:35.564Z',
        description: 'Seatmap creation date in ISO format',
    }),
    __metadata("design:type", String)
], SeatMapDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0 0 368.69 359.88',
        description: 'SVG viewBox attribute defining the seatmap coordinate system',
    }),
    __metadata("design:type", String)
], SeatMapDto.prototype, "viewBox", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Seatmap status' }),
    __metadata("design:type", Number)
], SeatMapDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SectionDto], description: 'List of sections in the seatmap' }),
    __metadata("design:type", Array)
], SeatMapDto.prototype, "Section", void 0);
class SeatMapResponseDto {
}
exports.SeatMapResponseDto = SeatMapResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Response status code' }),
    __metadata("design:type", Number)
], SeatMapResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Seat map retrieved successfully',
        description: 'Response message',
    }),
    __metadata("design:type", String)
], SeatMapResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SeatMapDto, description: 'Seat map data' }),
    __metadata("design:type", SeatMapDto)
], SeatMapResponseDto.prototype, "data", void 0);
//# sourceMappingURL=showing-response.dto.js.map
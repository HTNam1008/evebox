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
exports.FrontDisplayResponse = exports.EventFrontDisplayDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const event_response_dto_1 = require("../event/event-response.dto");
const categories_response_dto_1 = require("../categories/categories-response.dto");
class eventCategoriesSpectial {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: categories_response_dto_1.CategoriesResponseDto, description: 'Category' }),
    __metadata("design:type", categories_response_dto_1.CategoriesResponseDto)
], eventCategoriesSpectial.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [event_response_dto_1.EventDto], description: 'Events' }),
    __metadata("design:type", Array)
], eventCategoriesSpectial.prototype, "events", void 0);
class EventFrontDisplayDTO {
}
exports.EventFrontDisplayDTO = EventFrontDisplayDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [event_response_dto_1.EventDto], description: 'Special events' }),
    __metadata("design:type", Array)
], EventFrontDisplayDTO.prototype, "specialEvents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [event_response_dto_1.EventDto], description: 'Trending events' }),
    __metadata("design:type", Array)
], EventFrontDisplayDTO.prototype, "trendingEvents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [event_response_dto_1.EventDto], description: 'Only on eve events' }),
    __metadata("design:type", Array)
], EventFrontDisplayDTO.prototype, "onlyOnEve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [eventCategoriesSpectial], description: 'Categories Special events' }),
    __metadata("design:type", Array)
], EventFrontDisplayDTO.prototype, "categorySpecial", void 0);
class FrontDisplayResponse {
}
exports.FrontDisplayResponse = FrontDisplayResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Status code' }),
    __metadata("design:type", Number)
], FrontDisplayResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Front display data retrieved successfully', description: 'Message' }),
    __metadata("design:type", String)
], FrontDisplayResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: EventFrontDisplayDTO, description: 'Front display data' }),
    __metadata("design:type", EventFrontDisplayDTO)
], FrontDisplayResponse.prototype, "data", void 0);
//# sourceMappingURL=front-display-response.dto.js.map
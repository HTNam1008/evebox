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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailController = void 0;
const common_1 = require("@nestjs/common");
const detail_service_1 = require("./detail.service");
const swagger_1 = require("@nestjs/swagger");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const detail_response_dto_1 = require("./detail-response.dto");
const event_response_dto_1 = require("../event/event-response.dto");
let EventDetailController = class EventDetailController {
    constructor(eventDetailService) {
        this.eventDetailService = eventDetailService;
    }
    async getEventDetail(eventId, res) {
        const result = await this.eventDetailService.execute(parseInt(eventId));
        if (result.isErr()) {
            const error = result.unwrapErr();
            return res
                .status(error.message === "Event not found." ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST)
                .json(error.message === "Event not found." ? error_handler_1.ErrorHandler.notFound(result.unwrapErr().message) : error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Event details retrieved successfully',
            data,
        });
    }
    async getRecommendedEventsInDetail(eventId, limit, res) {
        const result = await this.eventDetailService.getRecommendedEventsInDetail(parseInt(eventId), limit);
        if (result.isErr()) {
            const error = result.unwrapErr();
            return res
                .status(error.message === "Event not found." ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST)
                .json(error.message === "Event not found." ? error_handler_1.ErrorHandler.notFound(result.unwrapErr().message) : error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Recommended events retrieved successfully',
            data,
        });
    }
    async postClicks(eventId, res) {
        const result = await this.eventDetailService.postClicks(parseInt(eventId));
        if (result.isErr()) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Click count updated successfully',
            data,
        });
    }
};
exports.EventDetailController = EventDetailController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get event details' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Event details retrieved successfully',
        type: detail_response_dto_1.EventDetailResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Event not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Query)('eventId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventDetailController.prototype, "getEventDetail", null);
__decorate([
    (0, common_1.Get)('/recommended-events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recommended events' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Recommended events retrieved successfully',
        type: event_response_dto_1.EventResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Event not found',
    }),
    __param(0, (0, common_1.Query)('eventId')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EventDetailController.prototype, "getRecommendedEventsInDetail", null);
__decorate([
    (0, common_1.Post)('/clicks'),
    (0, swagger_1.ApiOperation)({ summary: 'Increment event clicks' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Click count updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input',
    }),
    __param(0, (0, common_1.Query)('eventId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventDetailController.prototype, "postClicks", null);
exports.EventDetailController = EventDetailController = __decorate([
    (0, common_1.Controller)('api/event/detail'),
    __metadata("design:paramtypes", [detail_service_1.EventDetailService])
], EventDetailController);
//# sourceMappingURL=detail.controller.js.map
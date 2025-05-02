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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const event_service_1 = require("./event.service");
const event_dto_1 = require("./event.dto");
const swagger_1 = require("@nestjs/swagger");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
let EventController = class EventController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async createEvent(createEventDto, files, res) {
        const result = await this.eventsService.createEvent(createEventDto, files);
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        return res.status(common_1.HttpStatus.CREATED).json({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Event created successfully',
            data: result.unwrap(),
        });
    }
    async updateEvent(id, updateEventDto, files, res) {
        const result = await this.eventsService.updateEvent(Number(id), updateEventDto, files);
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Event updated successfully',
            data: result.unwrap(),
        });
    }
    async deleteEvent(id, res) {
        const result = await this.eventsService.deleteEvent(Number(id));
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json(error_handler_1.ErrorHandler.notFound(result.unwrapErr().message));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Event deleted successfully',
        });
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new event' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Event created successfully' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.CreateEventDto, Array, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update event by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Event updated successfully' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, event_dto_1.UpdateEventDto, Array, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete event by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Event deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('api/events'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map
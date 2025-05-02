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
exports.ShowingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const showing_service_1 = require("./showing.service");
const showing_response_dto_1 = require("./showing-response.dto");
let ShowingController = class ShowingController {
    constructor(showingService) {
        this.showingService = showingService;
    }
    async getShowing(showingId, res) {
        const result = await this.showingService.execute(showingId);
        if (result.isErr()) {
            const error = result.unwrapErr();
            return res
                .status(error.message === "Showing not found." ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST)
                .json(error.message === "Showing not found." ? error_handler_1.ErrorHandler.notFound(result.unwrapErr().message) : error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Showing data retrieved successfully',
            data,
        });
    }
    async getSeatMap(showingId, res) {
        const result = await this.showingService.getSeatMap(showingId);
        if (result.isErr()) {
            const error = result.unwrapErr();
            return res
                .status(error.message === "Seat map not found." ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.BAD_REQUEST)
                .json(error.message === "Seat map not found." ? error_handler_1.ErrorHandler.notFound(result.unwrapErr().message) : error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Seat map retrieved successfully',
            data,
        });
    }
    async getAllShowings(res) {
        const result = await this.showingService.getAllShowings();
        if (result.isErr()) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: result.unwrapErr().message,
            });
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'All showings retrieved successfully',
            data,
        });
    }
};
exports.ShowingController = ShowingController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get showing data' }),
    (0, swagger_1.ApiQuery)({
        name: 'showingId',
        required: true,
        example: '16962844867169',
        description: 'The ID of the showing to retrieve',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Showing data retrieved successfully',
        type: showing_response_dto_1.ShowingResponseDto,
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
    __param(0, (0, common_1.Query)('showingId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShowingController.prototype, "getShowing", null);
__decorate([
    (0, common_1.Get)('/seatmap'),
    (0, swagger_1.ApiOperation)({ summary: 'Get seat map' }),
    (0, swagger_1.ApiQuery)({
        name: 'showingId',
        required: true,
        example: '16962844867169',
        description: 'The ID of the showing to retrieve',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Seat map retrieved successfully',
        type: showing_response_dto_1.SeatMapResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Seat map not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Query)('showingId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShowingController.prototype, "getSeatMap", null);
__decorate([
    (0, common_1.Get)('/all-showings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all showings' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'All showings retrieved successfully',
        type: showing_response_dto_1.AllShowingsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Showing not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShowingController.prototype, "getAllShowings", null);
exports.ShowingController = ShowingController = __decorate([
    (0, common_1.Controller)('api/showing'),
    __metadata("design:paramtypes", [showing_service_1.ShowingService])
], ShowingController);
//# sourceMappingURL=showing.controller.js.map
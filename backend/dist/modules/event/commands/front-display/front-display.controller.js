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
exports.FrontDisplayController = void 0;
const common_1 = require("@nestjs/common");
const front_display_service_1 = require("./front-display.service");
const swagger_1 = require("@nestjs/swagger");
const event_response_dto_1 = require("../event/event-response.dto");
const front_display_response_dto_1 = require("./front-display-response.dto");
let FrontDisplayController = class FrontDisplayController {
    constructor(frontDisplayService) {
        this.frontDisplayService = frontDisplayService;
    }
    async getFrontDisplay(res) {
        const result = await this.frontDisplayService.execute();
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
            message: 'Front display data retrieved successfully',
            data,
        });
    }
    async getRecommendedEvents(timeWindow, res) {
        const result = await this.frontDisplayService.getRecommendedEvents(timeWindow);
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
            message: 'Recommended events retrieved successfully',
            data,
        });
    }
};
exports.FrontDisplayController = FrontDisplayController;
__decorate([
    (0, common_1.Get)('/front-display'),
    (0, swagger_1.ApiOperation)({ summary: 'Get front display data' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Front display data retrieved successfully',
        type: front_display_response_dto_1.FrontDisplayResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Fetch front display data failed',
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FrontDisplayController.prototype, "getFrontDisplay", null);
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
    (0, swagger_1.ApiQuery)({
        name: 'timeWindow',
        enum: ['week', 'month'],
        required: true,
        description: 'Time window for recommended events (week or month)',
    }),
    __param(0, (0, common_1.Query)('timeWindow')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FrontDisplayController.prototype, "getRecommendedEvents", null);
exports.FrontDisplayController = FrontDisplayController = __decorate([
    (0, common_1.Controller)('api/event'),
    __metadata("design:paramtypes", [front_display_service_1.FrontDisplayService])
], FrontDisplayController);
//# sourceMappingURL=front-display.controller.js.map
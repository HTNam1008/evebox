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
exports.TicketTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tickettype_service_1 = require("./tickettype.service");
const create_tickettype_dto_1 = require("./create-tickettype.dto");
const update_tickettype_dto_1 = require("./update-tickettype.dto");
const tickettype_response_dto_1 = require("./tickettype-response.dto");
let TicketTypeController = class TicketTypeController {
    constructor(ticketTypeService) {
        this.ticketTypeService = ticketTypeService;
    }
    async create(dto) {
        return this.ticketTypeService.create(dto);
    }
    async findAll() {
        return this.ticketTypeService.getAll();
    }
    async findOne(id) {
        const result = await this.ticketTypeService.getById(id);
        if (!result)
            throw new common_1.NotFoundException('Ticket type not found');
        return result;
    }
    async update(id, dto) {
        const result = await this.ticketTypeService.update(id, dto);
        if (!result)
            throw new common_1.NotFoundException('Ticket type not found');
        return result;
    }
    async remove(id) {
        const result = await this.ticketTypeService.delete(id);
        if (!result)
            throw new common_1.NotFoundException('Ticket type not found');
        return result;
    }
};
exports.TicketTypeController = TicketTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new ticket type' }),
    (0, swagger_1.ApiBody)({ type: create_tickettype_dto_1.CreateTicketTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Ticket type created successfully',
        content: {
            'application/json': {
                example: {
                    id: "tickettype_abc123",
                    name: "VIP Ticket",
                    price: 1500000,
                    status: "active"
                }
            }
        },
        type: tickettype_response_dto_1.TicketTypeResponseDto
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tickettype_dto_1.CreateTicketTypeDto]),
    __metadata("design:returntype", Promise)
], TicketTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ticket types' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'All ticket types retrieved successfully',
        content: {
            'application/json': {
                example: {
                    total: 3,
                    data: [
                        {
                            id: "tickettype_abc123",
                            name: "VIP Ticket",
                            description: "Best seat in the house",
                            price: 1500000,
                            status: "active"
                        },
                        {
                            id: "tickettype_def456",
                            name: "Standard Ticket",
                            description: "Regular seating",
                            price: 500000,
                            status: "active"
                        },
                        {
                            id: "tickettype_xyz789",
                            name: "Student Ticket",
                            description: "Discount for students",
                            price: 200000,
                            status: "inactive"
                        }
                    ]
                }
            }
        }
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ticket type data' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Showing data retrieved successfully',
        content: {
            'application/json': {
                example: {
                    id: "tickettype_abc123",
                    name: "VIP Ticket",
                    description: "Best seat in the house",
                    price: 1500000,
                    status: "active"
                }
            }
        }
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
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update ticket type data' }),
    (0, swagger_1.ApiBody)({ type: update_tickettype_dto_1.UpdateTicketTypeDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Ticket type data updated successfully',
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tickettype_dto_1.UpdateTicketTypeDto]),
    __metadata("design:returntype", Promise)
], TicketTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete ticket type' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Ticket type deleted successfully',
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
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketTypeController.prototype, "remove", null);
exports.TicketTypeController = TicketTypeController = __decorate([
    (0, common_1.Controller)('api/tickettype'),
    __metadata("design:paramtypes", [tickettype_service_1.TicketTypeService])
], TicketTypeController);
//# sourceMappingURL=tickettype.controller.js.map
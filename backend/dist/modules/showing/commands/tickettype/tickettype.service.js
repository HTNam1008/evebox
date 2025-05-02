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
exports.TicketTypeService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const tickettype_repository_1 = require("../../repositories/tickettype.repository");
let TicketTypeService = class TicketTypeService {
    constructor(ticketTypeRepository) {
        this.ticketTypeRepository = ticketTypeRepository;
    }
    async create(dto) {
        try {
            return (0, oxide_ts_1.Ok)(await this.ticketTypeRepository.create(dto));
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to create ticket type.'));
        }
    }
    async getAll() {
        try {
            return (0, oxide_ts_1.Ok)(await this.ticketTypeRepository.getAllTicketType());
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch ticket types'));
        }
    }
    async getById(id) {
        try {
            return (0, oxide_ts_1.Ok)(await this.ticketTypeRepository.findTicketTypeById(id));
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch ticket type'));
        }
    }
    async update(id, dto) {
        try {
            return (0, oxide_ts_1.Ok)(await this.ticketTypeRepository.update(id, dto));
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to update ticket type'));
        }
    }
    async delete(id) {
        try {
            return (0, oxide_ts_1.Ok)(await this.ticketTypeRepository.delete(id));
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to delete ticket type'));
        }
    }
};
exports.TicketTypeService = TicketTypeService;
exports.TicketTypeService = TicketTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tickettype_repository_1.TicketTypeRepository])
], TicketTypeService);
//# sourceMappingURL=tickettype.service.js.map
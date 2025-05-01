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
exports.TicketTypeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let TicketTypeRepository = class TicketTypeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.ticketType.create({
            data: {
                id: crypto.randomUUID(),
                name: data.name,
                description: data.description,
                color: data.color,
                isFree: data.isFree,
                price: data.price,
                originalPrice: data.originalPrice,
                maxQtyPerOrder: data.maxQtyPerOrder,
                minQtyPerOrder: data.minQtyPerOrder,
                effectiveFrom: data.effectiveFrom,
                effectiveTo: data.effectiveTo,
                position: data.position,
                status: data.status,
                imageUrl: data.imageUrl,
                isHidden: data.isHidden ?? false,
                Showing: {
                    connect: { id: data.showingId },
                },
            }
        });
    }
    async getAllTicketType() {
        return this.prisma.ticketType.findMany();
    }
    async findTicketTypeById(id) {
        return this.prisma.ticketType.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.ticketType.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.ticketType.delete({ where: { id } });
    }
};
exports.TicketTypeRepository = TicketTypeRepository;
exports.TicketTypeRepository = TicketTypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketTypeRepository);
//# sourceMappingURL=tickettype.repository.js.map
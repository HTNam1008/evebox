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
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let EventRepository = class EventRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEventDto, imgLogoId, imgPosterId, locationId) {
        return this.prisma.events.create({
            data: {
                title: createEventDto.title,
                description: createEventDto.description,
                startDate: createEventDto.startDate,
                endDate: createEventDto.endDate,
                status: createEventDto.status,
                locationId: locationId,
                imgLogoId: imgLogoId || undefined,
                imgPosterId: imgPosterId || undefined,
                organizerId: createEventDto.organizerId || undefined,
                isOnlyOnEve: false,
                isSpecial: false,
                createdAt: new Date(),
                lastScore: 0,
                totalClicks: 0,
                weekClicks: 0,
            },
        });
    }
    async findAll() {
        return this.prisma.events.findMany({ include: {
                EventCategories: {
                    select: {
                        Categories: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                Showing: true,
            } });
    }
    async findOne(id) {
        return this.prisma.events.findUnique({ where: { id }, include: {
                EventCategories: {
                    select: {
                        Categories: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                Showing: true,
            } });
    }
    async update(id, updateEventDto, imgLogoId, imgPosterId) {
        return this.prisma.events.update({
            where: { id },
            data: {
                ...updateEventDto,
                imgLogoId: imgLogoId || updateEventDto.imgLogoId,
                imgPosterId: imgPosterId || updateEventDto.imgPosterId,
            },
        });
    }
    async delete(id) {
        await this.prisma.events.delete({ where: { id } });
    }
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventRepository);
//# sourceMappingURL=event.repository.js.map
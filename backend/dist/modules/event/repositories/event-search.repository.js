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
exports.EventSearchRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let EventSearchRepository = class EventSearchRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getEventsByTitle(title) {
        return this.prisma.events.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                endDate: true,
                createdAt: true,
                lastScore: true,
                minTicketPrice: true,
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
            }
        });
    }
};
exports.EventSearchRepository = EventSearchRepository;
exports.EventSearchRepository = EventSearchRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventSearchRepository);
//# sourceMappingURL=event-search.repository.js.map
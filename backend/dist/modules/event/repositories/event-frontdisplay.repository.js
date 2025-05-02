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
exports.EventFrontDisplayRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let EventFrontDisplayRepository = class EventFrontDisplayRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSpecialEvents() {
        return this.prisma.events.findMany({
            where: {
                isSpecial: true,
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                status: true,
                lastScore: true,
                minTicketPrice: true,
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                totalClicks: true,
                weekClicks: true,
            },
        });
    }
    async getOnlyOnEveEvents() {
        return this.prisma.events.findMany({
            where: {
                isOnlyOnEve: true,
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                status: true,
                lastScore: true,
                minTicketPrice: true,
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                totalClicks: true,
                weekClicks: true,
            },
        });
    }
    async getSpecialEventsByCategory() {
        const categories = await this.prisma.categories.findMany();
        const categorySpecials = [];
        for (const category of categories) {
            const specialEvents = await this.prisma.eventCategories.findMany({
                where: {
                    categoryId: category.id,
                    isSpecial: true,
                },
                select: {
                    Categories: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    Events: {
                        select: {
                            id: true,
                            title: true,
                            startDate: true,
                            status: true,
                            lastScore: true,
                            minTicketPrice: true,
                            Images_Events_imgLogoIdToImages: true,
                            Images_Events_imgPosterIdToImages: true,
                            totalClicks: true,
                            weekClicks: true,
                        },
                    },
                },
            });
            if (specialEvents.length > 0) {
                categorySpecials.push({
                    category: category,
                    events: specialEvents.map((eventCategory) => eventCategory.Events),
                });
            }
        }
        return categorySpecials;
    }
    async getTrendingEvents() {
        const now = new Date();
        const daysSinceMonday = now.getDay() === 0 ? 6 : now.getDay() - 1;
        const events = await this.prisma.events.findMany({
            select: {
                id: true,
                title: true,
                startDate: true,
                status: true,
                lastScore: true,
                minTicketPrice: true,
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                weekClicks: true,
                totalClicks: true,
            },
        });
        const trendingEvents = events
            .map(event => {
            const calculatedScore = event.weekClicks / (daysSinceMonday + 1);
            const maxScore = Math.max(Number(event.lastScore), calculatedScore);
            return {
                ...event,
                calculatedScore,
                maxScore,
            };
        })
            .sort((a, b) => b.maxScore - a.maxScore)
            .slice(0, 20);
        return trendingEvents;
    }
    async getRecommendedEvents(gte, lte) {
        return this.prisma.events.findMany({
            where: {
                startDate: {
                    gte: gte,
                    lte: lte
                }
            },
            orderBy: {
                lastScore: 'desc',
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                status: true,
                lastScore: true,
                minTicketPrice: true,
                Images_Events_imgLogoIdToImages: true,
                Images_Events_imgPosterIdToImages: true,
                weekClicks: true,
                totalClicks: true,
            },
        });
    }
};
exports.EventFrontDisplayRepository = EventFrontDisplayRepository;
exports.EventFrontDisplayRepository = EventFrontDisplayRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventFrontDisplayRepository);
//# sourceMappingURL=event-frontdisplay.repository.js.map
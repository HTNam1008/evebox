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
var FrontDisplayWeeklyRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontDisplayWeeklyRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const event_weekly_repository_1 = require("./event-weekly.repository");
const event_frontdisplay_repository_1 = require("../repositories/event-frontdisplay.repository");
const axios_1 = require("axios");
let FrontDisplayWeeklyRepository = FrontDisplayWeeklyRepository_1 = class FrontDisplayWeeklyRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FrontDisplayWeeklyRepository_1.name);
        this.eventWeeklyRepository = new event_weekly_repository_1.EventWeeklyRepository(this.prisma);
        this.eventFrontDisplayRepository = new event_frontdisplay_repository_1.EventFrontDisplayRepository(this.prisma);
    }
    async fetchCategories() {
        try {
            const response = await axios_1.default.get("https://api-v2.ticketbox.vn/gin/api/v2/discovery/categories");
            if (response.status === 200 && response.data.data.result) {
                this.logger.log("Fetched categories successfully.");
                return response.data.data.result;
            }
            else {
                this.logger.error("Failed to fetch categories.");
                return null;
            }
        }
        catch (error) {
            this.logger.error("Error fetching categories:", error.message);
            return null;
        }
    }
    async resetEventSpecialData() {
        try {
            await this.prisma.$transaction([
                this.prisma.events.updateMany({
                    data: { isSpecial: false, isOnlyOnEve: false },
                }),
                this.prisma.eventCategories.updateMany({
                    data: { isSpecial: false },
                }),
            ]);
            this.logger.log("Reset isSpecial and isOnlyOnEve for all events.");
        }
        catch (error) {
            this.logger.error("Error resetting event data:", error.message);
        }
    }
    async updateEventData(res) {
        if (!res)
            return;
        try {
            const { bigCates } = res;
            const specialEventIds = res.specialEvents.events.map((event) => event.originalId);
            const onlyOnTicketboxIds = res.onlyOnTicketbox.events.map((event) => event.originalId);
            const trendingEventIds = res.trendingEvents.events.map((event) => event.originalId);
            const allEventIds = [...specialEventIds, ...onlyOnTicketboxIds, ...trendingEventIds];
            let existingEvents = await this.prisma.events.findMany({
                where: { id: { in: allEventIds } },
                select: { id: true }
            });
            let existingEventIds = new Set(existingEvents.map(e => e.id));
            const missingEventIds = allEventIds.filter(eventId => !existingEventIds.has(eventId));
            if (missingEventIds.length > 0) {
                await Promise.all(missingEventIds.map(eventId => this.eventWeeklyRepository.createOrUpdateEventDetail(eventId)));
            }
            existingEvents = await this.prisma.events.findMany({
                where: { id: { in: allEventIds } },
                select: { id: true }
            });
            existingEventIds = new Set(existingEvents.map(e => e.id));
            const validSpecialEventIds = specialEventIds.filter(id => existingEventIds.has(id));
            const validOnlyOnTicketboxIds = onlyOnTicketboxIds.filter(id => existingEventIds.has(id));
            const validTrendingEventIds = trendingEventIds.filter(id => existingEventIds.has(id));
            if (validSpecialEventIds.length > 0) {
                await this.prisma.events.updateMany({
                    where: { id: { in: validSpecialEventIds } },
                    data: { isSpecial: true }
                });
                this.logger.log("Updated isSpecial for special events.");
            }
            if (validOnlyOnTicketboxIds.length > 0) {
                await this.prisma.events.updateMany({
                    where: { id: { in: validOnlyOnTicketboxIds } },
                    data: { isOnlyOnEve: true }
                });
                this.logger.log("Updated isOnlyOnEve for events only on Ticketbox.");
            }
            const trendingEventsDb = await this.eventFrontDisplayRepository.getTrendingEvents();
            const secondEvent = trendingEventsDb[1] || { lastScore: 10, weekClicks: 0 };
            if (validTrendingEventIds.length > 0) {
                await this.prisma.events.updateMany({
                    where: { id: { in: validTrendingEventIds } },
                    data: {
                        lastScore: secondEvent.lastScore,
                        totalClicks: secondEvent.weekClicks + Math.floor(Math.random() * 200),
                        weekClicks: secondEvent.weekClicks + Math.floor(Math.random() * 200),
                    }
                });
                this.logger.log("Updated lastScore for trending events.");
            }
            if (bigCates?.length) {
                let validCatesEventIds = [];
                for (const cate of bigCates) {
                    validCatesEventIds = [...validCatesEventIds, ...cate.events.map((event) => event.originalId)];
                }
                existingEvents = await this.prisma.events.findMany({
                    where: { id: { in: validCatesEventIds } },
                    select: { id: true }
                });
                existingEventIds = new Set(existingEvents.map(e => e.id));
                const missingCatesEventIds = validCatesEventIds.filter(eventId => !existingEventIds.has(eventId));
                this.logger.log(`Missing cate event IDs: ${missingCatesEventIds}`);
                if (missingCatesEventIds.length > 0) {
                    await Promise.all(missingCatesEventIds.map(eventId => this.eventWeeklyRepository.createOrUpdateEventDetail(eventId)));
                }
                for (const cate of bigCates) {
                    let categoryId;
                    switch (cate.cateId) {
                        case 8:
                            categoryId = 1;
                            break;
                        case 12:
                            categoryId = 5;
                            break;
                        case 10:
                            categoryId = 2;
                            break;
                        default: continue;
                    }
                    const cateEveIds = cate.events.map((event) => event.originalId);
                    this.logger.log(`Category ID: ${categoryId}, Event IDs: ${cateEveIds}`);
                    if (cateEveIds.length > 0) {
                        await this.prisma.eventCategories.updateMany({
                            where: { eventId: { in: cateEveIds }, categoryId },
                            data: { isSpecial: true }
                        });
                        this.logger.log(`Updated isSpecial for category ID: ${categoryId}`);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error("Error updating event data:", error.message);
        }
    }
    async updateLastScore() {
        try {
            const events = await this.prisma.events.findMany();
            await this.prisma.$transaction(events.map(event => this.prisma.events.update({
                where: { id: event.id },
                data: {
                    lastScore: Math.round(event.weekClicks / 7),
                    weekClicks: 0,
                },
            })));
            this.logger.log("Updated lastScore for all events.");
        }
        catch (error) {
            this.logger.error("Error updating lastScore:", error.message);
        }
    }
    async updateFrontDisplayWeekly() {
        try {
            await this.resetEventSpecialData();
            this.logger.log("Fetching categories...");
            const res = await this.fetchCategories();
            if (!res) {
                this.logger.log("No data fetched. Exiting...");
                return;
            }
            this.logger.log("Updating event data...");
            await this.updateEventData(res);
            this.logger.log('Database updated successfully!');
        }
        catch (error) {
            this.logger.error("Error in main function:", error.message);
        }
    }
};
exports.FrontDisplayWeeklyRepository = FrontDisplayWeeklyRepository;
exports.FrontDisplayWeeklyRepository = FrontDisplayWeeklyRepository = FrontDisplayWeeklyRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FrontDisplayWeeklyRepository);
//# sourceMappingURL=front-display-weekly.repository.js.map
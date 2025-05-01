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
var EventWeeklyRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventWeeklyRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const axios_1 = require("axios");
let EventWeeklyRepository = EventWeeklyRepository_1 = class EventWeeklyRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(EventWeeklyRepository_1.name);
    }
    async fetchEventDetails(eventId) {
        try {
            this.logger.log(`Fetching details for event ID: ${eventId}`);
            const response = await axios_1.default.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
            if (response.data.status === 1) {
                this.logger.log(`Fetched details for event ID: ${eventId}`);
                return response.data.data.result;
            }
            else {
                this.logger.warn(`Failed to fetch details for event ID: ${eventId}`);
                return null;
            }
        }
        catch (error) {
            this.logger.error(`Error fetching details for event ID: ${eventId}: ${error.message}`);
            return null;
        }
    }
    async handleEventLocation(address) {
        try {
            let parts = address.split(",").map((part) => part.trim());
            let province = parts.pop();
            let district = parts.pop();
            let streetAndWard = parts.join(", ");
            let [street, ward] = streetAndWard.includes(",")
                ? streetAndWard.split(",").map((part) => part.trim())
                : [streetAndWard, ""];
            let provinceAdd = await this.prisma.province.findFirst({
                where: { name: province || "Default" },
            });
            if (!provinceAdd) {
                provinceAdd = await this.prisma.province.create({
                    data: { name: province || "Default" },
                });
                this.logger.log(`Province "${province}" created.`);
            }
            let districtAdd = await this.prisma.districts.findFirst({
                where: { name: district || "Default", provinceId: provinceAdd.id },
            });
            if (!districtAdd) {
                districtAdd = await this.prisma.districts.create({
                    data: { name: district || "Default", provinceId: provinceAdd.id },
                });
                this.logger.log(`District "${district}" created.`);
            }
            let location = await this.prisma.locations.findFirst({
                where: { street, ward, districtId: districtAdd.id },
            });
            if (!location) {
                location = await this.prisma.locations.create({
                    data: { street, ward, districtId: districtAdd.id },
                });
                this.logger.log(`Location "${street}, ${ward}, ${district}" created.`);
            }
            this.logger.log(`Location resolved: ${street}, ${ward}, ${district}, ${province}`);
            return location;
        }
        catch (error) {
            this.logger.error(`Error handling event location: ${error.message}`);
            throw error;
        }
    }
    async addToEventCategory(categories, eventId) {
        try {
            const existingEventCategories = await this.prisma.eventCategories.findMany({
                where: { eventId },
                select: { categoryId: true },
            });
            const existingCategoryIds = existingEventCategories.map(ec => ec.categoryId);
            let newCategoryIds = [];
            for (const categoryName of categories) {
                let category = await this.prisma.categories.findFirst({
                    where: { name: categoryName },
                });
                if (!category) {
                    category = await this.prisma.categories.create({
                        data: { name: categoryName },
                    });
                    this.logger.log(`Category "${categoryName}" created.`);
                }
                newCategoryIds.push(category.id);
                if (!existingCategoryIds.includes(category.id)) {
                    await this.prisma.eventCategories.create({
                        data: { eventId, categoryId: category.id },
                    });
                    this.logger.log(`Category "${categoryName}" linked to event ID: ${eventId}`);
                }
            }
            for (const categoryId of existingCategoryIds) {
                if (!newCategoryIds.includes(categoryId)) {
                    await this.prisma.eventCategories.deleteMany({
                        where: { eventId, categoryId },
                    });
                    this.logger.log(`Removed category ID: ${categoryId} from event ID: ${eventId}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error handling event categories: ${error.message}`);
            throw error;
        }
    }
    async createOrUpdateEventDetail(eventId) {
        try {
            const fetchedEventDetails = await this.fetchEventDetails(eventId);
            if (!fetchedEventDetails)
                return;
            let createdPosterImage = await this.prisma.images.findFirst({
                where: { imageUrl: fetchedEventDetails.bannerURL },
            });
            if (!createdPosterImage) {
                createdPosterImage = await this.prisma.images.create({
                    data: { imageUrl: fetchedEventDetails.bannerURL },
                });
            }
            let createdLogoImage = await this.prisma.images.findFirst({
                where: { imageUrl: fetchedEventDetails.orgLogoURL },
            });
            if (!createdLogoImage) {
                createdLogoImage = await this.prisma.images.create({
                    data: { imageUrl: fetchedEventDetails.orgLogoURL },
                });
            }
            const location = await this.handleEventLocation(fetchedEventDetails.address);
            const createdEvent = await this.prisma.events.upsert({
                where: { id: fetchedEventDetails.originalId },
                update: {
                    title: fetchedEventDetails.title,
                    description: fetchedEventDetails.description || "Default Event Description",
                    startDate: new Date(fetchedEventDetails.startTime),
                    endDate: new Date(fetchedEventDetails.endTime),
                    imgPosterId: createdPosterImage.id,
                    imgLogoId: createdLogoImage.id,
                    status: fetchedEventDetails.status || "active",
                    locationId: location.id,
                    venue: fetchedEventDetails.venue || "Default Venue",
                    lastScore: 0,
                    minTicketPrice: fetchedEventDetails.minTicketPrice || 0,
                },
                create: {
                    id: fetchedEventDetails.originalId,
                    title: fetchedEventDetails.title,
                    description: fetchedEventDetails.description || "Default Event Description",
                    startDate: new Date(fetchedEventDetails.startTime),
                    endDate: new Date(fetchedEventDetails.endTime),
                    locationId: location.id,
                    venue: fetchedEventDetails.venue || "Default Venue",
                    imgPosterId: createdPosterImage.id,
                    imgLogoId: createdLogoImage.id,
                    status: fetchedEventDetails.status || "active",
                    lastScore: 0,
                    minTicketPrice: fetchedEventDetails.minTicketPrice || 0,
                },
            });
            this.logger.log(`Event "${fetchedEventDetails.title}" (ID: ${fetchedEventDetails.originalId}) created or updated.`);
            await this.addToEventCategory(fetchedEventDetails.categoriesV2, createdEvent.id);
            return createdEvent;
        }
        catch (error) {
            this.logger.error(`Error creating/updating event: ${error.message}`);
            throw error;
        }
    }
    async fetchEventsFromTicketBox(page, categories) {
        try {
            const response = await axios_1.default.get(`https://api-v2.ticketbox.vn/search/v2/events?limit=20&page=${page}&categories=${categories}`);
            const events = response.data.data.results;
            if (!events || events.length === 0) {
                this.logger.warn('No events found in API response');
                return;
            }
            this.logger.log(`Fetched ${events.length} events from Ticketbox API`);
            this.logger.log(`Processing ${events.length} events...`);
            for (const event of events) {
                if (!event.id) {
                    this.logger.error("Event ID is undefined. Skipping this event.");
                    continue;
                }
                this.logger.log(`Processing event ID: ${event.id}`);
                try {
                    await this.createOrUpdateEventDetail(event.id);
                }
                catch (error) {
                    this.logger.error(`Error syncing event ${event.id}: ${error.message}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error fetching data: ${error.message}`);
        }
    }
    async updateAllEvents() {
        const events = await this.prisma.events.findMany({ select: { id: true } });
        const updatedData = await Promise.all(events.map(async (event) => {
            const fetchedEventDetails = await this.fetchEventDetails(event.id);
            if (!fetchedEventDetails)
                return null;
            return {
                where: { id: event.id },
                data: { minTicketPrice: fetchedEventDetails.minTicketPrice || 0 },
            };
        }));
        const validUpdates = updatedData.filter(Boolean);
        await this.prisma.$transaction(validUpdates.map((update) => this.prisma.events.update(update)));
    }
};
exports.EventWeeklyRepository = EventWeeklyRepository;
exports.EventWeeklyRepository = EventWeeklyRepository = EventWeeklyRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventWeeklyRepository);
//# sourceMappingURL=event-weekly.repository.js.map
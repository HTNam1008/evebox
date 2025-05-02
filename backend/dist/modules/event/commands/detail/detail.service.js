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
exports.EventDetailService = void 0;
const common_1 = require("@nestjs/common");
const event_detail_repository_1 = require("../../repositories/event-detail.repository");
const oxide_ts_1 = require("oxide.ts");
let EventDetailService = class EventDetailService {
    constructor(eventDetailRepository) {
        this.eventDetailRepository = eventDetailRepository;
    }
    async execute(eventId) {
        if (!eventId) {
            return (0, oxide_ts_1.Err)(new Error("Event ID is required."));
        }
        try {
            const { eventDetail, locationsString } = await this.eventDetailRepository.getEventDetail(eventId);
            if (!eventDetail) {
                return (0, oxide_ts_1.Err)(new Error("Event not found."));
            }
            const formattedResult = {
                id: eventDetail.id,
                title: eventDetail.title,
                description: eventDetail.description,
                startDate: eventDetail.startDate,
                endDate: eventDetail.endDate,
                organizerId: eventDetail.organizerId,
                status: eventDetail.status,
                locationId: eventDetail.locationId,
                minTicketPrice: eventDetail.minTicketPrice,
                venue: eventDetail.venue,
                Images_Events_imgLogoIdToImages: eventDetail.Images_Events_imgLogoIdToImages,
                Images_Events_imgPosterIdToImages: eventDetail.Images_Events_imgPosterIdToImages,
                createdAt: eventDetail.createdAt,
                locationsString: locationsString,
                lastScore: eventDetail.lastScore,
                isSpecial: eventDetail.isSpecial,
                isOnlyOnEve: eventDetail.isOnlyOnEve,
                categories: eventDetail.EventCategories.map(category => ({
                    id: category.Categories.id,
                    name: category.Categories.name,
                })),
                showing: eventDetail.Showing,
            };
            return (0, oxide_ts_1.Ok)(formattedResult);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error("Failed to fetch event detail data."));
        }
    }
    async getRecommendedEventsInDetail(eventId, limit) {
        if (!eventId) {
            return (0, oxide_ts_1.Err)(new Error("Event ID is required."));
        }
        try {
            if (!limit) {
                limit = "20";
            }
            const recommendedEvents = await this.eventDetailRepository.getRecommendedEventsInDetail(eventId, limit);
            return (0, oxide_ts_1.Ok)(recommendedEvents);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error("Event not found."));
        }
    }
    async postClicks(eventId) {
        if (!eventId) {
            return (0, oxide_ts_1.Err)(new Error("Event ID is required."));
        }
        try {
            const res = await this.eventDetailRepository.postClicks(eventId);
            if (res === 1) {
                return (0, oxide_ts_1.Ok)("Success Update");
            }
            return (0, oxide_ts_1.Err)(new Error("EventId not found"));
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error("Failed to update event clicks."));
        }
    }
};
exports.EventDetailService = EventDetailService;
exports.EventDetailService = EventDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_detail_repository_1.EventDetailRepository])
], EventDetailService);
//# sourceMappingURL=detail.service.js.map
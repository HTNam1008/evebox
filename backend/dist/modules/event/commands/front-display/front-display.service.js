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
exports.FrontDisplayService = void 0;
const common_1 = require("@nestjs/common");
const event_frontdisplay_repository_1 = require("../../repositories/event-frontdisplay.repository");
const oxide_ts_1 = require("oxide.ts");
let FrontDisplayService = class FrontDisplayService {
    constructor(eventFrontDisplayRepository) {
        this.eventFrontDisplayRepository = eventFrontDisplayRepository;
    }
    async execute() {
        try {
            const specialEvents = await this.eventFrontDisplayRepository.getSpecialEvents();
            const trendingEvents = await this.eventFrontDisplayRepository.getTrendingEvents();
            const onlyOnEve = await this.eventFrontDisplayRepository.getOnlyOnEveEvents();
            const categorySpecial = await this.eventFrontDisplayRepository.getSpecialEventsByCategory();
            const result = {
                specialEvents,
                trendingEvents,
                onlyOnEve,
                categorySpecial,
            };
            return (0, oxide_ts_1.Ok)(result);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch front display data.'));
        }
    }
    async getRecommendedEvents(timeWindow) {
        try {
            const now = new Date();
            let endDate;
            if (timeWindow === 'week') {
                const remainingDays = 7 - now.getDay();
                endDate = new Date(now);
                endDate.setDate(now.getDate() + remainingDays);
                endDate.setHours(23, 59, 59, 999);
            }
            else if (timeWindow === 'month') {
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999);
            }
            else {
                throw new Error('Invalid timeWindow value. Use "week" or "month".');
            }
            console.log('endDate', endDate, 'now', now);
            const recommendedEvents = await this.eventFrontDisplayRepository.getRecommendedEvents(now, endDate);
            return (0, oxide_ts_1.Ok)(recommendedEvents);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch recommended events.'));
        }
    }
};
exports.FrontDisplayService = FrontDisplayService;
exports.FrontDisplayService = FrontDisplayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_frontdisplay_repository_1.EventFrontDisplayRepository])
], FrontDisplayService);
//# sourceMappingURL=front-display.service.js.map
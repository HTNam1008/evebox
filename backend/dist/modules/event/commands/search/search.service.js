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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const event_search_repository_1 = require("../../repositories/event-search.repository");
const oxide_ts_1 = require("oxide.ts");
let SearchService = class SearchService {
    constructor(eventSearchRepository) {
        this.eventSearchRepository = eventSearchRepository;
    }
    async execute(title) {
        try {
            const searchResult = await this.eventSearchRepository.getEventsByTitle(title);
            const formattedResult = searchResult.map(event => ({
                id: event.id,
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                lastScore: event.lastScore,
                Images_Events_imgLogoIdToImages: event.Images_Events_imgLogoIdToImages,
                Images_Events_imgPosterIdToImages: event.Images_Events_imgPosterIdToImages,
                categories: event.EventCategories.map(category => ({
                    id: category.Categories.id,
                    name: category.Categories.name,
                })),
            }));
            return (0, oxide_ts_1.Ok)(formattedResult);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch search data.'));
        }
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_search_repository_1.EventSearchRepository])
], SearchService);
//# sourceMappingURL=search.service.js.map
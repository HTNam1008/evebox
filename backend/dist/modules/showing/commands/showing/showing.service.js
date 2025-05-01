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
exports.ShowingService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const showing_repository_1 = require("../../repositories/showing.repository");
let ShowingService = class ShowingService {
    constructor(showingRepository) {
        this.showingRepository = showingRepository;
    }
    async execute(showingId) {
        try {
            const showing = await this.showingRepository.getShowingDetail(showingId);
            if (!showing) {
                return (0, oxide_ts_1.Err)(new Error('Showing not found.'));
            }
            return (0, oxide_ts_1.Ok)(showing);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch showing data.'));
        }
    }
    async getSeatMap(showingId) {
        try {
            const seatMap = await this.showingRepository.getSeatmap(showingId);
            if (!seatMap) {
                return (0, oxide_ts_1.Err)(new Error('Seat map not found.'));
            }
            const formattedResult = {
                id: seatMap.id,
                name: seatMap.name,
                createdAt: seatMap.createdAt,
                viewBox: seatMap.viewBox,
                status: seatMap.status,
                Section: seatMap.Section.map(section => ({
                    id: section.id,
                    name: section.name,
                    createdAt: section.createdAt,
                    seatmapId: section.seatmapId,
                    isStage: section.isStage,
                    element: section.element,
                    attribute: section.attribute,
                    ticketTypeId: section.ticketTypeId,
                    Row: section.Row.map(row => ({
                        id: row.id,
                        name: row.name,
                        sectionId: row.sectionId,
                        createdAt: row.createdAt,
                        Seat: row.Seat.map(seat => ({
                            id: seat.id,
                            name: seat.name,
                            rowId: seat.rowId,
                            position: seat.position,
                            positionX: new Float32Array([seat.positionX]),
                            positionY: new Float32Array([seat.positionY]),
                            createdAt: seat.createdAt,
                            status: seat.Ticket[0]?.status || 1,
                        })),
                    })),
                })),
            };
            return (0, oxide_ts_1.Ok)(formattedResult);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch seat map data.'));
        }
    }
    async getAllShowings() {
        try {
            const showings = await this.showingRepository.getAllShowing();
            const formattedResult = showings.map(showing => showing.id);
            return (0, oxide_ts_1.Ok)(formattedResult);
        }
        catch (error) {
            console.error(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to fetch showings data.'));
        }
    }
};
exports.ShowingService = ShowingService;
exports.ShowingService = ShowingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [showing_repository_1.ShowingRepository])
], ShowingService);
//# sourceMappingURL=showing.service.js.map
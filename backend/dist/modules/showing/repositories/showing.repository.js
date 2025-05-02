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
exports.ShowingRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let ShowingRepository = class ShowingRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getShowingDetail(showingId) {
        const showing = await this.prisma.showing.findUnique({
            where: {
                id: showingId,
            },
            select: {
                id: true,
                eventId: true,
                status: true,
                isFree: true,
                isSalable: true,
                isPresale: true,
                seatMapId: true,
                startTime: true,
                endTime: true,
                isEnabledQueueWaiting: true,
                showAllSeats: true,
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
                TicketType: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        color: true,
                        isFree: true,
                        price: true,
                        originalPrice: true,
                        maxQtyPerOrder: true,
                        minQtyPerOrder: true,
                        effectiveFrom: true,
                        effectiveTo: true,
                        position: true,
                        status: true,
                        imageUrl: true,
                        isHidden: true,
                    },
                },
            },
        });
        return showing;
    }
    async getSeatmap(showingId) {
        const seatmapId = await this.prisma.showing.findUnique({
            where: {
                id: showingId,
            },
            select: {
                seatMapId: true,
            }
        });
        if (!seatmapId) {
            return null;
        }
        const seatmap = await this.prisma.seatmap.findUnique({
            where: {
                id: seatmapId.seatMapId,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                viewBox: true,
                status: true,
                Section: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        seatmapId: true,
                        isStage: true,
                        element: true,
                        attribute: true,
                        ticketTypeId: true,
                        Row: {
                            select: {
                                id: true,
                                name: true,
                                sectionId: true,
                                createdAt: true,
                                Seat: {
                                    select: {
                                        id: true,
                                        name: true,
                                        rowId: true,
                                        position: true,
                                        positionX: true,
                                        positionY: true,
                                        createdAt: true,
                                        Ticket: {
                                            where: {
                                                showingId: showingId,
                                            },
                                            select: {
                                                status: true,
                                            }
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return seatmap;
    }
    async getAllShowing() {
        return await this.prisma.showing.findMany({ select: { id: true } });
    }
};
exports.ShowingRepository = ShowingRepository;
exports.ShowingRepository = ShowingRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShowingRepository);
//# sourceMappingURL=showing.repository.js.map
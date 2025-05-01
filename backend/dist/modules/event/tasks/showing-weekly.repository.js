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
var ShowingWeeklyRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowingWeeklyRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const event_weekly_repository_1 = require("./event-weekly.repository");
const axios_1 = require("axios");
let ShowingWeeklyRepository = ShowingWeeklyRepository_1 = class ShowingWeeklyRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ShowingWeeklyRepository_1.name);
        this.eventWeeklyRepository = new event_weekly_repository_1.EventWeeklyRepository(this.prisma);
    }
    async fetchShowingForEvent(eventId) {
        try {
            const existEvent = await this.prisma.events.findFirst({
                where: { id: eventId },
            });
            if (!existEvent) {
                this.logger.warn(`Event ID: ${eventId} does not exist.`);
                await this.eventWeeklyRepository.createOrUpdateEventDetail(eventId);
            }
            const result = await axios_1.default.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
            const showings = result.data.data.result.showings;
            if (showings.length > 0) {
                for (const showing of showings) {
                    if (showing.status === 'showing_is_over') {
                        this.logger.log(`Showing ID: ${showing.id} is over.`);
                        continue;
                    }
                    const seatmapResult = await axios_1.default.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showing.id}/seatmap`);
                    const seatmap = seatmapResult.data.data.result;
                    await this.prisma.$transaction(async (tx) => {
                        const updatedSeatmap = await tx.seatmap.upsert({
                            where: { id: seatmap.id },
                            update: {
                                name: seatmap.name,
                                status: seatmap.status,
                                viewBox: seatmap.viewbox,
                            },
                            create: {
                                id: seatmap.id,
                                name: seatmap.name,
                                status: seatmap.status,
                                viewBox: seatmap.viewbox,
                            },
                        });
                        this.logger.log(`Processed Seatmap: ${updatedSeatmap.id}`);
                        const createdShowing = await tx.showing.upsert({
                            where: { id: showing.id.toString() },
                            update: {
                                status: showing.status,
                                isFree: showing.isFree,
                                isSalable: showing.isSalable,
                                isPresale: showing.isPresale,
                                seatMapId: showing.seatMapId,
                                startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
                                endTime: showing.endTime ? new Date(showing.endTime) : null,
                                isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
                                showAllSeats: showing.showAllSeats,
                            },
                            create: {
                                id: showing.id.toString(),
                                eventId,
                                status: showing.status,
                                isFree: showing.isFree,
                                isSalable: showing.isSalable,
                                isPresale: showing.isPresale,
                                seatMapId: showing.seatMapId,
                                startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
                                endTime: showing.endTime ? new Date(showing.endTime) : null,
                                isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
                                showAllSeats: showing.showAllSeats,
                            },
                        });
                        this.logger.log(`Processed Showing: ${createdShowing.id}`);
                        for (const ticketType of showing.ticketTypes) {
                            await tx.ticketType.upsert({
                                where: { id: ticketType.id.toString() },
                                update: {
                                    showingId: showing.id.toString(),
                                    name: ticketType.name,
                                    description: ticketType.description,
                                    color: ticketType.color,
                                    isFree: ticketType.isFree,
                                    price: ticketType.price,
                                    originalPrice: ticketType.originalPrice,
                                    maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                    minQtyPerOrder: ticketType.minQtyPerOrder,
                                    effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                    effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                    position: ticketType.position,
                                    status: ticketType.status,
                                    imageUrl: ticketType.imageUrl,
                                },
                                create: {
                                    id: ticketType.id.toString(),
                                    showingId: showing.id.toString(),
                                    name: ticketType.name,
                                    description: ticketType.description,
                                    color: ticketType.color,
                                    isFree: ticketType.isFree,
                                    price: ticketType.price,
                                    originalPrice: ticketType.originalPrice,
                                    maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                    minQtyPerOrder: ticketType.minQtyPerOrder,
                                    effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                    effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                    position: ticketType.position,
                                    status: ticketType.status,
                                    imageUrl: ticketType.imageUrl,
                                },
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            this.logger.error(`Error fetching showing for event ID: ${eventId}: ${error.message}`);
            return null;
        }
    }
    async fetchShowingForEventNoShowing(eventId) {
        try {
            const existEvent = await this.prisma.events.findFirst({
                where: { id: eventId },
            });
            if (!existEvent) {
                this.logger.warn(`Event ID: ${eventId} does not exist.`);
                await this.eventWeeklyRepository.createOrUpdateEventDetail(eventId);
            }
            const result = await axios_1.default.get(`https://api-v2.ticketbox.vn/gin/api/v1/events/${eventId}`);
            const showings = result.data.data.result.showings;
            if (showings.length > 0) {
                for (const showing of showings) {
                    if (showing.id === 0) {
                        const showingIDgenerate = "showing-" + eventId.toString() + "-" + showings.indexOf(showing).toString();
                        this.logger.log(`Generated Showing ID: ${showingIDgenerate}`);
                        await this.prisma.$transaction(async (tx) => {
                            const createdShowing = await tx.showing.create({
                                data: {
                                    id: showingIDgenerate,
                                    eventId,
                                    status: showing.status,
                                    isFree: showing.isFree,
                                    isSalable: showing.isSalable,
                                    isPresale: showing.isPresale,
                                    seatMapId: 184,
                                    startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
                                    endTime: showing.endTime ? new Date(showing.endTime) : null,
                                    isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
                                    showAllSeats: showing.showAllSeats,
                                },
                            });
                            this.logger.log(`Created Showing with auto-generated ID: ${createdShowing.id}`);
                            for (const ticketType of showing.ticketTypes) {
                                await tx.ticketType.upsert({
                                    where: { id: ticketType.id.toString() },
                                    update: {
                                        showingId: createdShowing.id,
                                        name: ticketType.name,
                                        description: ticketType.description,
                                        color: ticketType.color,
                                        isFree: ticketType.isFree,
                                        price: ticketType.price,
                                        originalPrice: ticketType.originalPrice,
                                        maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                        minQtyPerOrder: ticketType.minQtyPerOrder,
                                        effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                        effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                        position: ticketType.position,
                                        status: ticketType.status,
                                        imageUrl: ticketType.imageUrl,
                                    },
                                    create: {
                                        id: ticketType.id.toString(),
                                        showingId: createdShowing.id,
                                        name: ticketType.name,
                                        description: ticketType.description,
                                        color: ticketType.color,
                                        isFree: ticketType.isFree,
                                        price: ticketType.price,
                                        originalPrice: ticketType.originalPrice,
                                        maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                        minQtyPerOrder: ticketType.minQtyPerOrder,
                                        effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                        effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                        position: ticketType.position,
                                        status: ticketType.status,
                                        imageUrl: ticketType.imageUrl,
                                    },
                                });
                            }
                        });
                        continue;
                    }
                    return;
                    const seatmapResult = await axios_1.default.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showing.id}/seatmap`);
                    const seatmap = seatmapResult.data.data.result;
                    await this.prisma.$transaction(async (tx) => {
                        const updatedSeatmap = await tx.seatmap.upsert({
                            where: { id: seatmap.id },
                            update: {
                                name: seatmap.name,
                                status: seatmap.status,
                                viewBox: seatmap.viewbox,
                            },
                            create: {
                                id: seatmap.id,
                                name: seatmap.name,
                                status: seatmap.status,
                                viewBox: seatmap.viewbox,
                            },
                        });
                        this.logger.log(`Processed Seatmap: ${updatedSeatmap.id}`);
                        const createdShowing = await tx.showing.upsert({
                            where: { id: showing.id.toString() },
                            update: {
                                status: showing.status,
                                isFree: showing.isFree,
                                isSalable: showing.isSalable,
                                isPresale: showing.isPresale,
                                seatMapId: showing.seatMapId,
                                startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
                                endTime: showing.endTime ? new Date(showing.endTime) : null,
                                isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
                                showAllSeats: showing.showAllSeats,
                            },
                            create: {
                                id: showing.id.toString(),
                                eventId,
                                status: showing.status,
                                isFree: showing.isFree,
                                isSalable: showing.isSalable,
                                isPresale: showing.isPresale,
                                seatMapId: showing.seatMapId,
                                startTime: showing.startTime ? new Date(showing.startTime) : new Date(),
                                endTime: showing.endTime ? new Date(showing.endTime) : null,
                                isEnabledQueueWaiting: showing.isEnabledQueueWaiting,
                                showAllSeats: showing.showAllSeats,
                            },
                        });
                        this.logger.log(`Processed Showing: ${createdShowing.id}`);
                        for (const ticketType of showing.ticketTypes) {
                            await tx.ticketType.upsert({
                                where: { id: ticketType.id.toString() },
                                update: {
                                    showingId: showing.id.toString(),
                                    name: ticketType.name,
                                    description: ticketType.description,
                                    color: ticketType.color,
                                    isFree: ticketType.isFree,
                                    price: ticketType.price,
                                    originalPrice: ticketType.originalPrice,
                                    maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                    minQtyPerOrder: ticketType.minQtyPerOrder,
                                    effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                    effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                    position: ticketType.position,
                                    status: ticketType.status,
                                    imageUrl: ticketType.imageUrl,
                                },
                                create: {
                                    id: ticketType.id.toString(),
                                    showingId: showing.id.toString(),
                                    name: ticketType.name,
                                    description: ticketType.description,
                                    color: ticketType.color,
                                    isFree: ticketType.isFree,
                                    price: ticketType.price,
                                    originalPrice: ticketType.originalPrice,
                                    maxQtyPerOrder: ticketType.maxQtyPerOrder,
                                    minQtyPerOrder: ticketType.minQtyPerOrder,
                                    effectiveFrom: ticketType.startTime ? new Date(ticketType.startTime) : new Date(),
                                    effectiveTo: ticketType.endTime ? new Date(ticketType.endTime) : null,
                                    position: ticketType.position,
                                    status: ticketType.status,
                                    imageUrl: ticketType.imageUrl,
                                },
                            });
                        }
                    });
                }
            }
        }
        catch (error) {
            this.logger.error(`Error fetching showing for event ID: ${eventId}: ${error.message}`);
            return null;
        }
    }
    async fetchSeatMapForShowing(showingId) {
        try {
            const findEvent = await this.prisma.showing.findUnique({
                where: { id: showingId },
            });
            if (!findEvent) {
                this.logger.log(`showingId ID: ${showingId} not found.`);
                return;
            }
            this.logger.log(`Processing seatmap for showing ID: ${showingId}`);
            const result = await axios_1.default.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showingId}/seatmap`);
            const seatmap = result.data.data.result;
            if (!seatmap) {
                this.logger.log(`Seatmap ID: ${showingId} not found.`);
                return;
            }
            const seatmapPrisma = await this.prisma.seatmap.findUnique({
                where: { id: seatmap.id },
            });
            if (!seatmapPrisma) {
                this.logger.log(`Seatmap ID: ${seatmap.id} !already exists.`);
                return;
            }
            await this.updateSection(seatmap);
            for (const section of seatmap.sections) {
                if (!section.rows || section.rows.length === 0) {
                    continue;
                }
                await this.updateRow(section);
                for (const row of section.rows) {
                    if (!row.seats || row.seats.length === 0) {
                        continue;
                    }
                    await this.updateSeat(row, section, showingId);
                }
            }
            this.logger.log(`Seatmap of showing ID: ${showingId} updated successfully.`);
        }
        catch (error) {
            console.error("Error crawling showings:", error);
        }
    }
    async updateSection(data) {
        try {
            const sectionData = data.sections.map((section) => ({
                id: section.id,
                name: section.name,
                seatmapId: section.seatMapId,
                isStage: section.isStage,
                element: section.elements,
                attribute: section.attribute,
                ticketTypeId: section.ticketTypeId || '',
            }));
            const updatePromises = sectionData.map(async (section) => {
                return this.prisma.section.upsert({
                    where: { id: section.id },
                    update: {
                        name: section.name,
                        seatmapId: section.seatmapId,
                        isStage: section.isStage,
                        element: section.element,
                        attribute: section.attribute,
                        ticketTypeId: section.ticketTypeId.toString(),
                    },
                    create: {
                        id: section.id,
                        name: section.name,
                        seatmapId: section.seatmapId,
                        isStage: section.isStage,
                        element: section.element,
                        attribute: section.attribute,
                        ticketTypeId: section.ticketTypeId.toString(),
                    },
                });
            });
            await Promise.all(updatePromises);
            this.logger.log('Sections updated successfully');
        }
        catch (error) {
            this.logger.error('Error updating sections:', error);
        }
    }
    async updateRow(data) {
        try {
            const rowData = data.rows.map((row) => ({
                id: row.id,
                name: row.name,
                sectionId: row.sectionId,
            }));
            const updatePromises = rowData.map(async (row) => {
                return this.prisma.row.upsert({
                    where: { id: row.id },
                    update: {
                        name: row.name,
                        sectionId: row.sectionId,
                    },
                    create: {
                        id: row.id,
                        name: row.name,
                        sectionId: row.sectionId,
                    },
                });
            });
            await Promise.all(updatePromises);
            this.logger.log('Rows updated successfully');
        }
        catch (error) {
            this.logger.error('Error updating rows:', error);
        }
    }
    async updateSeat(data, section, showingId) {
        try {
            const seatData = data.seats.map((seat) => ({
                id: seat.id,
                name: seat.name,
                rowId: seat.rowId,
                positionX: seat.x,
                positionY: seat.y,
                position: seat.position,
            }));
            const updatePromises = seatData.map(async (seat) => {
                return this.prisma.seat.upsert({
                    where: { id: seat.id },
                    update: {
                        name: seat.name,
                        rowId: seat.rowId,
                        positionX: seat.positionX,
                        positionY: seat.positionY,
                        position: seat.position,
                    },
                    create: {
                        id: seat.id,
                        name: seat.name,
                        rowId: seat.rowId,
                        positionX: seat.positionX,
                        positionY: seat.positionY,
                        position: seat.position,
                    },
                });
            });
            await Promise.all(updatePromises);
            this.logger.log('Seats updated successfully');
            const updateTicketPromises = data.seats.map(async (seat) => {
                await this.prisma.ticket.create({
                    data: {
                        seatId: Number(seat.id),
                        ticketTypeId: section.ticketTypeId.toString(),
                        showingId: showingId.toString(),
                        status: seat.status,
                        price: section.ticketType?.price || 0,
                    },
                });
            });
            await Promise.all(updateTicketPromises);
            this.logger.log('Tickets created successfully');
        }
        catch (error) {
            this.logger.error('Error updating seats:', error);
        }
    }
    async fetchSeatMapForShowingTransaction(showingId) {
        try {
            const findEvent = await this.prisma.showing.findUnique({
                where: { id: showingId },
            });
            if (!findEvent) {
                this.logger.log(`showingId ID: ${showingId} not found.`);
                return;
            }
            this.logger.log(`Processing seatmap for showing ID: ${showingId}`);
            const result = await axios_1.default.get(`https://api-v2.ticketbox.vn/event/api/v1/events/showings/${showingId}/seatmap`);
            const seatmap = result.data.data.result;
            if (!seatmap) {
                this.logger.log(`Seatmap ID: ${showingId} not found.`);
                return;
            }
            await this.prisma.$transaction(async (tx) => {
                const seatmapExists = await tx.seatmap.findUnique({
                    where: { id: seatmap.id },
                });
                if (!seatmapExists) {
                    this.logger.log(`Seatmap ID: ${seatmap.id} does not exist.`);
                    return;
                }
                this.logger.log(`Section`);
                const sectionsData = seatmap.sections.map((section) => ({
                    id: section.id,
                    name: section.name,
                    seatmapId: section.seatMapId,
                    isStage: section.isStage,
                    element: section.elements,
                    attribute: section.attribute,
                    ticketTypeId: section.ticketTypeId?.toString() || '',
                }));
                await tx.section.createMany({ data: sectionsData, skipDuplicates: true });
                this.logger.log(`Row`);
                const rowsData = seatmap.sections.flatMap((section) => section.rows?.map((row) => ({
                    id: row.id,
                    name: row.name,
                    sectionId: section.id,
                })) || []);
                await tx.row.createMany({ data: rowsData, skipDuplicates: true });
                this.logger.log(`Seat`);
                const seatsData = seatmap.sections.flatMap((section) => section.rows?.flatMap((row) => row.seats?.map((seat) => ({
                    id: seat.id,
                    name: seat.name,
                    rowId: row.id,
                    positionX: seat.x,
                    positionY: seat.y,
                    position: seat.position,
                })) || []) || []);
                await tx.seat.createMany({ data: seatsData, skipDuplicates: true });
                this.logger.log(`Ticket`);
                const ticketsData = seatmap.sections.flatMap((section) => section.rows?.flatMap((row) => row.seats?.map((seat) => ({
                    seatId: Number(seat.id),
                    ticketTypeId: section.ticketTypeId?.toString() || '',
                    showingId: showingId.toString(),
                    status: seat.status,
                    price: section.ticketType?.price || 0,
                })) || []) || []).filter((ticket) => ticket.ticketTypeId !== '');
                await tx.ticket.createMany({ data: ticketsData, skipDuplicates: true });
                this.logger.log(`Seatmap for showing ID: ${showingId} updated successfully.`);
            });
        }
        catch (error) {
            console.error("Error crawling showings:", error);
        }
    }
};
exports.ShowingWeeklyRepository = ShowingWeeklyRepository;
exports.ShowingWeeklyRepository = ShowingWeeklyRepository = ShowingWeeklyRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShowingWeeklyRepository);
//# sourceMappingURL=showing-weekly.repository.js.map
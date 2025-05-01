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
var UpdateWeeklyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWeeklyService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const event_weekly_repository_1 = require("./event-weekly.repository");
const front_display_weekly_repository_1 = require("./front-display-weekly.repository");
const showing_weekly_repository_1 = require("./showing-weekly.repository");
let UpdateWeeklyService = UpdateWeeklyService_1 = class UpdateWeeklyService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(UpdateWeeklyService_1.name);
        this.eventWeeklyRepository = new event_weekly_repository_1.EventWeeklyRepository(this.prisma);
        this.frontDisplayWeeklyRepository = new front_display_weekly_repository_1.FrontDisplayWeeklyRepository(this.prisma);
        this.showingWeeklyRepository = new showing_weekly_repository_1.ShowingWeeklyRepository(this.prisma);
    }
    async handleMondayJob() {
        this.logger.log('Running database update task on Monday...');
        return;
        for (let page = 1; page <= 20; page++) {
            await this.eventWeeklyRepository.fetchEventsFromTicketBox(page, "music");
            await this.eventWeeklyRepository.fetchEventsFromTicketBox(page, "theatersandart");
            await this.eventWeeklyRepository.fetchEventsFromTicketBox(page, "sport");
            await this.eventWeeklyRepository.fetchEventsFromTicketBox(page, "others");
        }
        await this.frontDisplayWeeklyRepository.updateFrontDisplayWeekly();
        await this.frontDisplayWeeklyRepository.updateLastScore();
        const eventIds = await this.prisma.events.findMany({
            select: { id: true },
        });
        for (const { id } of eventIds) {
            this.logger.log(`Processing event ID: ${id}`);
            await this.showingWeeklyRepository.fetchShowingForEventNoShowing(id);
        }
        const showingIds = await this.prisma.showing.findMany({
            select: { id: true },
        });
        for (const { id } of showingIds) {
            await this.showingWeeklyRepository.fetchSeatMapForShowingTransaction(id);
        }
    }
};
exports.UpdateWeeklyService = UpdateWeeklyService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * 1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UpdateWeeklyService.prototype, "handleMondayJob", null);
exports.UpdateWeeklyService = UpdateWeeklyService = UpdateWeeklyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UpdateWeeklyService);
//# sourceMappingURL=update-weekly.service.js.map
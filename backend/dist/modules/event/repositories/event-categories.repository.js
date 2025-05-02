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
exports.EventCategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const oxide_ts_1 = require("oxide.ts");
let EventCategoriesRepository = class EventCategoriesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(categoryId, eventId, isSpecial) {
        try {
            const eventCategory = await this.prisma.eventCategories.create({
                data: {
                    categoryId: categoryId,
                    eventId: eventId,
                    isSpecial: isSpecial || false,
                },
            });
            return (0, oxide_ts_1.Ok)(eventCategory);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to create category'));
        }
    }
    async updateByEventId(eventId, categoryIds) {
        try {
            const eventCategories = await this.prisma.eventCategories.findMany({ where: { eventId } });
            const currentCategoryIds = eventCategories.map(eventCategory => eventCategory.categoryId);
            const categoriesToAdd = categoryIds.filter(categoryId => !currentCategoryIds.includes(categoryId));
            const categoriesToRemove = currentCategoryIds.filter(categoryId => !categoryIds.includes(categoryId));
            await Promise.all(categoriesToAdd.map(categoryId => this.create(categoryId, eventId)));
            await Promise.all(categoriesToRemove.map(categoryId => this.prisma.eventCategories.deleteMany({ where: { categoryId: categoryId, eventId } })));
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to update categories'));
        }
    }
    async deleteByEventId(eventId) {
        try {
            await this.prisma.eventCategories.deleteMany({ where: { eventId } });
            return (0, oxide_ts_1.Ok)(undefined);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to delete categories'));
        }
    }
};
exports.EventCategoriesRepository = EventCategoriesRepository;
exports.EventCategoriesRepository = EventCategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventCategoriesRepository);
//# sourceMappingURL=event-categories.repository.js.map
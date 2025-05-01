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
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const oxide_ts_1 = require("oxide.ts");
let CategoriesRepository = class CategoriesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name) {
        try {
            const category = await this.prisma.categories.create({ data: { name: name, createdAt: new Date(Date.now()) } });
            return (0, oxide_ts_1.Ok)(category);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to create category'));
        }
    }
    async findAll() {
        try {
            const categories = await this.prisma.categories.findMany();
            return (0, oxide_ts_1.Ok)(categories);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve categories'));
        }
    }
    async findOne(id) {
        try {
            const category = await this.prisma.categories.findUnique({ where: { id } });
            if (!category)
                return (0, oxide_ts_1.Err)(new Error('Category not found'));
            return (0, oxide_ts_1.Ok)(category);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve category'));
        }
    }
    async remove(id) {
        try {
            await this.prisma.categories.delete({ where: { id: id >> 0 } });
            return (0, oxide_ts_1.Ok)(undefined);
        }
        catch (error) {
            console.log(error);
            return (0, oxide_ts_1.Err)(new Error('Failed to delete category'));
        }
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesRepository);
//# sourceMappingURL=categories.repository.js.map
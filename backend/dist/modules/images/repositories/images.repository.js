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
exports.ImagesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let ImagesRepository = class ImagesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(imageUrl) {
        return this.prisma.images.create({ data: { imageUrl } });
    }
    async findAll() {
        return this.prisma.images.findMany();
    }
    async findOne(id) {
        return this.prisma.images.findUnique({ where: { id } });
    }
    async update(id, imageUrl) {
        return this.prisma.images.update({ where: { id }, data: { imageUrl } });
    }
    async remove(id) {
        return this.prisma.images.delete({ where: { id } });
    }
};
exports.ImagesRepository = ImagesRepository;
exports.ImagesRepository = ImagesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImagesRepository);
//# sourceMappingURL=images.repository.js.map
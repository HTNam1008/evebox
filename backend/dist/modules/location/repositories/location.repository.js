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
exports.LocationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
let LocationRepository = class LocationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const location = await this.prisma.locations.findFirst({
            where: {
                street: data.street,
                ward: data.ward,
                districtId: data.districtId,
            },
        });
        if (location) {
            return location;
        }
        return this.prisma.locations.create({
            data: {
                street: data.street,
                ward: data.ward,
                districts: {
                    connect: { id: data.districtId },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.locations.findMany();
    }
    async findById(id) {
        return this.prisma.locations.findUnique({ where: { id } });
    }
    async update(id, data) {
        return this.prisma.locations.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.locations.delete({ where: { id } });
    }
};
exports.LocationRepository = LocationRepository;
exports.LocationRepository = LocationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationRepository);
//# sourceMappingURL=location.repository.js.map
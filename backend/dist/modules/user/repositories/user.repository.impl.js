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
exports.UserRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const user_entity_1 = require("../domain/entities/user.entity");
const email_vo_1 = require("../domain/value-objects/user/email.vo");
const user_id_vo_1 = require("../domain/value-objects/user/user-id.vo");
const password_vo_1 = require("../domain/value-objects/user/password.vo");
const role_vo_1 = require("../domain/value-objects/user/role.vo");
const name_vo_1 = require("../domain/value-objects/user/name.vo");
const phone_vo_1 = require("../domain/value-objects/user/phone.vo");
const province_id_vo_1 = require("../domain/value-objects/user/province-id.vo");
const cqrs_1 = require("@nestjs/cqrs");
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor(prisma, eventBus) {
        this.prisma = prisma;
        this.eventBus = eventBus;
    }
    async findByEmail(email) {
        const userRecord = await this.prisma.user.findUnique({
            where: { email: email.value },
            include: {
                role: true,
                userProvince: {
                    include: {
                        province: true,
                    },
                },
            },
        });
        if (!userRecord) {
            return null;
        }
        return this.mapToDomain(userRecord);
    }
    async publishEvents(events) {
        events.forEach((event) => this.eventBus.publish(event));
    }
    async save(user) {
        const userOrmData = this.mapToOrmData(user);
        await this.prisma.$transaction(async (tx) => {
            await tx.user.upsert({
                where: { id: userOrmData.id },
                update: {
                    name: userOrmData.name,
                    email: userOrmData.email,
                    password: userOrmData.password,
                    phone: userOrmData.phone,
                    role_id: userOrmData.role,
                },
                create: {
                    id: userOrmData.id,
                    name: userOrmData.name,
                    email: userOrmData.email,
                    password: userOrmData.password,
                    phone: userOrmData.phone,
                    role_id: userOrmData.role,
                },
            });
            await tx.userProvince.deleteMany({
                where: { userId: userOrmData.id },
            });
            if (userOrmData.provinceIds.length > 0) {
                console.log('provinceIds:', userOrmData.provinceIds);
                await tx.userProvince.createMany({
                    data: userOrmData.provinceIds.map((provinceId) => ({
                        userId: userOrmData.id,
                        provinceId: provinceId.value,
                    })),
                });
            }
        });
        const domainEvents = user.getDomainEvents();
        for (const event of domainEvents) {
            await this.eventBus.publish(event);
        }
        user.clearDomainEvents();
    }
    async saveRefreshToken(token, email, expiresAt) {
        await this.prisma.refreshToken.create({
            data: {
                token,
                email,
                expiresAt,
            },
        });
    }
    async revokeRefreshToken(email) {
        await this.prisma.refreshToken.updateMany({
            where: { email },
            data: { revoked: true },
        });
    }
    async revokeAllRefreshTokens(email) {
        await this.prisma.refreshToken.updateMany({
            where: {
                email: email,
                revoked: false,
            },
            data: {
                revoked: true,
            },
        });
    }
    async findRefreshToken(token) {
        return this.prisma.refreshToken.findUnique({
            where: { token },
        });
    }
    mapToDomain(userRecord) {
        const userIdOrError = user_id_vo_1.UserId.create(userRecord.id);
        if (userIdOrError.isErr()) {
            throw new Error(userIdOrError.unwrapErr().message);
        }
        const userId = userIdOrError.unwrap();
        const nameOrError = name_vo_1.Name.create(userRecord.name);
        if (nameOrError.isErr()) {
            throw new Error(nameOrError.unwrapErr().message);
        }
        const name = nameOrError.unwrap();
        const emailOrError = email_vo_1.Email.create(userRecord.email);
        if (emailOrError.isErr()) {
            throw new Error(emailOrError.unwrapErr().message);
        }
        const email = emailOrError.unwrap();
        const passwordOrError = password_vo_1.Password.createHashed(userRecord.password);
        if (passwordOrError.isErr()) {
            throw new Error(passwordOrError.unwrapErr().message);
        }
        const password = passwordOrError.unwrap();
        const phoneOrError = phone_vo_1.Phone.create(userRecord.phone);
        if (phoneOrError.isErr()) {
            throw new Error(phoneOrError.unwrapErr().message);
        }
        const phone = phoneOrError.unwrap();
        const roleOrError = role_vo_1.Role.create(userRecord.role.id);
        if (roleOrError.isErr()) {
            throw new Error(roleOrError.unwrapErr().message);
        }
        const role = roleOrError.unwrap();
        const provinceIdsOrError = province_id_vo_1.ProvinceId.createList(userRecord.userProvince.map((up) => up.province.id));
        if (provinceIdsOrError.isErr()) {
            throw new Error(provinceIdsOrError.unwrapErr().message);
        }
        const provinceIds = provinceIdsOrError.unwrap();
        const userOrError = user_entity_1.User.createExisting(userId, name, email, password, phone, role, provinceIds);
        if (userOrError.isErr()) {
            throw new Error(userOrError.unwrapErr().message);
        }
        return userOrError.unwrap();
    }
    mapToOrmData(user) {
        return {
            id: user.id.value,
            name: user.name.value,
            email: user.email.value,
            password: user.password.getHashedValue(),
            phone: user.phone.value,
            role: user.role.getValue(),
            provinceIds: user.provinceIds.map((p) => ({ value: p.value })),
        };
    }
    async saveOTP(otp, requestToken) {
        try {
            await this.prisma.$transaction(async (tx) => {
                await tx.otp.upsert({
                    where: {
                        requestToken: requestToken,
                    },
                    update: {
                        id: otp.id.value,
                        email: otp.email.value,
                        otp: otp.otp,
                        type: otp.type,
                        expiresAt: otp.expiresAt,
                        isUsed: otp.isUsed,
                        createdAt: otp.createdAt,
                    },
                    create: {
                        id: otp.id.value,
                        email: otp.email.value,
                        otp: otp.otp,
                        type: otp.type,
                        attempts: otp.attempts,
                        requestToken,
                        expiresAt: otp.expiresAt,
                        isUsed: otp.isUsed,
                        createdAt: otp.createdAt,
                    },
                });
                const events = otp.getDomainEvents();
                await this.publishEvents(events);
            });
        }
        catch (error) {
            throw new Error(`Failed to save OTP: ${error.message}`);
        }
    }
    async findValidOTP(email, otp, type, requestToken) {
        try {
            const now = new Date();
            return await this.prisma.otp.findFirst({
                where: {
                    AND: [
                        { requestToken },
                        { email },
                        { otp },
                        { type },
                        { isUsed: false },
                        { expiresAt: { gt: now } },
                    ],
                },
                select: {
                    id: true,
                    email: true,
                    otp: true,
                    type: true,
                    attempts: true,
                    requestToken: true,
                    expiresAt: true,
                    isUsed: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            throw new Error(`Failed to find valid OTP: ${error.message}`);
        }
    }
    async incrementOTPAttempts(request_token) {
        try {
            await this.prisma.otp.update({
                where: { requestToken: request_token },
                data: { attempts: { increment: 1 } },
            });
        }
        catch (error) {
            throw new Error(`Failed to increment OTP attempts: ${error.message}`);
        }
    }
    async getOTPAttempts(request_token) {
        try {
            const otp = await this.prisma.otp.findUnique({
                where: { requestToken: request_token },
                select: { attempts: true },
            });
            return otp?.attempts ?? null;
        }
        catch (error) {
            throw new Error(`Failed to get OTP attempts: ${error.message}`);
        }
    }
    async markOTPAsUsed(requestToken) {
        await this.prisma.otp.update({
            where: { requestToken },
            data: { isUsed: true },
        });
    }
    async findById() { }
    async removeAllRefreshTokens(email) {
        try {
            await this.prisma.refreshToken.deleteMany({
                where: {
                    email: email,
                },
            });
        }
        catch (error) {
            console.error('Error removing refresh tokens:', error);
            throw new Error('Failed to remove refresh tokens');
        }
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cqrs_1.EventBus])
], UserRepositoryImpl);
//# sourceMappingURL=user.repository.impl.js.map
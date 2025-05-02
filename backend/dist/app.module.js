"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cqrs_1 = require("@nestjs/cqrs");
const email_module_1 = require("./infrastructure/adapters/email/email.module");
const event_module_1 = require("./modules/event/event.module");
const user_module_1 = require("./modules/user/user.module");
const showing_module_1 = require("./modules/showing/showing.module");
const location_module_1 = require("./modules/location/location.module");
const cloudinary_module_1 = require("./infrastructure/adapters/cloudinary/cloudinary.module");
const images_module_1 = require("./modules/images/images.module");
const prisma_module_1 = require("./infrastructure/database/prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            cqrs_1.CqrsModule,
            email_module_1.EmailModule,
            cloudinary_module_1.CloudinaryModule,
            user_module_1.UserModule,
            event_module_1.EventModule,
            showing_module_1.ShowingModule,
            location_module_1.LocationModule,
            images_module_1.ImagesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
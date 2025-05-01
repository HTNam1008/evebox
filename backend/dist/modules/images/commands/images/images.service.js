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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../../../../infrastructure/adapters/cloudinary/cloudinary.service");
const images_repository_1 = require("../../repositories/images.repository");
const oxide_ts_1 = require("oxide.ts");
let ImagesService = class ImagesService {
    constructor(imagesRepository, cloudinaryService) {
        this.imagesRepository = imagesRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImage(fileBuffer, fileName) {
        try {
            const uploadResult = await this.cloudinaryService.uploadImage(fileBuffer, fileName);
            const image = await this.imagesRepository.create(uploadResult.secure_url);
            return (0, oxide_ts_1.Ok)(image);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to upload image'));
        }
    }
    async findAll() {
        try {
            const images = await this.imagesRepository.findAll();
            return (0, oxide_ts_1.Ok)(images);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve images'));
        }
    }
    async findOne(id) {
        try {
            const image = await this.imagesRepository.findOne(id);
            if (!image)
                return (0, oxide_ts_1.Err)(new Error('Image not found'));
            return (0, oxide_ts_1.Ok)(image);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve image'));
        }
    }
    async update(id, fileBuffer, fileName) {
        try {
            const image = await this.imagesRepository.findOne(id);
            if (!image)
                return (0, oxide_ts_1.Err)(new Error('Image not found'));
            const uploadResult = await this.cloudinaryService.uploadImage(fileBuffer, fileName);
            const updatedImage = await this.imagesRepository.update(id, uploadResult.secure_url);
            return (0, oxide_ts_1.Ok)(updatedImage);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to update image'));
        }
    }
    async remove(id) {
        try {
            const image = await this.imagesRepository.findOne(id);
            if (!image)
                return (0, oxide_ts_1.Err)(new Error('Image not found'));
            await this.imagesRepository.remove(id);
            return (0, oxide_ts_1.Ok)(undefined);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to delete image'));
        }
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [images_repository_1.ImagesRepository,
        cloudinary_service_1.CloudinaryService])
], ImagesService);
//# sourceMappingURL=images.service.js.map
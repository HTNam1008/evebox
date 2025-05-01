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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const images_service_1 = require("./images.service");
const error_handler_1 = require("../../../../shared/exceptions/error.handler");
const images_response_dto_1 = require("./images-response.dto");
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async uploadImage(file, res) {
        if (!file) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(error_handler_1.ErrorHandler.badRequest('No file uploaded'));
        }
        const result = await this.imagesService.uploadImage(file.buffer, file.originalname);
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json(error_handler_1.ErrorHandler.badRequest(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.CREATED).json({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Image uploaded successfully',
            data,
        });
    }
    async getImage(id, res) {
        const result = await this.imagesService.findOne(Number(id));
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json(error_handler_1.ErrorHandler.notFound(result.unwrapErr().message));
        }
        const data = result.unwrap();
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Image retrieved successfully',
            data,
        });
    }
    async updateImage(id, file, res) {
        const result = await this.imagesService.update(Number(id), file.buffer, file.originalname);
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json(error_handler_1.ErrorHandler.notFound(result.unwrapErr().message));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Image updated successfully',
        });
    }
    async removeImage(id, res) {
        const result = await this.imagesService.remove(Number(id));
        if (result.isErr()) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json(error_handler_1.ErrorHandler.notFound(result.unwrapErr().message));
        }
        return res.status(common_1.HttpStatus.OK).json({
            statusCode: common_1.HttpStatus.OK,
            message: 'Image deleted successfully',
        });
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Image uploaded successfully', type: images_response_dto_1.ImagesResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiQuery)({
        name: 'imageId',
        required: true,
        example: '1',
        description: 'The ID of the image to retrieve',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Get an image by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Image retrieved successfully', type: images_response_dto_1.ImagesResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an image by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Image updated successfully', type: images_response_dto_1.ImagesResponseDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Image not found' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an image by ID' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Image deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "removeImage", null);
exports.ImagesController = ImagesController = __decorate([
    (0, common_1.Controller)('api/images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map
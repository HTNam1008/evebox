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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const swagger_1 = require("@nestjs/swagger");
const categories_response_dto_1 = require("./categories-response.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async create(categoriesDto, res) {
        const result = await this.categoriesService.create(categoriesDto.name);
        if (result.isErr())
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: result.unwrapErr().message });
        return res.status(common_1.HttpStatus.CREATED).json(result.unwrap());
    }
    async findAll(res) {
        const result = await this.categoriesService.findAll();
        return res.status(common_1.HttpStatus.OK).json(result.unwrap());
    }
    async remove(id, res) {
        const result = await this.categoriesService.remove(id);
        if (result.isErr())
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: result.unwrapErr().message });
        return res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new category' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Category created successfully', type: categories_response_dto_1.CategoriesResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_response_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Categories retrieved successfully', type: categories_response_dto_1.CategoriesResponse }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete category by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('api/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map
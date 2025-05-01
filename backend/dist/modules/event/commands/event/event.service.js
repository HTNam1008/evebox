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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const event_repository_1 = require("../../repositories/event.repository");
const images_service_1 = require("../../../images/commands/images/images.service");
const location_service_1 = require("../../../location/commands/location.service");
const event_categories_repository_1 = require("../../repositories/event-categories.repository");
let EventService = class EventService {
    constructor(eventsRepository, imagesService, locationService, eventCategoriesRepository) {
        this.eventsRepository = eventsRepository;
        this.imagesService = imagesService;
        this.locationService = locationService;
        this.eventCategoriesRepository = eventCategoriesRepository;
    }
    async createEvent(createEventDto, files) {
        try {
            let imgLogoId = null;
            let imgPosterId = null;
            if (files.length > 1) {
                const uploadedImages = await Promise.all([
                    this.imagesService.uploadImage(files[0].buffer, createEventDto.title + '_logo'),
                    this.imagesService.uploadImage(files[1].buffer, createEventDto.title + '_poster'),
                ]);
                if (uploadedImages[0].isErr() || uploadedImages[1].isErr()) {
                    return (0, oxide_ts_1.Err)(new Error('Failed to upload images'));
                }
                imgLogoId = uploadedImages[0].unwrap().id;
                imgPosterId = uploadedImages[1].unwrap().id;
            }
            const location = await this.locationService.createLocation(createEventDto.locationString, createEventDto.wardString, createEventDto.provinceId, createEventDto.districtId);
            const newEvent = await this.eventsRepository.create(createEventDto, imgLogoId, imgPosterId, location.id);
            createEventDto.categoryIds.forEach(async (categoryId) => {
                await this.eventCategoriesRepository.create(newEvent.id, categoryId);
            });
            return (0, oxide_ts_1.Ok)(newEvent);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to create event'));
        }
    }
    async findAll() {
        try {
            const events = await this.eventsRepository.findAll();
            return (0, oxide_ts_1.Ok)(events);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve events'));
        }
    }
    async findOne(id) {
        try {
            const event = await this.eventsRepository.findOne(id);
            if (!event)
                return (0, oxide_ts_1.Err)(new Error('Event not found'));
            return (0, oxide_ts_1.Ok)(event);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to retrieve event'));
        }
    }
    async updateEvent(id, updateEventDto, files) {
        try {
            let imgLogoId = null;
            let imgPosterId = null;
            if (files.length > 1) {
                const uploadedImages = await Promise.all([
                    this.imagesService.update(updateEventDto.imgLogoId, files[0].buffer, updateEventDto.title || '' + '_logo'),
                    this.imagesService.update(updateEventDto.imgPosterId, files[1].buffer, updateEventDto.title || '' + '_poster'),
                ]);
                if (uploadedImages[0].isErr() || uploadedImages[1].isErr()) {
                    return (0, oxide_ts_1.Err)(new Error('Failed to upload images'));
                }
                imgLogoId = uploadedImages[0].unwrap().id;
                imgPosterId = uploadedImages[1].unwrap().id;
            }
            const updatedEvent = await this.eventsRepository.update(id, updateEventDto, imgLogoId, imgPosterId);
            await this.eventCategoriesRepository.updateByEventId(id, updateEventDto.categoryIds);
            return (0, oxide_ts_1.Ok)(updatedEvent);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to update event'));
        }
    }
    async deleteEvent(id) {
        try {
            await this.eventsRepository.delete(id);
            await this.eventCategoriesRepository.deleteByEventId(id);
            return (0, oxide_ts_1.Ok)(undefined);
        }
        catch (error) {
            return (0, oxide_ts_1.Err)(new Error('Failed to delete event'));
        }
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventRepository,
        images_service_1.ImagesService,
        location_service_1.LocationService,
        event_categories_repository_1.EventCategoriesRepository])
], EventService);
//# sourceMappingURL=event.service.js.map
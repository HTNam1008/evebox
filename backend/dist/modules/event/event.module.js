"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const front_display_controller_1 = require("./commands/front-display/front-display.controller");
const front_display_service_1 = require("./commands/front-display/front-display.service");
const search_controller_1 = require("./commands/search/search.controller");
const search_service_1 = require("./commands/search/search.service");
const event_search_repository_1 = require("./repositories/event-search.repository");
const event_frontdisplay_repository_1 = require("./repositories/event-frontdisplay.repository");
const event_detail_repository_1 = require("./repositories/event-detail.repository");
const detail_service_1 = require("./commands/detail/detail.service");
const detail_controller_1 = require("./commands/detail/detail.controller");
const update_weekly_service_1 = require("./tasks/update-weekly.service");
const schedule_1 = require("@nestjs/schedule");
const categories_controller_1 = require("./commands/categories/categories.controller");
const categories_service_1 = require("./commands/categories/categories.service");
const categories_repository_1 = require("./repositories/categories.repository");
const event_categories_repository_1 = require("./repositories/event-categories.repository");
const event_service_1 = require("./commands/event/event.service");
const event_repository_1 = require("./repositories/event.repository");
const event_controller_1 = require("./commands/event/event.controller");
const images_module_1 = require("../images/images.module");
const location_module_1 = require("../location/location.module");
let EventModule = class EventModule {
};
exports.EventModule = EventModule;
exports.EventModule = EventModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), images_module_1.ImagesModule, location_module_1.LocationModule],
        controllers: [event_controller_1.EventController, front_display_controller_1.FrontDisplayController, search_controller_1.SearchController, detail_controller_1.EventDetailController, categories_controller_1.CategoriesController],
        providers: [front_display_service_1.FrontDisplayService, search_service_1.SearchService, update_weekly_service_1.UpdateWeeklyService,
            detail_service_1.EventDetailService, categories_service_1.CategoriesService, event_service_1.EventService,
            event_frontdisplay_repository_1.EventFrontDisplayRepository, event_detail_repository_1.EventDetailRepository, event_search_repository_1.EventSearchRepository,
            categories_repository_1.CategoriesRepository, event_categories_repository_1.EventCategoriesRepository, event_repository_1.EventRepository,
        ],
    })
], EventModule);
//# sourceMappingURL=event.module.js.map
import { Module } from "@nestjs/common";

import { GetOrgRevenueController } from "./queries/getOrgRevenue/getOrgRevenue.controller";
import { GetOrgRevenueRepository } from "./repositories/getOrgRevenue.repository";
import { GetOrgRevenueService } from "./queries/getOrgRevenue/getOrgRevenue.service";
import { GetOrgRevenueByIdController } from "./queries/getOrgRevenueById/getOrgRevenueById.controller";
import { GetOrgRevenueByIdRepository } from "./repositories/getOrgRevenueById.repository";
import { GetOrgRevenueByIdService } from "./queries/getOrgRevenueById/getOrgRevenueById.service";
import { GetEventRevenueDetailController } from "./queries/getEventRevenueDetail/getEventRevenueDetail.controller";
import { GetEventRevenueDetailRepository } from "./repositories/getEventRevenueDetail.repository";
import { GetEventRevenueDetailService } from "./queries/getEventRevenueDetail/getEventRevenueDetail.service";
import { GetSummaryTicketRevenueController } from "./queries/getSummaryTicketRevenue/getSummaryTicketRevenue.controller";
import { GetSummaryTicketRevenueRepository } from "./repositories/getSummaryTicketRevenue.repository";
import { GetSummaryTicketRevenueService } from "./queries/getSummaryTicketRevenue/getSummaryTicketRevenue.service";
import { GetOrgRevenueByProvinceController } from "./queries/getOrgRevenueByProvince/getOrgRevenueByProvince.controller";
import { GetOrgRevenueByProvinceRepository } from "./repositories/getOrgRevenueByProvince.repository";
import { GetOrgRevenueByProvinceService } from "./queries/getOrgRevenueByProvince/getOrgRevenueByProvince.service";
import { GetRevenueByTicketPriceController } from "./queries/getRevenueByTicketPrice/getRevenueByTicketPrice.controller";
import { GetRevenueByTicketPriceRepository } from "./repositories/getRevenueByTicketPrice.repository";
import { GetRevenueByTicketPriceService } from "./queries/getRevenueByTicketPrice/getRevenueByTicketPrice.service";

@Module({
  controllers: [
    GetOrgRevenueController,
    GetOrgRevenueByIdController,
    GetEventRevenueDetailController,
    GetSummaryTicketRevenueController,
    GetOrgRevenueByProvinceController,
    GetRevenueByTicketPriceController
  ],
  providers: [
    GetOrgRevenueRepository,
    GetOrgRevenueService,

    GetOrgRevenueByIdRepository,
    GetOrgRevenueByIdService,

    GetEventRevenueDetailRepository,
    GetEventRevenueDetailService,

    GetSummaryTicketRevenueRepository,
    GetSummaryTicketRevenueService,

    GetOrgRevenueByProvinceRepository,
    GetOrgRevenueByProvinceService,

    GetRevenueByTicketPriceRepository,
    GetRevenueByTicketPriceService
  ],
})

export class AdminModule {}
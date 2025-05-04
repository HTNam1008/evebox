import { Module } from "@nestjs/common";

import { GetOrgRevenueController } from "./queries/getOrgRevenue/getOrgRevenue.controller";
import { GetOrgRevenueRepository } from "./repositories/getOrgRevenue.repository";
import { GetOrgRevenueService } from "./queries/getOrgRevenue/getOrgRevenue.service";
import { GetOrgRevenueByIdController } from "./queries/getOrgRevenueById/getOrgRevenueById.controller";
import { GetOrgRevenueByIdRepository } from "./repositories/getOrgRevenueById.repository";
import { GetOrgRevenueByIdService } from "./queries/getOrgRevenueById/getOrgRevenueById.service";
import { GetOrgRevenueByProvinceController } from "./queries/getOrgRevenueByProvince/getOrgRevenueByProvince.controller";
import { GetOrgRevenueByProvinceRepository } from "./repositories/getOrgRevenueByProvince.repository";
import { GetOrgRevenueByProvinceService } from "./queries/getOrgRevenueByProvince/getOrgRevenueByProvince.service";

@Module({
  controllers: [
    GetOrgRevenueController,
    GetOrgRevenueByIdController,
    GetOrgRevenueByProvinceController
  ],
  providers: [
    GetOrgRevenueRepository,
    GetOrgRevenueService,

    GetOrgRevenueByIdRepository,
    GetOrgRevenueByIdService,

    GetOrgRevenueByProvinceRepository,
    GetOrgRevenueByProvinceService
  ],
})

export class AdminModule {}
import { Module } from "@nestjs/common";

import { CreateOrgPaymentInfoController } from "./commands/createOrgPaymentInfo/createOrgPaymentInfo.controller";
import { CreateOrgPaymentInfoService } from "./commands/createOrgPaymentInfo/createOrgPaymentInfo.service";
import { CreateOrgPaymentInfoRepository } from "./repositories/createOrgPaymentInfo.repository";
import { UpdateOrgPaymentInfoController } from "./commands/updateOrgPaymentInfo/updateOrgPaymentInfo.controller";
import { UpdateOrgPaymentInfoService } from "./commands/updateOrgPaymentInfo/updateOrgPaymentInfo.service";
import { UpdateOrgPaymentInfoRepository } from "./repositories/updateOrgPaymentInfo.repository";
import { DeleteOrgPaymentInfoController } from "./commands/deleteOrgPaymentInfo/deleteOrgPaymentInfo.controller";
import { DeleteOrgPaymentInfoService } from "./commands/deleteOrgPaymentInfo/deleteOrgPaymentInfo.service";
import { DeleteOrgPaymentInfoRepository } from "./repositories/deleteOrgPaymentInfo.repository";
import { GetOrgPaymentInfoController } from "./commands/queries/getOrgPaymentInfo/getOrgPaymentInfo.controller";
import { GetOrgPaymentInfoService } from "./commands/queries/getOrgPaymentInfo/getOrgPaymentInfo.service";
import { GetOrgPaymentInfoRepository } from "./repositories/getOrgPaymentInfo.repository";

@Module({
  controllers: [
    GetOrgPaymentInfoController,

    CreateOrgPaymentInfoController,
    UpdateOrgPaymentInfoController,
    DeleteOrgPaymentInfoController,
  ],

  providers: [
    CreateOrgPaymentInfoService,
    CreateOrgPaymentInfoRepository,
    UpdateOrgPaymentInfoService,
    UpdateOrgPaymentInfoRepository,
    DeleteOrgPaymentInfoService,
    DeleteOrgPaymentInfoRepository,

    GetOrgPaymentInfoService,
    GetOrgPaymentInfoRepository,
  ],
})

export class PaymentModule {}
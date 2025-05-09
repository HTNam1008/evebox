import { CreateOrgPaymentInfoServiceV2 } from './commands/createOrgPaymentInfoV2/createOrgPaymentInfo.service';
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
import { CreateOrgPaymentInfoControllerV2 } from "./commands/createOrgPaymentInfoV2/createOrgPaymentInfo.controller";
import { UpdateOrgPaymentInfoControllerV2 } from './commands/updateOrgPaymentInfoV2/updateOrgPaymentInfo.controller';
import { UpdateOrgPaymentInfoServiceV2 } from './commands/updateOrgPaymentInfoV2/updateOrgPaymentInfo.service';
import { DeleteOrgPaymentInfoControllerV2 } from './commands/deleteOrgPaymentInfoV2/deleteOrgPaymentInfo.controller';
import { DeleteOrgPaymentInfoServiceV2 } from './commands/deleteOrgPaymentInfoV2/deleteOrgPaymentInfo.service';
import { GetOrgPaymentInfoControllerV2 } from './commands/queries/getOrgPaymentInfoV2/getOrgPaymentInfo.controller';
import { GetOrgPaymentInfoServiceV2 } from './commands/queries/getOrgPaymentInfoV2/getOrgPaymentInfo.service';

@Module({
  controllers: [
    GetOrgPaymentInfoController,

    CreateOrgPaymentInfoController,
    UpdateOrgPaymentInfoController,
    DeleteOrgPaymentInfoController,

    CreateOrgPaymentInfoControllerV2,
    UpdateOrgPaymentInfoControllerV2,
    DeleteOrgPaymentInfoControllerV2,
    GetOrgPaymentInfoControllerV2,
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

    CreateOrgPaymentInfoServiceV2,
    UpdateOrgPaymentInfoServiceV2,
    DeleteOrgPaymentInfoServiceV2,
    GetOrgPaymentInfoServiceV2,
  ],
})

export class PaymentModule {}
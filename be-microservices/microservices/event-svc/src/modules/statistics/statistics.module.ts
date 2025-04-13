import { Get, Module } from '@nestjs/common'

import { GetEventSummaryController } from './queries/getSummary/getSummary.controller'
import { GetEventSummaryService } from './queries/getSummary/getSummary.service'
import { GetEventSummaryRepository } from './repositories/getSummary.repository'
import { GetOrdersRepository } from './repositories/getOrders.repository'
import { GetOrdersController } from './queries/getOrders/getOrders.controller'
import { GetOrdersService } from './queries/getOrders/getOrders.service'

@Module({
  controllers: [
    GetEventSummaryController,
    GetOrdersController,
  ],
  providers: [
    GetEventSummaryService,
    GetEventSummaryRepository,

    GetOrdersRepository,
    GetOrdersService,
  ]
})

export class StatisticsModule {}
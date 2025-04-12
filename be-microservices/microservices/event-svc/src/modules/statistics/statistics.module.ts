import { Get, Module } from '@nestjs/common'

import { GetEventSummaryController } from './queries/getSummary/getSummary.controller'
import { GetEventSummaryService } from './queries/getSummary/getSummary.service'
import { GetEventSummaryRepository } from './repositories/getSummary.repository'
import { GetOrdersRepository } from './repositories/getOrders.repository'

@Module({
  controllers: [
    GetEventSummaryController
  ],
  providers: [
    GetEventSummaryService,
    GetEventSummaryRepository,

    GetOrdersRepository,
  ]
})

export class StatisticsModule {}
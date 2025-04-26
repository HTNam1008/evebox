import { Get, Module } from '@nestjs/common'

import { GetEventSummaryController } from './queries/getSummary/getSummary.controller'
import { GetEventSummaryService } from './queries/getSummary/getSummary.service'
import { GetEventSummaryRepository } from './repositories/getSummary.repository'
import { GetOrdersRepository } from './repositories/getOrders.repository'
import { GetOrdersController } from './queries/getOrders/getOrders.controller'
import { GetOrdersService } from './queries/getOrders/getOrders.service'
import { StatisticsService } from './queries/getAnalytics/getAnalytics.service'
import { StatisticsRepository } from './repositories/getAnalytics.repository'
import { GetAnalyticsController } from './queries/getAnalytics/getAnalytics.controller'

@Module({
  controllers: [
    GetEventSummaryController,
    GetOrdersController,
    GetAnalyticsController
  ],
  providers: [
    GetEventSummaryService,
    GetEventSummaryRepository,

    GetOrdersRepository,
    GetOrdersService,

    StatisticsService,
    StatisticsRepository
  ]
})

export class StatisticsModule {}
import { Get, Module } from '@nestjs/common'

import { GetEventSummaryController } from './queries/getSummary/getSummary.controller'
import { GetEventSummaryService } from './queries/getSummary/getSummary.service'
import { GetEventSummaryRepository } from './repositories/getSummary.repository'

@Module({
  controllers: [
    GetEventSummaryController
  ],
  providers: [
    GetEventSummaryService,
    GetEventSummaryRepository
  ]
})

export class StatisticsModule {}
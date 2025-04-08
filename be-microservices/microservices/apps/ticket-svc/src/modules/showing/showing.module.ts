import { Module } from '@nestjs/common';
import { getShowingDetailController } from './queries/getShowingDetail/getShowingDetail.controller';
import { getShowingDetailService } from './queries/getShowingDetail/getShowingDetail.service';
import { getShowingDetailRepository } from './repositories/getShowingDetail.repository';
import { getAllShowingController } from './queries/getAllShowing/getAllShowing.controller';
import { getAllShowingService } from './queries/getAllShowing/getAllShowing.service';
import { getAllShowingRepository } from './repositories/getAllShowing.repository';
import { getShowingSeatmapController } from './queries/getShowingSeatmap/getShowingSeatmap.controller';
import { getShowingSeatmapService } from './queries/getShowingSeatmap/getShowingSeatmap.service';
import { getShowingSeatmapRepository } from './repositories/getShowingSeatmap.repository';
import { getFormOfShowingController } from './queries/getFormOfShowing/getFormOfShowing.controller';
import { getFormOfShowingService } from './queries/getFormOfShowing/getFormOfShowing.service';
import { getFormOfShowingRepository } from './repositories/getFormOfShowing.repository';

@Module({
  controllers: 
    [
      getShowingDetailController,
      getAllShowingController,
      getShowingSeatmapController,
      getFormOfShowingController,
    ],
  providers: 
    [
      getShowingDetailService,
      getShowingDetailRepository,

      getAllShowingService,
      getAllShowingRepository,
      
      getShowingSeatmapService,
      getShowingSeatmapRepository,

      getFormOfShowingService,
      getFormOfShowingRepository,
    ],
})
export class ShowingModule {}
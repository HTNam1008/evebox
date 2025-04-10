// evebox.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { EveBoxRepository } from './evebox.repository';
import { EveBoxService } from './evebox.service';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],
  providers: [EveBoxRepository, EveBoxService],
})
export class EveboxModule {}

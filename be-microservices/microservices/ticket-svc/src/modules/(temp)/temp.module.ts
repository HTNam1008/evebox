import { Module } from '@nestjs/common';
import { TempController } from './temp.controller';

@Module({
  imports: [],
  controllers: [TempController],
  providers: [],
})
export class TempModule {}
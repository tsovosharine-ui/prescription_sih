import { Module } from '@nestjs/common';
import { TransfusionService } from './transfusion.service';
import { TransfusionController } from './transfusion.controller';

@Module({
  providers: [TransfusionService],
  controllers: [TransfusionController],
})
export class TransfusionModule {}

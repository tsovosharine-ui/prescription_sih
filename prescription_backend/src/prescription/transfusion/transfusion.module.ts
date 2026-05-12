import { Module } from '@nestjs/common';
import { TransfusionService } from './transfusion.service';
import { TransfusionController } from './transfusion.controller';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [TransfusionService],
  controllers: [TransfusionController],
})
export class TransfusionModule {}

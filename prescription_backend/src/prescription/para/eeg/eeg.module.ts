import { Module } from '@nestjs/common';
import { EegService } from './eeg.service';
import { EegController } from './eeg.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [EegService],
  controllers: [EegController],
})
export class EegModule {}

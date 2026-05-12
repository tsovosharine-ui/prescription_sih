import { Module } from '@nestjs/common';
import { LaboService } from './labo.service';
import { LaboController } from './labo.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [LaboService],
  controllers: [LaboController],
})
export class LaboModule {}

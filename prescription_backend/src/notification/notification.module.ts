import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrescriptionNotifierService } from './prescription-notifier.service';

@Module({
  providers: [NotificationGateway, NotificationService, PrescriptionNotifierService],
  controllers: [NotificationController],
  exports: [NotificationGateway, NotificationService, PrescriptionNotifierService],
})
export class NotificationModule {}

import { Module } from '@nestjs/common';
import { KineService } from './kine.service';
import { KineController } from './kine.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [KineService],
  controllers: [KineController],
})
export class KineModule {}

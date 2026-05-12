import { Module } from '@nestjs/common';
import { ImagerieService } from './imagerie.service';
import { ImagerieController } from './imagerie.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [ImagerieService],
  controllers: [ImagerieController],
})
export class ImagerieModule {}

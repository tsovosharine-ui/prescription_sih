import { Module } from '@nestjs/common';
import { EndoscopieService } from './endoscopie.service';
import { EndoscopieController } from './endoscopie.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [EndoscopieService],
  controllers: [EndoscopieController],
})
export class EndoscopieModule {}

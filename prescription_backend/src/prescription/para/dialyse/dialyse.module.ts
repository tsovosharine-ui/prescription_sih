import { Module } from '@nestjs/common';
import { DialyseService } from './dialyse.service';
import { DialyseController } from './dialyse.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [DialyseService],
  controllers: [DialyseController],
})
export class DialyseModule {}

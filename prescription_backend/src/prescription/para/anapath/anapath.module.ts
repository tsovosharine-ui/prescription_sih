import { Module } from '@nestjs/common';
import { AnapathService } from './anapath.service';
import { AnapathController } from './anapath.controller';
import { NotificationModule } from '../../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [AnapathService],
  controllers: [AnapathController],
})
export class AnapathModule {}

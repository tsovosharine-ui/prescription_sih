import { Module } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { BlocController } from './bloc.controller';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [BlocService],
  controllers: [BlocController],
})
export class BlocModule {}

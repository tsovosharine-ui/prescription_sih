import { Module } from '@nestjs/common';
import { MedicaleService } from './medicale.service';
import { MedicaleController } from './medicale.controller';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [MedicaleService],
  controllers: [MedicaleController],
})
export class MedicaleModule {}

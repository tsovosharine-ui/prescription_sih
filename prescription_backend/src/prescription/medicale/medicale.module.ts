import { Module } from '@nestjs/common';
import { MedicaleService } from './medicale.service';
import { MedicaleController } from './medicale.controller';

@Module({
  providers: [MedicaleService],
  controllers: [MedicaleController],
})
export class MedicaleModule {}

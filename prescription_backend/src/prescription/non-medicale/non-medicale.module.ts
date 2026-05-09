import { Module } from '@nestjs/common';
import { NonMedicaleService } from './non-medicale.service';
import { NonMedicaleController } from './non-medicale.controller';

@Module({ providers: [NonMedicaleService], controllers: [NonMedicaleController] })
export class NonMedicaleModule {}

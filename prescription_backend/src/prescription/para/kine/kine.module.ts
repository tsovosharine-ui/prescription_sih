import { Module } from '@nestjs/common';
import { KineService } from './kine.service';
import { KineController } from './kine.controller';

@Module({ providers: [KineService], controllers: [KineController] })
export class KineModule {}

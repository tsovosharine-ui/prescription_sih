import { Module } from '@nestjs/common';
import { ImagerieService } from './imagerie.service';
import { ImagerieController } from './imagerie.controller';

@Module({ providers: [ImagerieService], controllers: [ImagerieController] })
export class ImagerieModule {}

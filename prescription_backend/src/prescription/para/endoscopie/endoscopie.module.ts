import { Module } from '@nestjs/common';
import { EndoscopieService } from './endoscopie.service';
import { EndoscopieController } from './endoscopie.controller';

@Module({ providers: [EndoscopieService], controllers: [EndoscopieController] })
export class EndoscopieModule {}

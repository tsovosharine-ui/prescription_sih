import { Module } from '@nestjs/common';
import { EegService } from './eeg.service';
import { EegController } from './eeg.controller';

@Module({ providers: [EegService], controllers: [EegController] })
export class EegModule {}

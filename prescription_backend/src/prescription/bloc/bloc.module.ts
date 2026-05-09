import { Module } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { BlocController } from './bloc.controller';

@Module({ providers: [BlocService], controllers: [BlocController] })
export class BlocModule {}

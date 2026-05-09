import { Module } from '@nestjs/common';
import { AnapathService } from './anapath.service';
import { AnapathController } from './anapath.controller';

@Module({ providers: [AnapathService], controllers: [AnapathController] })
export class AnapathModule {}

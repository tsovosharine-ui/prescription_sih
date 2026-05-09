import { Module } from '@nestjs/common';
import { DialyseService } from './dialyse.service';
import { DialyseController } from './dialyse.controller';

@Module({ providers: [DialyseService], controllers: [DialyseController] })
export class DialyseModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { NotificationModule } from './notification/notification.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { MedicaleModule } from './prescription/medicale/medicale.module';
import { NonMedicaleModule } from './prescription/non-medicale/non-medicale.module';
import { SurveillanceModule } from './prescription/surveillance/surveillance.module';
import { TransfusionModule } from './prescription/transfusion/transfusion.module';
import { BlocModule } from './prescription/bloc/bloc.module';
import { LaboModule } from './prescription/para/labo/labo.module';
import { ImagerieModule } from './prescription/para/imagerie/imagerie.module';
import { AnapathModule } from './prescription/para/anapath/anapath.module';
import { EegModule } from './prescription/para/eeg/eeg.module';
import { KineModule } from './prescription/para/kine/kine.module';
import { DialyseModule } from './prescription/para/dialyse/dialyse.module';
import { EndoscopieModule } from './prescription/para/endoscopie/endoscopie.module';

@Module({
  imports: [
    NotificationModule,
    PrismaModule,
    AuthModule,
    PatientModule,
    MedicaleModule,
    NonMedicaleModule,
    SurveillanceModule,
    TransfusionModule,
    BlocModule,
    LaboModule,
    ImagerieModule,
    AnapathModule,
    EegModule,
    KineModule,
    DialyseModule,
    EndoscopieModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}

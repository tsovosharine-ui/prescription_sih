"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_exception_filter_1 = require("./common/filters/prisma-exception.filter");
const notification_module_1 = require("./notification/notification.module");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const patient_module_1 = require("./patient/patient.module");
const medicale_module_1 = require("./prescription/medicale/medicale.module");
const non_medicale_module_1 = require("./prescription/non-medicale/non-medicale.module");
const surveillance_module_1 = require("./prescription/surveillance/surveillance.module");
const transfusion_module_1 = require("./prescription/transfusion/transfusion.module");
const bloc_module_1 = require("./prescription/bloc/bloc.module");
const labo_module_1 = require("./prescription/para/labo/labo.module");
const imagerie_module_1 = require("./prescription/para/imagerie/imagerie.module");
const anapath_module_1 = require("./prescription/para/anapath/anapath.module");
const eeg_module_1 = require("./prescription/para/eeg/eeg.module");
const kine_module_1 = require("./prescription/para/kine/kine.module");
const dialyse_module_1 = require("./prescription/para/dialyse/dialyse.module");
const endoscopie_module_1 = require("./prescription/para/endoscopie/endoscopie.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            notification_module_1.NotificationModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            patient_module_1.PatientModule,
            medicale_module_1.MedicaleModule,
            non_medicale_module_1.NonMedicaleModule,
            surveillance_module_1.SurveillanceModule,
            transfusion_module_1.TransfusionModule,
            bloc_module_1.BlocModule,
            labo_module_1.LaboModule,
            imagerie_module_1.ImagerieModule,
            anapath_module_1.AnapathModule,
            eeg_module_1.EegModule,
            kine_module_1.KineModule,
            dialyse_module_1.DialyseModule,
            endoscopie_module_1.EndoscopieModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_exception_filter_1.PrismaExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
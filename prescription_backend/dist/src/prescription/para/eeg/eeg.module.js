"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EegModule = void 0;
const common_1 = require("@nestjs/common");
const eeg_service_1 = require("./eeg.service");
const eeg_controller_1 = require("./eeg.controller");
const notification_module_1 = require("../../../notification/notification.module");
let EegModule = class EegModule {
};
exports.EegModule = EegModule;
exports.EegModule = EegModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [eeg_service_1.EegService],
        controllers: [eeg_controller_1.EegController],
    })
], EegModule);
//# sourceMappingURL=eeg.module.js.map
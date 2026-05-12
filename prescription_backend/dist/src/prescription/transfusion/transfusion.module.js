"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfusionModule = void 0;
const common_1 = require("@nestjs/common");
const transfusion_service_1 = require("./transfusion.service");
const transfusion_controller_1 = require("./transfusion.controller");
const notification_module_1 = require("../../notification/notification.module");
let TransfusionModule = class TransfusionModule {
};
exports.TransfusionModule = TransfusionModule;
exports.TransfusionModule = TransfusionModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [transfusion_service_1.TransfusionService],
        controllers: [transfusion_controller_1.TransfusionController],
    })
], TransfusionModule);
//# sourceMappingURL=transfusion.module.js.map
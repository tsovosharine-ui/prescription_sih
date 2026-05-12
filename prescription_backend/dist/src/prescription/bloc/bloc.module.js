"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlocModule = void 0;
const common_1 = require("@nestjs/common");
const bloc_service_1 = require("./bloc.service");
const bloc_controller_1 = require("./bloc.controller");
const notification_module_1 = require("../../notification/notification.module");
let BlocModule = class BlocModule {
};
exports.BlocModule = BlocModule;
exports.BlocModule = BlocModule = __decorate([
    (0, common_1.Module)({
        imports: [notification_module_1.NotificationModule],
        providers: [bloc_service_1.BlocService],
        controllers: [bloc_controller_1.BlocController],
    })
], BlocModule);
//# sourceMappingURL=bloc.module.js.map
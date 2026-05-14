"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EegController = void 0;
const common_1 = require("@nestjs/common");
const eeg_service_1 = require("./eeg.service");
const create_eeg_dto_1 = require("./dto/create-eeg.dto");
let EegController = class EegController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(req, dto) {
        return this.service.create(req.user.sub, dto);
    }
    findByPatient(patientId) {
        return this.service.findByPatient(patientId);
    }
};
exports.EegController = EegController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_eeg_dto_1.CreateEEGDto]),
    __metadata("design:returntype", void 0)
], EegController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EegController.prototype, "findByPatient", null);
exports.EegController = EegController = __decorate([
    (0, common_1.Controller)('prescriptions/eeg'),
    __metadata("design:paramtypes", [eeg_service_1.EegService])
], EegController);
//# sourceMappingURL=eeg.controller.js.map
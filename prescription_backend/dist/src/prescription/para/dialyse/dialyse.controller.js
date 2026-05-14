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
exports.DialyseController = void 0;
const common_1 = require("@nestjs/common");
const dialyse_service_1 = require("./dialyse.service");
const create_dialyse_dto_1 = require("./dto/create-dialyse.dto");
let DialyseController = class DialyseController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto.prescripteurId, dto);
    }
    findByPatient(patientId) {
        return this.service.findByPatient(patientId);
    }
};
exports.DialyseController = DialyseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dialyse_dto_1.CreateDialyseDto]),
    __metadata("design:returntype", void 0)
], DialyseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DialyseController.prototype, "findByPatient", null);
exports.DialyseController = DialyseController = __decorate([
    (0, common_1.Controller)('prescriptions/dialyse'),
    __metadata("design:paramtypes", [dialyse_service_1.DialyseService])
], DialyseController);
//# sourceMappingURL=dialyse.controller.js.map
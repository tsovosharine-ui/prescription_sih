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
exports.MedicaleController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const medicale_service_1 = require("./medicale.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const create_medicale_dto_1 = require("./dto/create-medicale.dto");
let MedicaleController = class MedicaleController {
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
    findOne(id) {
        return this.service.findOne(id);
    }
    createOrdonnance(id, dto) {
        return this.service.createOrdonnance(id, dto.medicaments);
    }
    updateStatut(id, dto) {
        return this.service.updateStatut(id, dto.statut);
    }
};
exports.MedicaleController = MedicaleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_medicale_dto_1.CreateMedicaleDto]),
    __metadata("design:returntype", void 0)
], MedicaleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicaleController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicaleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/ordonnance'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MedicaleController.prototype, "createOrdonnance", null);
__decorate([
    (0, common_1.Put)(':id/statut'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MedicaleController.prototype, "updateStatut", null);
exports.MedicaleController = MedicaleController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('prescriptions/medicale'),
    __metadata("design:paramtypes", [medicale_service_1.MedicaleService])
], MedicaleController);
//# sourceMappingURL=medicale.controller.js.map
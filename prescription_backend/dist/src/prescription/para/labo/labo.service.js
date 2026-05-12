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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const prescription_notifier_service_1 = require("../../../notification/prescription-notifier.service");
let LaboService = class LaboService {
    prisma;
    notifier;
    constructor(prisma, notifier) {
        this.prisma = prisma;
        this.notifier = notifier;
    }
    async create(prescripteurId, dto) {
        const prescription = await this.prisma.prescriptionLabo.create({
            data: { ...dto, prescripteurId },
        });
        await this.notifier.notify({
            type: 'labo',
            expediteurId: prescripteurId,
            patientId: prescription.patientId,
            referenceId: prescription.id,
            referenceType: 'prescriptionLabo',
            urgence: prescription.urgence,
        });
        return prescription;
    }
    async findByPatient(patientId) {
        return this.prisma.prescriptionLabo.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const p = await this.prisma.prescriptionLabo.findUnique({ where: { id } });
        if (!p)
            throw new common_1.NotFoundException('Prescription introuvable');
        return p;
    }
    async updateStatut(id, statut) {
        return this.prisma.prescriptionLabo.update({ where: { id }, data: { statut } });
    }
};
exports.LaboService = LaboService;
exports.LaboService = LaboService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prescription_notifier_service_1.PrescriptionNotifierService])
], LaboService);
//# sourceMappingURL=labo.service.js.map
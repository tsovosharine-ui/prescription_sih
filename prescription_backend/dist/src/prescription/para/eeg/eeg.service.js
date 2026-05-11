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
exports.EegService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let EegService = class EegService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(prescripteurId, dto) {
        return this.prisma.prescriptionEEG.create({ data: { ...dto, prescripteurId } });
    }
    async findByPatient(patientId) {
        return this.prisma.prescriptionEEG.findMany({
            where: { patientId },
            include: { prescripteur: { select: { nom: true, prenoms: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const p = await this.prisma.prescriptionEEG.findUnique({
            where: { id },
            include: { prescripteur: { select: { nom: true, prenoms: true } }, patient: true },
        });
        if (!p)
            throw new common_1.NotFoundException('Prescription introuvable');
        return p;
    }
    async updateStatut(id, statut) {
        return this.prisma.prescriptionEEG.update({ where: { id }, data: { statut } });
    }
};
exports.EegService = EegService;
exports.EegService = EegService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EegService);
//# sourceMappingURL=eeg.service.js.map
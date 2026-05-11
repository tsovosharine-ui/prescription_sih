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
exports.MedicaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MedicaleService = class MedicaleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(prescripteurId, dto) {
        const { medicaments, ...rest } = dto;
        const prescription = await this.prisma.prescriptionMedicale.create({
            data: {
                ...rest,
                prescripteurId,
                medicaments: { create: medicaments },
            },
            include: { medicaments: true, ordonnance: true },
        });
        console.log('Prescription créée:', prescription.id);
        return prescription;
    }
    async findByPatient(patientId) {
        return this.prisma.prescriptionMedicale.findMany({
            where: { patientId, statut: 'ACTIVE' },
            include: { medicaments: true, prescripteur: true },
        });
    }
    async findOne(id) {
        return this.prisma.prescriptionMedicale.findUnique({ where: { id }, include: { medicaments: true } });
    }
    async createOrdonnance(prescriptionId, medicaments) {
        return this.prisma.ordonnance.create({
            data: { prescriptionId, medicaments },
        });
    }
    async updateStatut(id, statut) {
        return this.prisma.prescriptionMedicale.update({ where: { id }, data: { statut } });
    }
};
exports.MedicaleService = MedicaleService;
exports.MedicaleService = MedicaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicaleService);
//# sourceMappingURL=medicale.service.js.map
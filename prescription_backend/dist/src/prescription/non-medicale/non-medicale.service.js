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
exports.NonMedicaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let NonMedicaleService = class NonMedicaleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(prescripteurId, dto) {
        const { items, ...rest } = dto;
        return this.prisma.prescriptionNonMedicale.create({
            data: {
                ...rest,
                prescripteurId,
                items: { create: items },
            },
            include: { items: true },
        });
    }
    async findByPatient(patientId) {
        return this.prisma.prescriptionNonMedicale.findMany({
            where: { patientId, statut: 'ACTIVE' },
            include: {
                items: {
                    select: {
                        typeLabel: true,
                        description: true,
                        duree: true,
                        frequence: true,
                        dateDebut: true,
                    },
                },
                prescripteur: {
                    select: { nom: true },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.prescriptionNonMedicale.findUnique({ where: { id }, include: { items: true } });
    }
    async updateStatut(id, statut) {
        return this.prisma.prescriptionNonMedicale.update({ where: { id }, data: { statut } });
    }
};
exports.NonMedicaleService = NonMedicaleService;
exports.NonMedicaleService = NonMedicaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NonMedicaleService);
//# sourceMappingURL=non-medicale.service.js.map
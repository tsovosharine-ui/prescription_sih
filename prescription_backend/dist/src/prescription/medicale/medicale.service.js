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
const prescription_notifier_service_1 = require("../../notification/prescription-notifier.service");
let MedicaleService = class MedicaleService {
    prisma;
    notifier;
    constructor(prisma, notifier) {
        this.prisma = prisma;
        this.notifier = notifier;
    }
    async create(prescripteurId, dto) {
        const { medicaments, ...rest } = dto;
        const prescription = await this.prisma.prescriptionMedicale.create({
            data: {
                ...rest,
                prescripteurId,
                medicaments: {
                    create: medicaments.map((m) => ({
                        ...m,
                        dateDebut: m.dateDebut ? new Date(m.dateDebut) : undefined,
                        quantite: m.quantite || 1,
                    })),
                },
            },
            include: { medicaments: true, ordonnance: true },
        });
        if (prescription.notifierInfirmier) {
            await this.notifier.notify({
                type: 'infirmier',
                expediteurId: prescripteurId,
                patientId: prescription.patientId,
                referenceId: prescription.id,
                referenceType: 'PrescriptionMedicale',
                extra: { medicaments: prescription.medicaments.map(m => m.nom) },
            });
        }
        return prescription;
    }
    async findByPatient(patientId) {
        return this.prisma.prescriptionMedicale.findMany({
            where: { patientId },
            include: { medicaments: true, ordonnance: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const p = await this.prisma.prescriptionMedicale.findUnique({
            where: { id },
            include: { medicaments: true, ordonnance: true },
        });
        if (!p)
            throw new common_1.NotFoundException('Prescription introuvable');
        return p;
    }
    async createOrdonnance(prescriptionId, medicaments) {
        return this.prisma.ordonnance.upsert({
            where: { prescriptionId },
            create: { prescriptionId, medicaments },
            update: { medicaments },
        });
    }
    async updateStatut(id, statut) {
        return this.prisma.prescriptionMedicale.update({
            where: { id },
            data: { statut },
        });
    }
};
exports.MedicaleService = MedicaleService;
exports.MedicaleService = MedicaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prescription_notifier_service_1.PrescriptionNotifierService])
], MedicaleService);
//# sourceMappingURL=medicale.service.js.map
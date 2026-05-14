import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../notification/prescription-notifier.service';

@Injectable()
export class MedicaleService {
  constructor(
    private prisma: PrismaService,
    private notifier: PrescriptionNotifierService,
  ) {}

  async create(prescripteurId: string, dto: any) {
    const { medicaments, prescripteurId: _pid, ...rest } = dto;
    const prescription = await this.prisma.prescriptionMedicale.create({
      data: {
        ...rest,
        prescripteurId,
        medicaments: {
          create: medicaments.map((m: any) => ({
            ...m,
            dateDebut: m.dateDebut ? new Date(m.dateDebut) : undefined,
            quantite: m.quantite || 1,
          })),
        },
      },
      include: { medicaments: true, ordonnance: true },
    });

    // Notifier les infirmiers
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

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionMedicale.findMany({
      where: { patientId },
      include: { medicaments: true, ordonnance: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionMedicale.findUnique({
      where: { id },
      include: { medicaments: true, ordonnance: true },
    });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async createOrdonnance(prescriptionId: string, medicaments: any[]) {
    return this.prisma.ordonnance.upsert({
      where: { prescriptionId },
      create: { prescriptionId, medicaments },
      update: { medicaments },
    });
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionMedicale.update({
      where: { id },
      data: { statut },
    });
  }
}

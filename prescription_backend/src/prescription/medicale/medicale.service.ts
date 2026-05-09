import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MedicaleService {
  constructor(private prisma: PrismaService) {}

  async create(prescripteurId: string, dto: {
    patientId: string;
    remarques?: string;
    notifierInfirmier?: boolean;
    medicaments: {
      nom: string;
      dose: string;
      quantite?: number;
      voie?: string;
      frequence: string;
      duree: string;
      dateDebut?: string;
      heureDebut?: string;
      instructions?: string;
      remarques?: string;
    }[];
  }) {
    return this.prisma.prescriptionMedicale.create({
      data: {
        patientId: dto.patientId,
        prescripteurId,
        remarques: dto.remarques,
        notifierInfirmier: dto.notifierInfirmier || false,
        medicaments: {
          create: dto.medicaments.map(m => ({
            ...m,
            dateDebut: m.dateDebut ? new Date(m.dateDebut) : undefined,
            quantite: m.quantite || 1,
          })),
        },
      },
      include: { medicaments: true, ordonnance: true },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionMedicale.findMany({
      where: { patientId },
      include: { medicaments: true, ordonnance: true, prescripteur: { select: { nom: true, prenoms: true, poste: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionMedicale.findUnique({
      where: { id },
      include: { medicaments: true, ordonnance: true, prescripteur: { select: { nom: true, prenoms: true, poste: true } }, patient: true },
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

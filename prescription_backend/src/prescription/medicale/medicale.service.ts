import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MedicaleService {
  constructor(private prisma: PrismaService) {}

  async create(prescripteurId: string, dto: any) {
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

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionMedicale.findMany({
      where: { patientId, statut: 'ACTIVE' },
      include: { medicaments: true, prescripteur: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.prescriptionMedicale.findUnique({ where: { id }, include: { medicaments: true } });
  }

  async createOrdonnance(prescriptionId: string, medicaments: any[]) {
    return this.prisma.ordonnance.create({
      data: { prescriptionId, medicaments },
    });
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionMedicale.update({ where: { id }, data: { statut } });
  }
}

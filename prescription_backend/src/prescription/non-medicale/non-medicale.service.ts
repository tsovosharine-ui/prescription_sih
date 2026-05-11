import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NonMedicaleService {
  constructor(private prisma: PrismaService) {}

  async create(prescripteurId: string, dto: any) {
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

  async findByPatient(patientId: string) {
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

  async findOne(id: string) {
    return this.prisma.prescriptionNonMedicale.findUnique({ where: { id }, include: { items: true } });
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionNonMedicale.update({ where: { id }, data: { statut } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SurveillanceService {
  constructor(private prisma: PrismaService) {}

  async create(prescripteurId: string, dto: any) {
    const { parametres, ...rest } = dto;
    return this.prisma.prescriptionSurveillance.create({
      data: {
        ...rest,
        prescripteurId,
        parametres: { create: parametres },
      },
      include: { parametres: true },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionSurveillance.findMany({
      where: { patientId, statut: 'ACTIVE' },
      include: {
        parametres: {
          select: {
            parametre: true,
            frequence: true,
            duree: true,
            seuil: true,
          },
        },
        prescripteur: {
          select: { nom: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.prescriptionSurveillance.findUnique({ where: { id }, include: { parametres: true } });
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionSurveillance.update({ where: { id }, data: { statut } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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
      where: { patientId },
      include: { parametres: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionSurveillance.findUnique({
      where: { id },
      include: { parametres: true },
    });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionSurveillance.update({
      where: { id }, data: { statut },
    });
  }
}

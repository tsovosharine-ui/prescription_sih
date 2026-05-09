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
      include: { parametres: true, prescripteur: { select: { nom: true, prenoms: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionSurveillance.findUnique({
      where: { id },
      include: { parametres: true, prescripteur: { select: { nom: true, prenoms: true } }, patient: true },
    });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }
}

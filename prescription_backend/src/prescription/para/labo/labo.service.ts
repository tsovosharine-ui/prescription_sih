import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LaboService {
  constructor(private prisma: PrismaService) {}

  async create(prescripteurId: string, dto: any) {
    return this.prisma.prescriptionLabo.create({ data: { ...dto, prescripteurId } });
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionLabo.findMany({
      where: { patientId },
      include: { prescripteur: { select: { nom: true, prenoms: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionLabo.findUnique({
      where: { id },
      include: { prescripteur: { select: { nom: true, prenoms: true } }, patient: true },
    });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionLabo.update({ where: { id }, data: { statut } });
  }
}

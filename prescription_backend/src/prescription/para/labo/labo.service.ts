import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';

@Injectable()
export class LaboService {
  constructor(
    private prisma: PrismaService,
    private notifier: PrescriptionNotifierService,
  ) {}

  async create(prescripteurId: string, dto: any) {
    const prescription = await this.prisma.prescriptionLabo.create({
      data: { ...dto, prescripteurId },
    });

    await this.notifier.notify({
      type: 'labo',
      expediteurId: prescripteurId,
      patientId: prescription.patientId,
      referenceId: prescription.id,
      referenceType: 'prescriptionLabo',
      urgence: prescription.urgence,
    });

    return prescription;
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionLabo.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionLabo.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionLabo.update({ where: { id }, data: { statut } });
  }
}

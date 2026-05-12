import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';

@Injectable()
export class ImagerieService {
  constructor(
    private prisma: PrismaService,
    private notifier: PrescriptionNotifierService,
  ) {}

  async create(prescripteurId: string, dto: any) {
    const prescription = await this.prisma.prescriptionImagerie.create({
      data: { ...dto, prescripteurId },
    });

    await this.notifier.notify({
      type: 'imagerie',
      expediteurId: prescripteurId,
      patientId: prescription.patientId,
      referenceId: prescription.id,
      referenceType: 'prescriptionImagerie',
      urgence: prescription.urgence,
    });

    return prescription;
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionImagerie.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionImagerie.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionImagerie.update({ where: { id }, data: { statut } });
  }
}

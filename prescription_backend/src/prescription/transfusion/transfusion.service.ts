import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../notification/prescription-notifier.service';

@Injectable()
export class TransfusionService {
  constructor(
    private prisma: PrismaService,
    private notifier: PrescriptionNotifierService,
  ) {}

  async create(prescripteurId: string, dto: any) {
    const prescription = await this.prisma.prescriptionTransfusion.create({
      data: {
        ...dto,
        prescripteurId,
        datePrevue: dto.datePrevue ? new Date(dto.datePrevue) : undefined,
      },
    });

    await this.notifier.notify({
      type: 'depot-sang',
      expediteurId: prescripteurId,
      patientId: prescription.patientId,
      referenceId: prescription.id,
      referenceType: 'PrescriptionTransfusion',
      urgence: prescription.urgence,
      extra: { groupage: prescription.groupage, produit: prescription.produit },
    });

    return prescription;
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionTransfusion.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionTransfusion.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionTransfusion.update({ where: { id }, data: { statut } });
  }
}

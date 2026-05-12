import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../notification/prescription-notifier.service';

@Injectable()
export class BlocService {
  constructor(
    private prisma: PrismaService,
    private notifier: PrescriptionNotifierService,
  ) {}

  async create(prescripteurId: string, dto: any) {
    const prescription = await this.prisma.prescriptionBloc.create({
      data: {
        ...dto,
        prescripteurId,
        dateIntervention: dto.dateIntervention ? new Date(dto.dateIntervention) : undefined,
      },
    });

    await this.notifier.notify({
      type: 'bloc',
      expediteurId: prescripteurId,
      patientId: prescription.patientId,
      referenceId: prescription.id,
      referenceType: 'PrescriptionBloc',
      urgence: prescription.urgence,
      extra: { libelle: prescription.libelle },
    });

    return prescription;
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionBloc.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionBloc.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }

  async updateStatut(id: string, statut: string) {
    return this.prisma.prescriptionBloc.update({ where: { id }, data: { statut } });
  }
}

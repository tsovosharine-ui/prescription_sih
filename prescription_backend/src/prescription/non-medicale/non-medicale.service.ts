import { Injectable, NotFoundException } from '@nestjs/common';
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
        items: {
          create: items.map((i: any) => ({
            ...i,
            dateDebut: i.dateDebut ? new Date(i.dateDebut) : undefined,
          })),
        },
      },
      include: { items: true },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.prescriptionNonMedicale.findMany({
      where: { patientId },
      include: { items: true, prescripteur: { select: { nom: true, prenoms: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.prisma.prescriptionNonMedicale.findUnique({
      where: { id },
      include: { items: true, prescripteur: { select: { nom: true, prenoms: true } }, patient: true },
    });
    if (!p) throw new NotFoundException('Prescription introuvable');
    return p;
  }
}

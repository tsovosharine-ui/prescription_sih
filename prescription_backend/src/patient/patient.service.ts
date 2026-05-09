import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(dto: {
    nom: string;
    prenom: string;
    dateNaissance?: string;
    sexe?: string;
    telephone?: string;
    adresse?: string;
    allergies?: string[];
    categorie?: string;
  }) {
    const idPermanent = await this.generateId();
    return this.prisma.patient.create({
      data: {
        ...dto,
        idPermanent,
        dateNaissance: dto.dateNaissance ? new Date(dto.dateNaissance) : undefined,
        allergies: dto.allergies || [],
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('Patient introuvable');
    return patient;
  }

  async findByIdPermanent(idPermanent: string) {
    const patient = await this.prisma.patient.findUnique({ where: { idPermanent } });
    if (!patient) throw new NotFoundException('Patient introuvable');
    return patient;
  }

  async search(query: string) {
    return this.prisma.patient.findMany({
      where: {
        OR: [
          { nom: { contains: query, mode: 'insensitive' } },
          { prenom: { contains: query, mode: 'insensitive' } },
          { idPermanent: { contains: query, mode: 'insensitive' } },
          { telephone: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
    });
  }

  async update(id: string, dto: Partial<{
    nom: string;
    prenom: string;
    dateNaissance: string;
    sexe: string;
    telephone: string;
    adresse: string;
    allergies: string[];
    categorie: string;
  }>) {
    await this.findById(id);
    return this.prisma.patient.update({
      where: { id },
      data: {
        ...dto,
        dateNaissance: dto.dateNaissance ? new Date(dto.dateNaissance) : undefined,
      },
    });
  }

  private async generateId(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.patient.count();
    const padded = String(count + 1).padStart(5, '0');
    return `IP-${year}-${padded}`;
  }
}

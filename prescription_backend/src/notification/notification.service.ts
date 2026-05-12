import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: {
    type: string;
    destinataire: string;
    expediteurId: string;
    patientId: string;
    referenceId: string;
    referenceType: string;
    titre: string;
    contenu: any;
  }) {
    return this.prisma.notification.create({ data: dto });
  }

  // Récupérer toutes les notifications EN_ATTENTE pour un user ou service
  async getPending(userId: string, service?: string) {
    return this.prisma.notification.findMany({
      where: {
        statut: 'EN_ATTENTE',
        OR: [
          { destinataire: userId },
          ...(service ? [{ destinataire: service }] : []),
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { statut: 'LU', luAt: new Date() },
    });
  }

  async markAsSent(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { statut: 'ENVOYE', tentatives: { increment: 1 } },
    });
  }

  async getByDestinataire(destinataire: string, limit = 50) {
    return this.prisma.notification.findMany({
      where: { destinataire },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getUnreadCount(destinataire: string) {
    return this.prisma.notification.count({
      where: { destinataire, statut: { in: ['EN_ATTENTE', 'ENVOYE'] } },
    });
  }
}

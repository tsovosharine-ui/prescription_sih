import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  async createForMedicale(prescriptionMedicaleId: string) {
    try {
      const result = await this.prisma.notificationInfirmier.create({
        data: { prescriptionMedicaleId },
      });
      this.logger.log(`Notification créée pour prescription médicale : ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error('Erreur création notification médicale', error);
      throw error;
    }
  }

  async createForNonMedicale(prescriptionNonMedicaleId: string) {
    try {
      const result = await this.prisma.notificationInfirmier.create({
        data: { prescriptionNonMedicaleId },
      });
      this.logger.log(`Notification créée pour prescription non médicale : ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error('Erreur création notification non médicale', error);
      throw error;
    }
  }

  async createForSurveillance(prescriptionSurveillanceId: string) {
    try {
      const result = await this.prisma.notificationInfirmier.create({
        data: { prescriptionSurveillanceId },
      });
      this.logger.log(`Notification créée pour surveillance : ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error('Erreur création notification surveillance', error);
      throw error;
    }
  }
}

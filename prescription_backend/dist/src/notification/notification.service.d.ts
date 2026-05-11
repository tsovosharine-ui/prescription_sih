import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createForMedicale(prescriptionMedicaleId: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
    createForNonMedicale(prescriptionNonMedicaleId: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
    createForSurveillance(prescriptionSurveillanceId: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
}
